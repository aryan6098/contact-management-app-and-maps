import React, { useState } from "react";
import {
  ContactType,
  useGetContactsQuery,
  useDeleteContactMutation,
} from "../store/services/contactDetailsApi";
import { AiFillCloseCircle } from "react-icons/ai";
import ContactForm from "./ContactForm";
import { toast } from "react-toastify";

const Contact = () => {
  const { data, isLoading, refetch } = useGetContactsQuery();

  const [deleteContact] = useDeleteContactMutation();

  const [isCreate, setIsCreate] = useState<Boolean>(false);
  const [id, setId] = useState<number | null>(null);

  const onSubmitHandler = () => {
    setIsCreate(false);
    refetch();
  };

  const deleteContactHandler = (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) {
      return;
    }

    deleteContact(id)
      .unwrap()
      .then(() => {
        toast.success("Contact deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const contactFormHandler = (id?: number) => {
    if (id !== undefined) {
      setId(id);
      setIsCreate(false);
    } else {
      setId(null);
      setIsCreate(true);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        {!id && (
          <button
            onClick={() => contactFormHandler(undefined)}
            className="bg-[#8e8c8c] hover:bg-opacity-70 hover:bg-gradient-to-r from-[#8e8c8c] to-secondary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Contact
          </button>
        )}
      </div>
      {(isCreate || id) && (
        <ContactForm
          onSubmitHandler={onSubmitHandler}
          contactFormHandler={contactFormHandler}
          refetch={refetch}
          id={id}
        />
      )}

      <div className="flex flex-wrap">
        {data?.length ? (
          data?.map((contact: ContactType, index: number) => (
            <div
              className="inline-block bg-white rounded-lg overflow-hidden shadow-lg p-4 mx-2 my-2 w-auto"
              key={index}
            >
              <div className="flex flex-col">
                <div className="flex mb-2">
                  <label className="font-medium w-24">First Name:</label>
                  <div className="">{contact.firstName}</div>
                </div>
                <div className="flex mb-2">
                  <label className=" font-medium w-24">Last Name:</label>
                  <div className="">{contact.lastName}</div>
                </div>
                <div className="flex mb-2">
                  <label className=" font-medium w-24">Status:</label>
                  <div className="">{contact.status}</div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => contactFormHandler(contact?.id)}
                  className="items-center block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteContactHandler(contact?.id)}
                  className="bg-red-500 block hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : isLoading ? (
          <>Loading.....</>
        ) : (
          !isCreate && (
            <div className="w-1/2 mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-5 mb-5">
              <div className="py-4 px-6 ">
                <div className="flex flex-row p-5">
                  <div className="flex ">
                    <AiFillCloseCircle size={28} className="mr-5" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-500 text-md">
                      No Contact Found. Please add contact from Create Contact
                      Button.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Contact;
