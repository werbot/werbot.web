<template>
  <div class="artboard">
    <header>
      <h1>Servers</h1>
      <div class="breadcrumbs">
        <BServerName
          :memberId="proxy.$authStore.hasUserID"
          :serverId="props.serverId"
          :projectId="props.projectId"
        />
        <span>Firewall</span>
      </div>
    </header>

    <div class="desc">In addition to creating your own, some add-ons come with their own.</div>

    <div class="artboard-content py-4">
      <div class="mt-1 w-28 flex-none">Countries:</div>
      <div class="grow"></div>
      <div class="w-30 flex-none">
        <Toggle
          name="Black-list"
          v-model="country.wite_list"
          class="flex-grow"
          id="country"
          @change="update(country.wite_list, Rules.country)"
        />
      </div>
    </div>

    <div class="artboard-content">
      <FormInput
        v-model.trim="data.country"
        :error="error.errors.country"
        class="flex-grow"
        placeholder="Search country ..."
        @keyup="searchCountries()"
      />
    </div>

    <div class="artboard-content pb-4">
      <div class="flex-col">
        <div v-if="data.search" class="mt-3">
          <Badge
            v-for="(item, index) in data.search['countries']"
            :key="index"
            :name="item.name"
            color="green"
            class="mr-1 cursor-pointer"
            @click="addCountry(index, Rules.country)"
          />
        </div>

        <div class="pt-5">
          <span
            class="firewall-tags-item mr-3 mb-3 inline-flex items-center rounded border bg-gray-50 p-2"
            v-for="(item, index) in country.list"
          >
            <span class="ml-1">{{ item.country_name }}</span>
            <SvgIcon
              name="close"
              class="-mr-1 cursor-pointer"
              @click="remove(index, Rules.country)"
            />
          </span>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="artboard-content py-4">
      <div class="mt-1 w-28 flex-none">Networks:</div>
      <div class="grow"></div>
      <div class="w-30 flex-none">
        <Toggle
          name="Black-list"
          v-model="network.wite_list"
          class="flex-grow"
          id="network"
          @change="update(network.wite_list, Rules.ip)"
        />
      </div>
    </div>

    <div class="artboard-content">
      <FormInput
        v-model="data.network"
        :error="error.errors.network"
        class="flex-grow"
        placeholder="IP address or mask"
        v-on:keyup.enter="addIp(data.network, Rules.ip)"
      />
    </div>

    <div class="artboard-content pb-6">
      <div class="pt-5">
        <span
          class="firewall-tags-item mr-3 mb-3 inline-flex items-center rounded border bg-gray-50 p-2"
          v-for="(item, index) in network.list"
        >
          <span class="ml-1" v-if="item.start_ip !== item.end_ip">
            {{ item.start_ip }} - {{ item.end_ip }}
          </span>
          <span v-else>{{ item.start_ip }}</span>
          <SvgIcon name="close" class="-mr-1 cursor-pointer" @click="remove(index, Rules.ip)" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, onBeforeUnmount } from "vue";
import { Address4, Address6 } from "ip-address";
import { useErrorStore } from "@/store";
import { BServerName, SvgIcon, FormInput, Toggle, Badge } from "@/components";

import { firewall, addFirewall, updateFirewall, deleteFirewall } from "@/api/server";
import { countries } from "@/api/utility";
import { Countries_Request } from "@proto/utility";
import {
  Rules,
  IpMask,
  ServerFirewall_Request,
  UpdateServerFirewall_Request,
  DeleteServerFirewall_Request,
  ServerFirewall_Countries,
  Country,
} from "@proto/firewall";

const { proxy } = getCurrentInstance();
const data: any = ref({});
const country: any = ref({});
const network: any = ref({});
const error: any = useErrorStore();
const props = defineProps({
  projectId: String,
  serverId: String,
});

