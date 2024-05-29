<template>
  <div v-if="totalPages > 1" class="pagination">
    <router-link v-for="page in totalPages" :key="page" class="pagination btn" :to="{ name: route.name, query: getQuery(page) }" :class="{ 'btn-active': page === currentPage }"
      @click="onSelectPage(getQuery(page))">
      {{ page }}
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  total: Number,
});

const emits = defineEmits(["selectPage"]);
const route = useRoute();

const limit = computed(() => Number(route.query.limit) || 10);
const offset = computed(() => Number(route.query.offset) || 0);

const totalPages = computed(() => Math.ceil(props.total / limit.value));
const currentPage = computed(() => Math.floor(offset.value / limit.value) + 1);

const getQuery = (page: number) => ({
  limit: limit.value,
  offset: (page - 1) * limit.value,
});

const onSelectPage = (query: Record<string, any>) => {
  emits("selectPage", query);
};
</script>

<style lang="scss" scoped>
.pagination {
  @apply flex;

  &.btn {
    @apply mr-2 inline-block rounded bg-gray-200 py-1.5 px-3 text-gray-700;

    &-active {
      @apply bg-gray-700 text-gray-200;
    }
  }
}
</style>
