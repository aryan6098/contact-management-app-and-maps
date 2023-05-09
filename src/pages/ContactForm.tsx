import React, { useEffect, useState } from "react";
import {
  useCreateContactMutation,
  useGetContactByIdQuery,
  useEditContactMutation,
} from "../store/services/contactDetailsApi";
import { toast } from "react-toastify";

interface ContactFormValues {
  firstName: string;
  lastName: string;
  status: string;
}

type SubmitHandler = () => void;

interface ContactFormProps {
  onSubmitHandler: SubmitHandler;
  refetch: any;
  id?: number | null;
  contactFormHandler: Function;
}
const ContactForm = ({
  onSubmitHandler,
  id,
  contactFormHandler,
}: ContactFormProps) => {
  const [createContact] = useCreateContactMutation();
  const [editContact] = useEditContactMutation();

  const { data: contact } = useGetContactByIdQuery(id!, { skip: !id });

  const [formValues, setFormValues] = useState<ContactFormValues>({
    firstName: contact ? contact.firstName : "",
    lastName: contact ? contact.lastName : "",
    status: contact ? contact.status : "active",
  });

  useEffect(() => {
    if (contact) {
      setFormValues({
        ...formValues,
        firstName: contact?.firstName,
        lastName: contact.lastName,
        status: contact.status,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormValues({
      ...formValues,
      status: event.target.value as "active" | "inactive",
    });
  };
  const handleCreate = async (contact: any) => {
    try {
      await createContact(contact).unwrap();
    } catch (error) {
      console.error("Failed to create contact:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const payload = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      status: formValues.status,
    };
    if (id) {
      editContact({
        id,
        payload: payload,
      })
        .unwrap()
        .then(() => {
          toast.success("Contact updated successfully");
          contactFormHandler(null);
        })
        .catch((error) => {});
    } else {
      handleCreate(payload).then(() => toast.success("Contact Added"));
    }
    onSubmitHandler();
  };
  return (
    <>
      <form onSubmit={(e: any) => handleSubmit(e)}>
        <div className="w-1/2 mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-5 mb-5">
          <div className="py-4 px-6 ">
            <div>
              <div className="flex items-center mb-4">
                <label className="w-32" htmlFor="first-name">
                  First Name:
                </label>
                <input
                  className="w-1/2 border border-gray-400 py-1 px-3 rounded"
                  id="first-name"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex items-center mb-4">
                <label className="w-32" htmlFor="last-name">
                  Last Name:
                </label>
                <input
                  className="w-1/2 border border-gray-400 py-1 px-3 rounded"
                  id="last-name"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex items-center mb-4">
                <label className="w-32 ">Status:</label>
                <div className="flex flex-col ">
                  <div className="flex ">
                    <input
                      id="active"
                      className="leading-tight mr-2"
                      type="radio"
                      name="status"
                      value="active"
                      checked={formValues.status === "active"}
                      onChange={handleStatusChange}
                    />
                    <label htmlFor="active">Active</label>
                  </div>
                  <div className="flex ">
                    <input
                      className="leading-tight mr-2"
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={formValues.status === "inactive"}
                      onChange={handleStatusChange}
                    />
                    <label htmlFor="inactive">Inactive</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#8e8c8c] hover:bg-opacity-70 hover:bg-gradient-to-r from-[#8e8c8c] to-secondary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {id !== null ? "Save Edited Contact " : "Save Contact"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
