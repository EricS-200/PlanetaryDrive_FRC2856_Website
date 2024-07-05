"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import { Loader2 } from "lucide-react";

import underConstruction from "/public/under-construction.jpeg";

const publicKey = "y9wI_ohJZlN5vidjt";
const serviceID = "gmail4958epkftub9349";
const templateID = "frc_contactUs";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const params = {
    name: name,
    email: email,
    message: message,
  };

  function validateForm() {
    return true;
  }

  function handleSubmit() {
    if (!validateForm) {
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
  }

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
    <main className=" w-full h-[calc(100vh-4rem)] flex flex-col items-center ">
      <h1 className="text-center my-4">Contact Us</h1>
      <form
        className={"flex flex-col w-2/5"}
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <h2 className="text-center">Email Form</h2>
        <p className="leading-normal">
          Feel free to send us an email for any question or request you may
          have. We will try to get back to you as soon as possible.
        </p>
        <label className={"text-white text-lg mb-1 font-semibold"}>Name</label>
        <input
          className={"w-full h-10 bg-gray-700 text-white mb-3 p-1.5 rounded-lg"}
          placeholder={"Your Name"}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label className={"text-white text-lg mb-1 font-semibold"}>Email</label>
        <input
          className={"w-full h-10 bg-gray-700 text-white mb-3 p-1.5 rounded-lg"}
          type="email"
          placeholder={"Your Email"}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <label className={"text-white text-lg mb-1 font-semibold"}>
          Message
        </label>
        <textarea
          className={
            "w-full h-28 bg-gray-700 text-white mb-3 p-1.5 rounded-lg resize-none"
          }
          placeholder={"Your Message"}
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <i className="mb-2">We will send you a confirmation email.</i>
        <p>{status}</p>
        <Button
          className="dark text-xl"
          size="lg"
          variant="outline"
          type="submit"
          disabled={loading}
        >
          <Loader2
            className={`mr-2 h-4 w-4 animate-spin ${
              loading ? "block" : "hidden"
            }`}
          />
          {loading ? <p>Submitting</p> : <p>Submit</p>}
        </Button>
      </form>
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
