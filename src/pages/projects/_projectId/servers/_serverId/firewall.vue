<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">
          Servers
        </router-link>
      </h1>
      <div class="breadcrumbs">{{ projectStore.getServerNameByID(props.projectId, props.serverId) }}</div>
    </header>
    <Tabs :tabs="tabMenu" />
    <div class="desc">In addition to creating your own, some add-ons come with their own.</div>

    <div class="content">
      <div class="w-28 flex-none">Countries:</div>
      <div class="grow"></div>
      <div class="w-30 flex-none">
        <FormToggle
          id="country"
          v-model="pageData.tmp.country.wite_list"
          name="Black-list"
          class="flex-grow"
          @change="update(pageData.tmp.country.wite_list, Rules.country)"
        />
      </div>

      <div class="w-full pt-3">
        <FormInput
          v-model.trim="pageData.base.country"
          :error="pageData.error.country"
          class="flex-grow"
          placeholder="Search country ..."
          @keyup="searchCountries()"
        />
      </div>

      <div class="flex-col">
        <div v-if="pageData.base.search" class="mt-3">
          <Badge
            v-for="(item, index) in pageData.base.search['countries']"
            :key="index"
            :name="item.name"
            color="green"
            class="mr-1 cursor-pointer"
            @click="addCountry(Number(index), Rules.country)"
          />
        </div>
        <span
          v-for="(item, index) in pageData.tmp.country.list"
          :key="index"
          class="firewall-tags-item mt-3 mr-3 inline-flex items-center rounded-sm border bg-gray-50 px-2"
        >
          <span class="ml-1">{{ item.country_name }}</span>
          <SvgIcon name="close" class="-mr-1 cursor-pointer" @click="remove(Number(index), Rules.country)" />
        </span>
      </div>
    </div>

    <div class="divider"></div>

    <div class="content">
      <div class="mt-1 w-28 flex-none">Networks:</div>
      <div class="grow"></div>
      <div class="w-30 flex-none">
        <FormToggle
          id="network"
          v-model="pageData.tmp.network.wite_list"
          name="Black-list"
          class="flex-grow"
          @change="update(pageData.tmp.network.wite_list, Rules.ip)"
        />
      </div>

      <div class="w-full pt-3">
        <FormInput
          v-model="pageData.base.network"
          :error="pageData.error.network"
          class="flex-grow"
          placeholder="IP address or mask"
          @keyup.enter="addIp(pageData.base.network, Rules.ip)"
        />
      </div>

      <div class="flex-col">
        <span
          v-for="(item, index) in pageData.tmp.network.list"
          :key="index"
          class="firewall-tags-item mt-3 mr-3 inline-flex items-center rounded-sm border bg-gray-50 px-2"
        >
          <span v-if="item.start_ip !== item.end_ip" class="ml-1"> {{ item.start_ip }} - {{ item.end_ip }} </span>
          <span v-else>{{ item.start_ip }}</span>
          <SvgIcon name="close" class="-mr-1 cursor-pointer" @click="remove(Number(index), Rules.ip)" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Address4, Address6 } from "ip-address";
