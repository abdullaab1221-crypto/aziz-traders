"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in your name, email and message.");
      return;
    }
    setError("");
    setSent(true);
  }

  return (
    <div className="marble-surface min-h-screen">
      <div className="navy-surface">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <p className="text-[11px] tracking-[0.4em] uppercase text-gold">We&apos;re Here to Help</p>
          <h1 className="font-display text-4xl md:text-6xl text-marble mt-4">
            Contact <span className="gold-text">Us</span>
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 grid lg:grid-cols-2 gap-12">
        <div className="space-y-7">
          <div>
            <div className="gold-rule mb-6 w-40" />
            <h2 className="font-display text-2xl text-midnight">Get in Touch</h2>
            <p className="text-slate mt-3 leading-relaxed">
              Questions about an order, a product or a partnership? Send us a message and our team
              will respond during business hours.
            </p>
          </div>

          <dl className="space-y-5 text-sm">
            <div>
              <dt className="text-[11px] tracking-[0.2em] uppercase text-gold">Email</dt>
              <dd className="text-midnight mt-1">support@aziztraders.pk</dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-[0.2em] uppercase text-gold">Business Hours</dt>
              <dd className="text-midnight mt-1">Monday–Saturday, 10:00–19:00 PKT</dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-[0.2em] uppercase text-gold">Response Time</dt>
              <dd className="text-midnight mt-1">Within one business day</dd>
            </div>
          </dl>

          <div id="policies" className="rounded-2xl bg-white border border-royal/10 p-7">
            <h3 className="font-display text-xl text-midnight">Shipping & Returns — Summary</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate">
              <li>• Delivery estimated 3–7 business days across Pakistan.</li>
              <li>• Free shipping on orders over PKR 5,000.</li>
              <li>• Returns accepted per product eligibility; final policy published at launch.</li>
              <li>• Cash on Delivery available from day one; online payments after gateway approval.</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-royal/10 p-8">
          {sent ? (
            <div className="text-center py-12">
              <div className="h-14 w-14 rounded-full bg-midnight text-champagne grid place-items-center mx-auto text-xl">✓</div>
              <h2 className="font-display text-2xl text-midnight mt-6">Message Ready</h2>
              <p className="text-slate text-sm mt-3 leading-relaxed">
                Thank you, {form.name}. This preview does not send email yet — in production your
                message is delivered to our support inbox and you receive a confirmation.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5" noValidate>
              <h2 className="font-display text-2xl text-midnight">Send a Message</h2>
              <label className="block">
                <span className="text-[11px] tracking-[0.16em] uppercase text-midnight">Name</span>
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="mt-1.5 w-full border border-royal/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold" placeholder="Your name" />
              </label>
              <label className="block">
                <span className="text-[11px] tracking-[0.16em] uppercase text-midnight">Email</span>
                <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="mt-1.5 w-full border border-royal/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold" placeholder="you@example.com" />
              </label>
              <label className="block">
                <span className="text-[11px] tracking-[0.16em] uppercase text-midnight">Subject</span>
                <input value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} className="mt-1.5 w-full border border-royal/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold" placeholder="Order question" />
              </label>
              <label className="block">
                <span className="text-[11px] tracking-[0.16em] uppercase text-midnight">Message</span>
                <textarea rows={5} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className="mt-1.5 w-full border border-royal/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold resize-none" placeholder="How can we help?" />
              </label>
              {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
              <button type="submit" className="btn-gold w-full py-3.5 rounded-full text-xs tracking-[0.18em]">SEND MESSAGE</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
