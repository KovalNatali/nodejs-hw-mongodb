import { contactsModel } from '../db/models/contacts.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = 'asc',
  sortBy = 'name',
  filter = {},
}) => {
  const skip = (page - 1) * perPage;
  const contactsQuery = contactsModel.find();

  if (filter.isFavourite || filter.isFavourite === false) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  const [contactCount, contacts] = await Promise.all([
    // contactsModel.countDocuments(),
    contactsModel.find().merge(contactsQuery).countDocuments(),
    contactsModel
      .find()
      .merge(contactsQuery)
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder }),
  ]);

  const totalPages = Math.ceil(contactCount / perPage);
  const hasPreviousPage = page < totalPages;
  const hasNextPage = page > 1 && (page < totalPages || page === totalPages);

  return {
    contacts,
    totalItems: contactCount,
    perPage,
    page,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export const getContactById = async (contactId) => {
  const contact = await contactsModel.findById(contactId);
  return contact;
};

export const deleteContactById = async (contactId) => {
  const contact = await contactsModel.findByIdAndDelete(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await contactsModel.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await contactsModel.findByIdAndUpdate(
    { _id: contactId },
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
