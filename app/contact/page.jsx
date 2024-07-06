"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import { Loader2 } from "lucide-react";
import discordIcon from "/public/footer/discord-icon.svg";
import Image from "next/image";
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

import underConstruction from "/public/under-construction.jpeg";

const emailValidationRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;

const publicKey = "y9wI_ohJZlN5vidjt";
const serviceID = "gmail4958epkftub9349";
const templateID = "frc_contactUs";

export default function Contact() {
  const [hasChanged, setHasChanged] = useState(false);

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

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    emailjs.send(serviceID, templateID, params).then(
      () => {
        setStatus("Email Sent Successfully.");
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        setStatus(`Failed. An error occured: ${error.text}`);
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
    <main className=" w-full min-h-[calc(100vh-4rem)] flex flex-col items-center pb-8">
      <section className="w-full flex items-center flex-col">
        <h1 className="text-center mt-4">Contact Us</h1>
        <p className="text-xl w-[95vw] md:w-3/4 lg:w-3/5 xl:w-1/2 mb-4 text-center">
          You can use the contact form below to send us a message, or email us
          directly at{" "}
          <Link href={"mailto:planetarydrive2856@gmail.com"}>
            <Button className="text-xl dark p-0" variant="link">
              planetarydrive2856@gmail.com
            </Button>
          </Link>{" "}
          with any question or request. We will respond as soon as possible.
        </p>
      </section>
      <div className="flex  justify-center">
        <section className="flex flex-col items-center">
          <h2 className="text-center">Information</h2>
          <p>
            If you plan on joining the team, contact us through our member
            Discord.
          </p>
          <Link href="https://discord.gg/d36XRMfYUF" target="_blank">
            <Button className="dark p-8 my-3" variant="outline">
              <Image src={discordIcon} width={30} className="mr-4" />
              <p className="text-2xl">Member Discord</p>
            </Button>
          </Link>
        </section>
        <section className="flex justify-center">
          <form
            noValidate
            onChange={() => {
              setHasChanged(true);
            }}
            className={
              "flex flex-col p-8 bg-neutral-950 rounded-lg border-2 border-gray-600"
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
              className={`w-full h-28 bg-gray-700 text-white  p-1.5 rounded-lg resize-none border border-gray-500 ${
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
              <p className="text-red-500 mb-1">
                This field is required. Please input your message.
              </p>
            )}
            <i className="mb-2">We will send you a confirmation email.</i>
            <p>{status}</p>
            <Button
              onClick={handleSubmit}
              className="dark bg-neutral-950 hover:bg-neutral-800 text-xl w-full"
              size="lg"
              variant="outline"
              disabled={loading}
              type="button"
            >
              <Loader2
                className={`mr-2 h-4 w-4 animate-spin ${
                  loading ? "block" : "hidden"
                }`}
              />
              {loading ? <p>Submitting</p> : <p>Submit</p>}
            </Button>
            {/* <AlertDialog className="">
          <AlertDialogTrigger asChild>
            <Button
              className="dark bg-neutral-950 hover:bg-neutral-800 text-xl w-full"
              size="lg"
              variant="outline"
              disabled={loading}
              type="button"
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
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>
                Submit
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> */}
          </form>
        </section>
      </div>
    </main>
  );
}

// useEffect(() => {
//   //Main func
//   const inputStuff = () => {
//     if (
//       document.getElementById("inputEmail") &&
//       document.getElementById("inputName") !== null &&
//       document.getElementById("inputName").value !== "" &&
//       document.getElementById("inputEmail") !== null &&
//       document.getElementById("inputEmail").value !== "" &&
//       document.getElementById("inputMessage") !== null &&
//       document.getElementById("inputMessage").value !== ""
//     ) {
//       ValidateEmail(document.getElementById("inputEmail"));
//     } else {
//       if (
//         document.getElementById("error").innerHTML === "" ||
//         document.getElementById("error").innerHTML ===
//           "Please enter a valid email address"
//       ) {
//         document.getElementById("error").innerHTML =
//           "Please fill out all fields";
//       } else {
//         document.getElementById("error").innerHTML =
//           document.getElementById("error").value +
//           "\nPlease fill out all fields";
//       }
//     }

//     //Helper functions
//     function ValidateEmail(email) {
//       let validRegex =
//         /(?:[a-zA-Z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
//       /*
//                 Hey. Yes, I'm talking to you :). If you can modify this to send spam emails: don't do it. This is a robotics team. We don't need spam emails. Thank you :).
//              */
//       if (email.value.match(validRegex)) {
//         let templateParams = {
//           name: document.getElementById("inputEmail").value,
//           email: document.getElementById("inputName").value,
//           message: document.getElementById("inputMessage").value,
//         };

//         getInfo().then((struct) => {
//           let options = {
//             publicKey: struct.publicKey,
//             // Do not allow headless browsers
//             blockHeadless: true,
//             blockList: {
//               // Block the suspended emails
//               list: ["thisIsDefFake@emailjsjsjsjs.com"],
//               // The variable contains the email address
//               watchVariable: "senderEmailAddr",
//             },
//             limitRate: {
//               // Allow 1 request per 10s
//               throttle: 10000,
//             },
//           };

//           emailjs.init(options);

//           emailjs
//             .send(struct.serviceID, struct.templateID, templateParams)
//             .then(
//               (response) => {
//                 document.getElementById("error").innerHTML =
//                   "Email sent successfully!";
//                 emptyShit();
//                 handleColorCrap(false);
//                 return true;
//               },
//               (error) => {
//                 console.log("FAILED: ", error);
//                 return false;
//               }
//             );
//         });
//       } else {
//         document.getElementById("error").innerHTML =
//           "Please enter a valid email address";
//         handleColorCrap(true);
//         return false;
//       }
//     }

//     function handleColorCrap(failure) {
//       if (failure) {
//         document.getElementById("error").classList.add("text-red-600");
//         document.getElementById("error").classList.remove("text-green-300");
//       } else {
//         document.getElementById("error").classList.remove("text-red-600");
//         document.getElementById("error").classList.add("text-green-300");
//       }
//     }

//     function emptyShit() {
//       document.getElementById("inputEmail").innerHTML = "";
//       document.getElementById("inputName").innerHTML = "";
//       document.getElementById("inputMessage").innerHTML = "";
//     }
//   };

//   const submitButton = document.getElementById("submit");
//   if (submitButton) {
//     submitButton.onclick = inputStuff;
//   }
// }, []);

// return (
//   <div className={"bg-slate-950 pb-2 border-t-2"}>
//     <div
//       className={
//         "w-full flex justify-center flex-col items-start pl-5 sm:pl-28"
//       }
//     >
//       <div className={"w-full flex flex-col pr-5 sm:pr-28"}>
//         <h2 className="mb-8 mt-8 lg:mb-12 lg:mt-8 text-4xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold">
//           Contact <span className={"text-green-300"}>Us </span>
//         </h2>

//         {/*
//                 Hey. Yes, I'm talking to you :). If you can modify this to send spam emails: don't do it. This is a robotics team. We don't need random emails. Thank you :).
//                 */}

// <form className={"flex flex-col w-full"}>
//   <label className={"text-white text-lg mb-1"}>Name</label>
//   <input
//     className={"w-full h-10 bg-gray-700 text-white mb-3 p-1.5"}
//     type="text"
//     placeholder={"Name"}
//     id={"inputName"}
//   />

//   <label className={"text-white text-lg mb-1"}>Email</label>
//   <input
//     className={"w-full h-10 bg-gray-700 text-white mb-3 p-1.5"}
//     type="email"
//     placeholder={"Email"}
//     id={"inputEmail"}
//   />

//   <label className={"text-white text-lg mb-1"}>Message</label>
//   <textarea
//     className={"w-full h-32 bg-gray-700 text-white mb-3 p-1.5"}
//     placeholder={"Message"}
//     id={"inputMessage"}
//   />

//   <button
//     className={"bg-green-300 text-white w-32 h-10 rounded-lg"}
//     type={"button"}
//     id={"submit"}
//   >
//     Submit
//   </button>
// </form>
//         <p id={"error"} className={"text-red-600"}></p>
//       </div>
//     </div>
//   </div>
// );
