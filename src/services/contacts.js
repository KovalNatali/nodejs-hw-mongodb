// import { saveFileToLocalMachine } from '../utils/saveFileToLocalMachine.js';

import { contactsModel } from '../db/models/contacts.js';

import { saveImageToCloudinary } from '../utils/saveImageToCloudinary.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = 'asc',
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const skip = (page - 1) * perPage;

  const contactsQuery = contactsModel.find({ userId });

  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }

  if (filter.isFavourite || filter.isFavourite === false) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  const [contactCount, contacts] = await Promise.all([
    contactsModel.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
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

export const getContactById = async (contactId, userId) => {
  const contact = await contactsModel.findOne({ _id: contactId, userId });
  return contact;
};

export const deleteContactById = async (contactId, userId) => {
  const contact = await contactsModel.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return contact;
};

export const createContact = async ({ photo, ...payload }, userId) => {
  // const url = await saveFileToLocalMachine(photo);

  const url = await saveImageToCloudinary(photo);

  const contact = await contactsModel.create({
    ...payload,
    userId,
    photoUrl: url,
  });
  return contact;
};

export const updateContact = async (
  contactId,
  userId,
  payload,
  options = {},
) => {
  const rawResult = await contactsModel.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
