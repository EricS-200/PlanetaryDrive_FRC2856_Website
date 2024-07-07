"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import { Loader2 } from "lucide-react";
import discordIcon from "/public/footer/discord-icon.svg";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

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

export default function Contact() {
  return (
    <main className=" w-full min-h-[calc(100vh-4rem)] flex flex-col items-center pb-8">
      <section className="w-full flex items-center flex-col">
        <h1 className="sm:text-8xl text-6xl text-center mt-4">Contact Us</h1>
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
      {/* <section className="flex flex-col items-center lg:flex-row lg:space-x-12 justify-center text-xl">
        <section className="flex flex-col items-center w-1/2  ">
          <h2 className="text-center">Information</h2>
          <p className="text-center">
            We are a high school robotics team based in Lexington, KY. We
            participate in the annual <i>FIRST</i> Robotics Competition
          </p>
        </section>
        <ContactForm
          className={
            "mx-6 my-6 lg:my-0 lg:mx-0 lg:mr-4  max-w-[800px] shadow-lg shadow-slate-800 rounded-xl"
          }
        />
      </section> */}
      <ContactForm
        className={
          "mx-6 my-6 lg:my-0 lg:mx-0 max-w-[800px] shadow-lg shadow-slate-800 rounded-xl"
        }
      />
      <p className="text-center text-xl mt-8 max-w-[95vw]">
        If you plan on joining the team, contact us directly through our member
        Discord.
      </p>
      <Link href="https://discord.gg/d36XRMfYUF" target="_blank">
        <Button className="dark p-8 mt-4" variant="outline">
          <Image src={discordIcon} width={30} className="mr-4" />
          <p className="text-2xl">Member Discord</p>
        </Button>
      </Link>
    </main>
  );
}
