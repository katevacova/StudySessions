export type ApiRespMultiple<T> = {
  data: T[];
};

export type ApiRespMultiPaginated<T> = ApiRespMultiple<T> & {
  page: number;
  totalPages: number;
};
