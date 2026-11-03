export type PageData = {
  base?: any;
  tmp?: any;
  modal?: boolean;
  skeleton?: boolean;
  loading?: boolean;
  error?: Record<string, string | null>;
};

export function usePageData(): PageData {
  const pageData = $state<PageData>({
    base: {},
    tmp: {},
    modal: false,
    skeleton: false,
    loading: false,
    error: {}
  });

  return pageData;
}
