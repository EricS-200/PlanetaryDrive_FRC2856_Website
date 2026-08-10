"use client";

import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Check, Loader2, Send } from "lucide-react";

const publicKey = "y9wI_ohJZlN5vidjt";
const serviceID = "service_wpond7o";
const templateID = "frc_contactUs";

const emptyForm = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    emailjs.init({
      publicKey,
      blockHeadless: true,
      limitRate: { id: "planetary-drive-contact", throttle: 5000 },
    });
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  }

  function validate() {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) nextErrors.message = "Please write a message.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    setState("sending");
    setStatusMessage("Sending your message…");

    try {
      await emailjs.send(serviceID, templateID, form);
      setState("sent");
      setStatusMessage("Your message was sent successfully.");
      setForm(emptyForm);
    } catch {
      setState("error");
      setStatusMessage(
        "We could not send that message. Please try again or email us directly.",
      );
    }
  }

  if (state === "sent") {
    return (
      <div className="contact-success" role="status">
        <span><Check size={28} aria-hidden="true" /></span>
        <p className="eyebrow">MESSAGE SENT</p>
        <h2>Thank you for reaching out.</h2>
        <p>
          We will get back to you as soon as the team can. A copy of your message
          should arrive at the email address you provided.
        </p>
        <button
          type="button"
          className="button button-ghost"
          onClick={() => {
            setState("idle");
            setStatusMessage("");
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form-heading">
        <div>
          <p className="eyebrow">DIRECT TO THE TEAM</p>
          <h2>Send a message</h2>
        </div>
        <span>ALL FIELDS REQUIRED</span>
      </div>

      <div className="form-field">
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={updateField}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          placeholder="Your name"
        />
        {errors.name && <p id="contact-name-error" className="field-error">{errors.name}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={updateField}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          placeholder="you@example.com"
        />
        {errors.email && <p id="contact-email-error" className="field-error">{errors.email}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={7}
          value={form.message}
          onChange={updateField}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          placeholder="Tell us how we can help."
        />
        {errors.message && (
          <p id="contact-message-error" className="field-error">{errors.message}</p>
        )}
      </div>

      <div className="form-submit-row">
        <p id="contact-form-status" role="status" aria-live="polite">
          {statusMessage}
        </p>
        <button
          className="button button-primary"
          type="submit"
          disabled={state === "sending"}
          aria-describedby="contact-form-status"
        >
          {state === "sending" ? (
            <>
              Sending <Loader2 className="spinner" size={18} aria-hidden="true" />
            </>
          ) : (
            <>
              Send message <Send size={17} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