import { useProjectStore } from "@/store";
import { showApiError, showMessage } from "@/utils";
import { Badge, FormInput, FormToggle, SvgIcon, Tabs } from "@/components";
import { PageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { Countries_Request } from "@proto/system/message";
import { Rules } from "@proto/firewall/enum";

type IpMask = {
  start_ip: string;
  end_ip: string;
  network: string;
};

// Tabs section
import { tabMenu } from "./tab";

const projectStore = useProjectStore();
const pageData = ref<PageData>({
  base: {
    country: [],
    search: []
  },
  tmp: {
    // use for search
    country: {},
    network: {}
  },
  error: {}
});

const props = defineProps({
  projectId: {
    type: String,
    default: null
  },
  serverId: {
    type: String,
    default: null
  }
});

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
  const { projectId, serverId } = props;

  try {
    const res = await api().GET(`/v1/schemes/${projectId}/${serverId}/firewall`);
    if (res.data) {
      const result = res.data.result ?? {};
      const country = result.country ?? {};
      const network = result.network ?? {};

      pageData.value.tmp.country = {
        ...country,
        list: (country.list ?? []).map((item: any) => ({
          id: item.country_id,
          country_code: item.country_code,
          country_name: item.country_name
        }))
      };
      pageData.value.tmp.network = {
        ...network,
        list: (network.list ?? []).map((item: any) => ({
          id: item.network_id,
          ...networkToMask(item.network)
        }))
      };
    }
    if (res.error) {
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

// country
const searchCountries = async (): Promise<void> => {
  if (pageData.value.base.country.length <= 2) {
    return;
  }
  pageData.value.tmp.country.list = Array.isArray(pageData.value.tmp.country.list)
    ? pageData.value.tmp.country.list
    : [];
  try {
    const queryParams = <Countries_Request>{
      name: pageData.value.base.country
    };

    const res = await api(false).GET(`/country`, queryParams);
    if (res.data) {
      pageData.value.base.search = res.data.result;
      if (pageData.value.base.search.countries && pageData.value.base.search.countries.length > 0) {
        const countryCodes = new Set(Object.values(pageData.value.tmp.country.list).map((n: any) => n.country_code));
        pageData.value.base.search.countries = pageData.value.base.search.countries.filter(
          (s: any) => !countryCodes.has(s.code)
        );
      }
      pageData.value.error.countries = null;
    } else {
      pageData.value.base.search.countries = [];
    }
    if (res.error) {
      pageData.value.error.countries = res.error.result.name;
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

const addCountry = async (index: number, rules: Rules): Promise<void> => {
  const data_country = pageData.value.base.search.countries[index];
  try {
    const res = await create(data_country.code, rules);
    if (res) {
      pageData.value.tmp.country.list.push({
        id: res.id,
        country_name: data_country.name,
        country_code: data_country.code
      });
      pageData.value.base.search.countries.splice(index, 1);
      pageData.value.error.countries = null;
    }
  } catch {
    pageData.value.error.countries = "Invalid country";
  }
};

// ip
const addIp = async (ip: string, rules: Rules): Promise<void> => {
  try {
    let address: Address4 | Address6 = new Address4(ip);
    if (!address.isCorrect()) {
      address = new Address6(ip);
      if (address.isCorrect()) {
        address = address.to4();
      } else {
        throw new Error("Invalid address");
      }
    }

    const request = <IpMask>{
      start_ip: address.startAddress().addressMinusSuffix,
      end_ip: address.endAddress().addressMinusSuffix,
      network: ip
    };

    create(request, rules).then((res) => {
      if (res) {
        pageData.value.tmp.network.list.push({
          id: res.id,
          start_ip: request.start_ip,
          end_ip: request.end_ip
        });
        pageData.value.base.network = null;
        pageData.value.error.network = null;
      }
    });
  } catch {
    pageData.value.error.network = "Invalid address";
  }
};

// ---
const create = async (record: any, rules: Rules): Promise<any> => {
  const { projectId, serverId } = props;

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
      pageData.value.error = {};
      const result = res.data.result ?? {};
      return { id: result.country_id ?? result.network_id };
    }
    if (res.error) {
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

const update = async (status: boolean, rules: Rules): Promise<void> => {
  const { projectId, serverId } = props;

  try {
    let bodyParams: any;

    switch (rules) {
      case Rules.country:
        pageData.value.tmp.country.wite_list = status;
        bodyParams = { country: status };
        break;

      case Rules.ip:
        pageData.value.tmp.network.wite_list = status;
        bodyParams = { network: status };
        break;

      default:
        return;
    }

    const res = await api(false).UPDATE(`/v1/schemes/${projectId}/${serverId}/firewall`, {}, bodyParams);
    if (res.data) {
      showMessage(res.data.message);
      pageData.value.error = {};
    }
    if (res.error) {
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

const remove = async (index: number, rules: Rules): Promise<void> => {
  const { projectId, serverId } = props;

  try {
    let record_id: string;
    if (rules === Rules.country) {
      record_id = pageData.value.tmp.country.list[index].id;
    } else if (rules === Rules.ip) {
      record_id = pageData.value.tmp.network.list[index].id;
    } else {
      return;
    }

    const firewallType = rules === Rules.country ? "country" : "network";

    const res = await api(false).DELETE(`/v1/schemes/${projectId}/${serverId}/firewall/${firewallType}/${record_id}`);
    if (res.data) {
      if (rules === Rules.country) {
        pageData.value.tmp.country.list.splice(index, 1);
        searchCountries();
      } else if (rules === Rules.ip) {
        pageData.value.tmp.network.list.splice(index, 1);
      }
      showMessage(res.data.message);
    }
    if (res.error) {
      showApiError(res.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

onMounted(async () => {
  document.title = "Server firewall";
  projectStore.serverNameByID(props.projectId, props.serverId);
  await getData();
});
</script>
