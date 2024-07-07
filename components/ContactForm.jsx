"use client";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import { Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const emailValidationRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;

const publicKey = "y9wI_ohJZlN5vidjt";
const serviceID = "service_wpond7o";
const templateID = "frc_contactUs";

export default function ContactForm({ className }) {
  const [hasChanged, setHasChanged] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  const [messageSent, setMessageSent] = useState(false);

  // keeps track of input field values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // keeps track of whether fields are empty or not & whether email is valid
  const [nameIsEmpty, setNameIsEmpty] = useState(false);
  const [emailIsEmpty, setEmailIsEmpty] = useState(false);
  const [messageIsEmpty, setMessageIsEmpty] = useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);

  const statusErrorMessage =
    "An error occured. Try again or email us directly.";

  const params = {
    name: name,
    email: email,
    message: message,
  };

  useEffect(() => {
    if (!hasChanged) return;
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload, {
      capture: true,
    });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload, {
        capture: true,
      });
    };
  }, [hasChanged]);

  function validateForm() {
    let status = true; // whether the form is ready to submit or not (all fields filled & email valid)

    if (name.trim() === "") {
      setNameIsEmpty(true);
      status = false;
    } else {
      setNameIsEmpty(false);
    }

    if (email.trim() === "") {
      setEmailIsEmpty(true);
      status = false;
    } else {
      setEmailIsEmpty(false);
    }

    if (message.trim() === "") {
      setMessageIsEmpty(true);
      status = false;
    } else {
      setMessageIsEmpty(false);
    }

    if (!emailValidationRegex.test(email)) {
      setEmailIsInvalid(true);
      status = false;
    } else {
      setEmailIsInvalid(false);
    }

    return status;
  }

  function confirmSubmit() {
    if (!validateForm()) return;
    setModalOpen(true);
  }

  const handleSubmit = () => {
    setModalOpen(false);
    setLoading(true);
    emailjs.send(serviceID, templateID, params).then(
      () => {
        setStatus("Email Sent Successfully.");
        setMessageSent(true);
        setLoading(false);
      },
      (error) => {
        setErrorModalOpen(true);
        setLoading(false);
        setErrorMessage(error);
        setStatus(statusErrorMessage);
      }
    );
  };

  emailjs.init({
    publicKey: publicKey,
    blockHeadless: true,
    blockList: {},
    limitRate: {
      id: "app",
      throttle: 5000,
    },
  });
  return (
    <section className={className}>
      {messageSent && (
        <div className="w-full h-min rounded-lg bg-neutral-950 border-2 border-gray-600 p-8 flex flex-col items-center text-center">
          <h3 className="text-center">Thank you for sending us a message.</h3>
          <h4 className="mt-2 text-center">
            We will try to get back to you as soon as possible.
          </h4>
          <p className="text-xl text-center mt-2">
            We have sent a copy of your message to your email.
          </p>
        </div>
      )}
      {status === statusErrorMessage && (
        <AlertDialog open={errorModalOpen}>
          <AlertDialogContent className="dark">
            <AlertDialogHeader>
              <AlertDialogTitle>An error occured.</AlertDialogTitle>
              <AlertDialogDescription>
                <p className="leading-normal">
                  Your message could not be delivered due to an error. Please
                  try again or email us directly. Error Code:{" "}
                  {errorMessage.status}
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setErrorModalOpen(false)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {!messageSent && (
        <form
          noValidate
          onChange={() => {
            setHasChanged(true);
          }}
          className={
            "flex flex-col p-8 bg-neutral-950 rounded-lg border-2 border-gray-600 w-full"
          }
        >
          <h2 className="text-center">Email Form</h2>
          <p className="leading-normal my-2">
            Feel free to send us an email for any question or request you may
            have. We will try to get back to you as soon as possible.
          </p>
          <label className={"text-white text-lg mb-1 font-semibold"}>
            Name
          </label>
          <input
            className={`w-full h-10 bg-gray-700 text-white  p-1.5 rounded-lg border border-gray-500 ${
              nameIsEmpty
                ? "border-red-700 outline-none focus:ring-1 focus:ring-red-600"
                : "mb-3"
            }`}
            placeholder={"Your Name"}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          {nameIsEmpty && (
            <p className="text-red-500 mb-1">
              This field is required. Please input your name.
            </p>
          )}
          <label className={"text-white text-lg mb-1 font-semibold"}>
            Email
          </label>
          <input
            className={`w-full h-10 bg-gray-700 text-white  p-1.5 rounded-lg border border-gray-500 ${
              emailIsEmpty || emailIsInvalid
                ? "border-red-700 outline-none focus:ring-1 focus:ring-red-600"
                : "mb-3"
            }`}
            type="email"
            placeholder={"Your Email"}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          {emailIsEmpty && (
            <p className="text-red-500 mb-1">
              This field is required. Please input your email address.
            </p>
          )}
          {!emailIsEmpty && emailIsInvalid && (
            <p className="text-red-500 mb-1">
              Please input a valid email address.
            </p>
          )}

          <label className={"text-white text-lg mb-1 font-semibold"}>
            Message
          </label>
          <textarea
            className={`w-full h-36 bg-gray-700 text-white  p-1.5 rounded-lg resize-none border border-gray-500 ${
              messageIsEmpty
                ? "border-red-700 outline-none focus:ring-1 focus:ring-red-600"
                : "mb-3"
            }`}
            placeholder={"Your Message"}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          {messageIsEmpty && (
            <p className="text-red-500">
              This field is required. Please input your message.
            </p>
          )}
          <i className="">We will send you a confirmation email.</i>
          <p className="text-orange-700 p-0 m-0">{status}</p>
          <AlertDialog className="" open={modalOpen}>
            <AlertDialogTrigger asChild>
              {/* For this confirmation modal from shadcn, the AlertDialogTrigger is not used, instead a state is used to control modal opening/closing to be able to integrate form validation before allowing the user to see the confirmation modal. */}
              <Button
                className="dark bg-neutral-950 hover:bg-neutral-800 text-xl w-full mt-3"
                size="lg"
                variant="outline"
                disabled={loading}
                type="button"
                onClick={confirmSubmit}
              >
                <Loader2
                  className={`mr-2 h-4 w-4 animate-spin ${
                    loading ? "block" : "hidden"
                  }`}
                />
                {loading ? <p>Submitting</p> : <p>Submit</p>}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="dark">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to send this?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Make sure you have filled out all the fields and written
                  everything you have to say. We will try to get back to you as
                  soon as possible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleSubmit}>
                  Submit
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      )}
    </section>
  );
}
