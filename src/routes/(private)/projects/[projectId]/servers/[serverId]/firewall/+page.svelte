<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/state";

  import { Address4, Address6 } from "ip-address";

  import { api } from "$lib/api";
  import Badge from "$lib/components/Badge.svelte";
  import SvgIcon from "$lib/components/SvgIcon.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import Input from "$lib/components/form/Input.svelte";
  import Toggle from "$lib/components/form/Toggle.svelte";
  import { serverTabs } from "$lib/menus/project-tabs";
  import { routePath } from "$lib/navigation/registry";
  import { projectStore, usePageData } from "$lib/stores";
  import { showApiError, showMessage } from "$lib/utils";

  import { Rules } from "@proto/firewall/enum";
  import type { Countries_Request } from "@proto/system/message";

  type IpMask = {
    start_ip: string;
    end_ip: string;
    network: string;
  };

  const pageData = usePageData();

  pageData.base = {
    country: "",
    network: "",
    search: {}
  };
  pageData.tmp = {
    // use for search
    country: {},
    network: {}
  };

  const params = $derived(page.params as { projectId?: string; serverId?: string });
  const projectId = $derived(params.projectId ?? "");
  const serverId = $derived(params.serverId ?? "");

  const networkToMask = (network: string): { start_ip: string; end_ip: string } => {
    try {
      const address = network.includes(":") ? new Address6(network) : new Address4(network);
      return {
        start_ip: address.startAddress().addressMinusSuffix,
        end_ip: address.endAddress().addressMinusSuffix
      };
    } catch {
      return { start_ip: network, end_ip: network };
    }
  };

  const getData = async (): Promise<void> => {
    try {
      const res = await api().GET(`/v1/schemes/${projectId}/${serverId}/firewall`);
      if (res.data) {
        const result = res.data.result ?? {};
        const country = result.country ?? {};
        const network = result.network ?? {};

        pageData.tmp.country = {
          ...country,
          list: (country.list ?? []).map((item: any) => ({
            id: item.country_id,
            country_code: item.country_code,
            country_name: item.country_name
          }))
        };
        pageData.tmp.network = {
          ...network,
          list: (network.list ?? []).map((item: any) => ({
            id: item.network_id,
            ...networkToMask(item.network)
          }))
        };
      }
      if (res.error) {
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  // country
  const searchCountries = async (): Promise<void> => {
    const name = String(pageData.base.country ?? "").trim();

    if (name.length <= 2) {
      return;
    }
    pageData.tmp.country.list = Array.isArray(pageData.tmp.country.list) ? pageData.tmp.country.list : [];
    try {
      const queryParams = <Countries_Request>{
        name
      };

      const res = await api(false).GET(`/country`, queryParams);
      if (res.data) {
        pageData.base.search = res.data.result;
        if (pageData.base.search.countries && pageData.base.search.countries.length > 0) {
          const countryCodes = new Set(Object.values(pageData.tmp.country.list).map((n: any) => n.country_code));
          pageData.base.search.countries = pageData.base.search.countries.filter((s: any) => !countryCodes.has(s.code));
        }
        pageData.error.countries = null;
      } else {
        pageData.base.search.countries = [];
      }
      if (res.error) {
        pageData.error.countries = res.error.result.name;
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const addCountry = async (index: number, rules: Rules): Promise<void> => {
    const data_country = pageData.base.search.countries[index];
    try {
      const res = await create(data_country.code, rules);
      if (res) {
        pageData.tmp.country.list.push({
          id: res.id,
          country_name: data_country.name,
          country_code: data_country.code
        });
        pageData.base.search.countries.splice(index, 1);
        pageData.error.countries = null;
      }
    } catch {
      pageData.error.countries = "Invalid country";
    }
  };

  // ip
  const addIp = async (ip: string, rules: Rules): Promise<void> => {
    try {
      let address: Address4 | Address6;

      try {
        address = new Address4(ip);
      } catch {
        address = new Address6(ip);
      }

      const request = <IpMask>{
        start_ip: address.startAddress().addressMinusSuffix,
        end_ip: address.endAddress().addressMinusSuffix,
        network: ip
      };

      void create(request, rules).then((res) => {
        if (res) {
          pageData.tmp.network.list.push({
            id: res.id,
            start_ip: request.start_ip,
            end_ip: request.end_ip
          });
          pageData.base.network = null;
          pageData.error.network = null;
        }
      });
    } catch {
      pageData.error.network = "Invalid address";
    }
  };

  // ---
  const create = async (record: any, rules: Rules): Promise<any> => {
    try {
      let bodyParams: any;

      switch (rules) {
        case Rules.country:
          bodyParams = {
            country_code: record
          };
          break;

        case Rules.ip:
          bodyParams = {
            network: record.network ?? record.start_ip
          };
          break;

        default:
          return;
      }

      const res = await api(false).POST(`/v1/schemes/${projectId}/${serverId}/firewall`, {}, bodyParams);
      if (res.data) {
        showMessage(res.data.message);
        pageData.error = {};
        const result = res.data.result ?? {};
        return { id: result.country_id ?? result.network_id };
      }
      if (res.error) {
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const update = async (status: boolean, rules: Rules): Promise<void> => {
    try {
      let bodyParams: any;

      switch (rules) {
        case Rules.country:
          pageData.tmp.country.wite_list = status;
          bodyParams = { country: status };
          break;

        case Rules.ip:
          pageData.tmp.network.wite_list = status;
          bodyParams = { network: status };
          break;

        default:
          return;
      }

      const res = await api(false).UPDATE(`/v1/schemes/${projectId}/${serverId}/firewall`, {}, bodyParams);
      if (res.data) {
        showMessage(res.data.message);
        pageData.error = {};
      }
      if (res.error) {
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const remove = async (index: number, rules: Rules): Promise<void> => {
    try {
      let record_id: string;
      if (rules === Rules.country) {
        record_id = pageData.tmp.country.list[index].id;
      } else if (rules === Rules.ip) {
        record_id = pageData.tmp.network.list[index].id;
      } else {
        return;
      }

      const firewallType = rules === Rules.country ? "country" : "network";

      const res = await api(false).DELETE(`/v1/schemes/${projectId}/${serverId}/firewall/${firewallType}/${record_id}`);
      if (res.data) {
        if (rules === Rules.country) {
          pageData.tmp.country.list.splice(index, 1);
          void searchCountries();
        } else if (rules === Rules.ip) {
          pageData.tmp.network.list.splice(index, 1);
        }
        showMessage(res.data.message);
      }
      if (res.error) {
        await showApiError(res.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  onMount(() => {
    document.title = "Server firewall";
    void projectStore.serverNameByID(projectId, serverId);
    void getData();
  });
</script>

<div class="artboard">
  <header>
    <h1>
      <a href={routePath("projects-projectId-servers", { projectId })}>Servers</a>
    </h1>
    <div class="breadcrumbs">{projectStore.getServerNameByID(projectId, serverId)}</div>
  </header>
  <Tabs tabs={serverTabs} />
  <div class="desc">In addition to creating your own, some add-ons come with their own.</div>

  <div class="content">
    <div class="w-28 flex-none">Countries:</div>
    <div class="grow"></div>
    <div class="flex-none">
      <Toggle
        id="country"
        bind:value={pageData.tmp.country.wite_list}
        name="Black-list"
        class="flex-grow"
        onchange={(): void => {
          void update(pageData.tmp.country.wite_list, Rules.country);
        }}
      />
    </div>

    <div class="w-full pt-3">
      <Input
        bind:value={pageData.base.country}
        error={pageData.error.country}
        class="flex-grow"
        placeholder="Search country ..."
        onkeyup={searchCountries}
      />
    </div>

    <div class="flex-col">
      {#if pageData.base.search}
        <div class="mt-3">
          {#each pageData.base.search.countries ?? [] as item, index (index)}
            <Badge
              name={item.name}
              color="green"
              class="mr-1 cursor-pointer"
              onclick={(): void => {
                void addCountry(Number(index), Rules.country);
              }}
            />
          {/each}
        </div>
      {/if}
      {#each pageData.tmp.country.list ?? [] as item, index (index)}
        <span class="firewall-tags-item mt-3 mr-3 inline-flex items-center rounded-sm border bg-gray-50 px-2">
          <span class="ml-1">{item.country_name}</span>
          <SvgIcon
            name="close"
            class="-mr-1 cursor-pointer"
            onclick={(): void => {
              void remove(Number(index), Rules.country);
            }}
          />
        </span>
      {/each}
    </div>
  </div>

  <div class="divider"></div>

  <div class="content">
    <div class="mt-1 w-28 flex-none">Networks:</div>
    <div class="grow"></div>
    <div class="flex-none">
      <Toggle
        id="network"
        bind:value={pageData.tmp.network.wite_list}
        name="Black-list"
        class="flex-grow"
        onchange={(): void => {
          void update(pageData.tmp.network.wite_list, Rules.ip);
        }}
      />
    </div>

    <div class="w-full pt-3">
      <Input
        bind:value={pageData.base.network}
        error={pageData.error.network}
        class="flex-grow"
        placeholder="IP address or mask"
        onkeyup={(event): void => {
          if (event.key === "Enter") {
            void addIp(pageData.base.network, Rules.ip);
          }
        }}
      />
    </div>

    <div class="flex-col">
      {#each pageData.tmp.network.list ?? [] as item, index (index)}
        <span class="firewall-tags-item mt-3 mr-3 inline-flex items-center rounded-sm border bg-gray-50 px-2">
          {#if item.start_ip !== item.end_ip}
            <span class="ml-1"> {item.start_ip} - {item.end_ip} </span>
          {:else}
            <span>{item.start_ip}</span>
          {/if}
          <SvgIcon
            name="close"
            class="-mr-1 cursor-pointer"
            onclick={(): void => {
              void remove(Number(index), Rules.ip);
            }}
          />
        </span>
      {/each}
    </div>
  </div>
</div>
