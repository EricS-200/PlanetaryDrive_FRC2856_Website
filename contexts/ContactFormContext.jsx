"use client";

import { createContext, useState, useContext } from "react";

const ContactFormContext = createContext();

export function ContactFormContextProvider({ children }) {
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    message: "",
    messageSent: false,
  });

  return (
    <ContactFormContext.Provider
      value={{ contactFormData, setContactFormData }}
    >
      {children}
    </ContactFormContext.Provider>
  );
}

export function useContactFormContext() {
  return useContext(ContactFormContext);
}
