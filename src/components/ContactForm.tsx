import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle, WarningCircle } from "@phosphor-icons/react";

type ContactFormState = { name: string; email: string; company: string; phone: string; message: string };

const initialForm: ContactFormState = { name: "", email: "", company: "", phone: "", message: "" };

const supabaseUrl = "https://hnfdrolietieeqotxgqq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuZmRyb2xpZXRpZWVxb3R4Z3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3NDA3NTcsImV4cCI6MjEwMDMxNjc1N30.Avdto-_gKj5qInBXGp0yGY-JKShYOBEFuemwvjLbWtY";
const contactEndpoint = `${supabaseUrl}/functions/v1/send-contact-email`;

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [website, setWebsite] = useState("");

  const updateField = (field: keyof ContactFormState, value: string) => { setForm((c) => ({ ...c, [field]: value })); if (status !== "idle") setStatus("idle"); };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (website) { setStatus("error"); setErrorMessage("Your message could not be verified. Please try again."); return; }
    setStatus("sending");
    setErrorMessage("");
    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${supabaseAnonKey}` },
        body: JSON.stringify({ ...form, message: form.phone ? `Phone: ${form.phone}\n\n${form.message}` : form.message }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(typeof result.error === "string" ? result.error : "Your message could not be sent.");
      setForm(initialForm);
      setStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Your message could not be sent. Please try again.");
      setStatus("error");
    }
  };

  return (
    <form className="contact-form" onSubmit={submitForm}>
      <div className="contact-form-heading"><span>Start a conversation</span><h3>How can we help?</h3><p>A Redstone team member will review your message and follow up personally.</p></div>
      <div className="contact-form-fields">
        <label><span>Full name</span><input name="name" type="text" autoComplete="name" value={form.name} onChange={(e) => updateField("name", e.target.value)} required /></label>
        <label><span>Work email</span><input name="email" type="email" autoComplete="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} required /></label>
        <label className="contact-form-company"><span>Company</span><input name="company" type="text" autoComplete="organization" value={form.company} onChange={(e) => updateField("company", e.target.value)} required /></label>
        <label><span>Phone number <small>(optional)</small></span><input name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} /></label>
        <label className="contact-form-message"><span>How can we help?</span><textarea name="message" rows={5} value={form.message} onChange={(e) => updateField("message", e.target.value)} required /></label>
        <label className="contact-form-honeypot" aria-hidden="true"><span>Website</span><input name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
      </div>
      <div className="contact-form-submit">
        <button className="button" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending message\u2026" : "Send message"}{status !== "sending" && <ArrowRight size={18} weight="bold" aria-hidden="true" />}</button>
        <p>We use your details only to respond to your enquiry.</p>
      </div>
      <div className="contact-form-status" aria-live="polite">
        {status === "success" && <p className="is-success"><CheckCircle size={19} weight="fill" aria-hidden="true" />Thank you. Your message has been sent to Redstone.</p>}
        {status === "error" && <p className="is-error"><WarningCircle size={19} weight="fill" aria-hidden="true" />{errorMessage}</p>}
      </div>
    </form>
  );
}
