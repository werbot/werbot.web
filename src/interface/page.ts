import { Ref, ref } from "vue";

export type PageData = {
  base?: any;
  tmp?: any;
  modal?: boolean;
  skeleton?: boolean;
  loading?: boolean;
  error?: Record<string, string | null>;
};

export function usePageData(): Ref<PageData> {
  const pageData = ref<PageData>({
    base: {},
    tmp: {},
    modal: false,
    skeleton: false,
    loading: false,
    error: {}
  });

  return pageData;
}