// country
const searchCountries = async () => {
  if (data.value.country.length > 2) {
    await countries(<Countries_Request>{
      name: data.value.country,
    }).then((res) => {
      data.value.search = res.data.result;
    });

    //console.log(data.value.search)
    if (data.value.search.countries.length > 0) {
      Object.entries(country.value.list).forEach((n) => {
        Object.entries(data.value.search.countries).forEach((s) => {
          if (s[1]["code"] === n[1]["country_code"]) {
            data.value.search.countries.splice(s[0], 1);
          }
        });
      });
    }
  }
};

const addCountry = async (index: number, rules: Rules) => {
  const _country = data.value.search.countries[index];
  create(_country.code, rules).then((res) => {
    if (res) {
      country.value.list.push({
        id: res,
        country_name: _country.name,
        country_code: _country.code,
      });

      data.value.search.countries.splice(index, 1);
    }
  });
};

// ip
const addIp = async (ip: any, rules: Rules) => {
  try {
    var address: Address4 | Address6 = new Address4(ip);
    if (!address.isCorrect()) {
      address = new Address6(ip);
      if (address.isCorrect()) {
        address = address.to4();
      }
    }

    const request: IpMask = {
      start_ip: address.startAddress().addressMinusSuffix,
      end_ip: address.endAddress().addressMinusSuffix,
    };

    //console.log(request)
    //return;

    create(request, rules).then((res) => {
      if (res) {
        network.value.list.push({
          id: res,
          start_ip: request.start_ip,
          end_ip: request.end_ip,
        });

        data.value.network = null;
      }
    });

    error.$reset();
  } catch (e) {
    error.errors.network = "Invalid address";
  }
};

// ---

const create = async (record: any, rules: Rules) => {
  let request: any;

  switch (rules) {
    case Rules.country:
      request = {
        project_id: props.projectId,
        server_id: props.serverId,
        country_code: record,
      };
      break;

    case Rules.ip:
      request = {
        project_id: props.projectId,
        server_id: props.serverId,
        ip: <IpMask>{
          start_ip: record.start_ip,
          end_ip: record.end_ip,
        },
      };
      break;

    default:
      return;
  }

  const id: string = await addFirewall(request).then((res) => {
    if (res.data.success) {
      const eventError = new CustomEvent("connextSuccess", {
        detail: res.data.message,
      });
      dispatchEvent(eventError);

      return res.data.result;
    }
  });

  return id;
};

const update = async (status: boolean, rules: Rules) => {
  switch (rules) {
    case Rules.country:
      country.value.wite_list = status;
      status = country.value.wite_list;
      break;

    case Rules.ip:
      network.value.wite_list = status;
      status = network.value.wite_list;
      break;

    default:
      return;
  }

  await updateFirewall(<UpdateServerFirewall_Request>{
    project_id: props.projectId,
    server_id: props.serverId,
    rule: rules,
    status: status,
  }).then((res) => {
    if (res.data.success) {
      const eventError = new CustomEvent("connextSuccess", {
        detail: res.data.message,
      });
      dispatchEvent(eventError);
    }
  });
};

const remove = async (index: number, rules: Rules) => {
  var record_id: string;

  switch (rules) {
    case Rules.country:
      record_id = country.value.list[index].id;
      break;

    case Rules.ip:
      record_id = network.value.list[index].id;
      break;

    default:
      return;
  }

  await deleteFirewall(<DeleteServerFirewall_Request>{
    project_id: props.projectId,
    server_id: props.serverId,
    rule: rules,
    record_id: record_id,
  }).then((res) => {
    if (res.data.success) {
      switch (rules) {
        case Rules.country:
          country.value.list.splice(index, 1);
          searchCountries();
          break;

        case Rules.ip:
          network.value.list.splice(index, 1);
          break;
      }

      const eventError = new CustomEvent("connextSuccess", {
        detail: res.data.message,
      });
      dispatchEvent(eventError);
    }
  });
};

onMounted(async () => {
  await firewall(<ServerFirewall_Request>{
    project_id: props.projectId,
    server_id: props.serverId,
  }).then((res) => {
    country.value = res.data.result.country;
    network.value = res.data.result.network;
  });
});

onBeforeUnmount(() => error.$reset());
</script>
