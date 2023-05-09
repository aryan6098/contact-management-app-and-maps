import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type ContactType = {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
};

type GetContactsResponse = ContactType[];

interface DeleteContactResponse {
  message: string;
}

interface EditContactResponse {
  message: string;
}

interface CreateContactResponse {
  message: string;
}

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://first-cry-j9l8.onrender.com/contact/",
  }),
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 0,
  refetchOnReconnect: true,
  tagTypes: ["getContact"],
  endpoints: (builder) => ({
    // get contacts
    getContacts: builder.query<GetContactsResponse, void>({
      query: () => "",
      providesTags: ["getContact"],
    }),

    // get contact by id
    getContactById: builder.query<ContactType, number>({
      query: (id) => `${id}`,
      providesTags: ["getContact"],
    }),

    // create contact
    createContact: builder.mutation<CreateContactResponse, ContactType>({
      query: (contact) => ({
        url: "",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["getContact"],
    }),

    // edit contact by id
    editContact: builder.mutation<
      EditContactResponse,
      { id: number; payload: any }
    >({
      query: ({ id, payload }) => ({
        url: `${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["getContact"],
    }),
    // delete contact by id
    deleteContact: builder.mutation<DeleteContactResponse, number>({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getContact"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useDeleteContactMutation,
  useEditContactMutation,
  useCreateContactMutation,
  useGetContactByIdQuery,
} = contactApi;
