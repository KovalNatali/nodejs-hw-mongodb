const SORT_ORDERS = ['asc', 'desc'];
const SORT_BY = ['name', 'phoneNumber', 'email'];

export const parseSortParams = (query) => {
  const sortOrder = SORT_ORDERS.includes(query.sortOrder)
    ? query.sortOrder
    : 'asc';

  const sortBy = SORT_BY.includes(query.sortBy) ? query.sortBy : 'name';

  return {
    sortOrder,
    sortBy,
  };
};
