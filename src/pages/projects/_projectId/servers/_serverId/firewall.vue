<template>
  <div class="artboard">
    <header>
      <h1>
        <router-link :to="{ name: 'projects-projectId-servers', params: { projectId: props.projectId } }">
          Servers
        </router-link>
      </h1>
      <div class="breadcrumbs">{{ serverStore.getServerNameByID(props.projectId, props.serverId) }}</div>
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
            @click="addCountry(index, Rules.country)"
          />
        </div>
        <span
          v-for="(item, index) in pageData.tmp.country.list"
          :key="index"
          class="firewall-tags-item mr-3 mt-3 inline-flex items-center rounded border bg-gray-50 px-2"
        >
          <span class="ml-1">{{ item.country_name }}</span>
          <SvgIcon name="close" class="-mr-1 cursor-pointer" @click="remove(index, Rules.country)" />
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
          class="firewall-tags-item mr-3 mt-3 inline-flex items-center rounded border bg-gray-50 px-2"
        >
          <span v-if="item.start_ip !== item.end_ip" class="ml-1"> {{ item.start_ip }} - {{ item.end_ip }} </span>
          <span v-else>{{ item.start_ip }}</span>
          <SvgIcon name="close" class="-mr-1 cursor-pointer" @click="remove(index, Rules.ip)" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Address4, Address6 } from "ip-address";
import { useServerStore } from "@/store";
import { showApiError, showMessage } from "@/utils";
import { Badge, FormInput, FormToggle, SvgIcon, Tabs } from "@/components";
import { PageData } from "@/interface/page";

// API section
import { api } from "@/api";
import { Countries_Request } from "@proto/utility";
import {
  DeleteServerFirewall_Request,
  IpMask,
  Rules,
  ServerFirewall_Request,
  UpdateServerFirewall_Request
} from "@proto/firewall";

// Tabs section
import { tabMenu } from "./tab";

const serverStore = useServerStore();
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

const getData = async (): Promise<void> => {
  const { projectId, serverId } = props;

  try {
    const queryParams = <ServerFirewall_Request>{
      project_id: projectId,
      server_id: serverId
    };

    const res = await api().GET(`/v1/servers/firewall`, queryParams);
    if (res.data) {
      pageData.value.tmp.country = res.data.result.country;
      pageData.value.tmp.network = res.data.result.network;
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
  } catch (error) {
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
      end_ip: address.endAddress().addressMinusSuffix
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
  } catch (e) {
    pageData.value.error.network = "Invalid address";
  }
};

// ---
const create = async (record: any, rules: Rules): Promise<unknown> => {
  const { projectId, serverId } = props;

  try {
    let bodyParams: any;
    const commonParams = {
      project_id: projectId,
      server_id: serverId
    };

    switch (rules) {
      case Rules.country:
        bodyParams = {
          ...commonParams,
          country_code: record
        };
        break;

      case Rules.ip:
        bodyParams = {
          ...commonParams,
          ip: <IpMask>{
            start_ip: record.start_ip,
            end_ip: record.end_ip
          }
        };
        break;

      default:
        return;
    }

    const res = await api(false).POST(`/v1/servers/firewall`, {}, bodyParams);
    if (res.data) {
      showMessage(res.data.message);
      pageData.value.error = {};
      return res.data.result;
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
    switch (rules) {
      case Rules.country:
        pageData.value.tmp.country.wite_list = status;
        status = pageData.value.tmp.country.wite_list;
        break;

      case Rules.ip:
        pageData.value.tmp.network.wite_list = status;
        status = pageData.value.tmp.network.wite_list;
        break;

      default:
        return;
    }

    const bodyParams = <UpdateServerFirewall_Request>{
      project_id: projectId,
      server_id: serverId,
      rule: rules,
      status: status
    };

    const res = await api(false).UPDATE(`/v1/servers/firewall`, {}, bodyParams);
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

    const queryParams = <DeleteServerFirewall_Request>{
      project_id: projectId,
      server_id: serverId,
      rule: rules,
      record_id: record_id
    };

    const res = await api(false).DELETE(`/v1/servers/firewall`, queryParams);
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
  serverStore.serverNameByID(props.projectId, props.serverId);
  await getData();
});
</script>
