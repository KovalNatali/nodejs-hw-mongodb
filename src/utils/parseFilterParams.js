const BOOLEANS = ['true', 'false'];
const parseBoolean = (value) => {
  if (!BOOLEANS.includes(value)) return;
  return value === 'true' ? true : false;
};

const TYPE = ['work', 'home', 'personal'];
const parseType = (value) => {
  if (TYPE.includes(value)) return value;
};

export const parseFilterParams = (query) => {
  return {
    isFavourite: parseBoolean(query.isFavourite),
    contactType: parseType(query.contactType),
  };
};
