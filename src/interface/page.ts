export type PageData = {
  base?: any;
  tmp?: any;
  modal?: boolean;
  loading?: boolean;
  error?: Record<string, string | null>;
};

export const defaultPageData: PageData = {
  base: {},
  tmp: {},
  modal: false,
  loading: false,
  error: {}
};
