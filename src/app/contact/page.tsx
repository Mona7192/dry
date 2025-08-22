"use client";

import React from "react";
import { Phone, Mail, MapPin, MessageSquare, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Ui/card";
import { Button } from "@/components/Ui/button";
import { Badge } from "@/components/Ui/badge";
import { Input } from "@/components/Ui/input";
import { Textarea } from "@/components/Ui/textarea";

const Section: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <section className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className || ""}`}>
    {children}
  </section>
);

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Section className="py-14">
        <div className="flex flex-col items-start gap-3">
          <Badge className="rounded-2xl px-3 py-1 text-sm">Contact Us</Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">We’re here to help</h1>
          <p className="max-w-2xl text-muted-foreground">
            Questions about pickup windows, pricing, or bulk orders? Send us a message—our team usually replies within a few hours.
          </p>
        </div>
      </Section>

      {/* Content */}
      <Section className="pb-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Contact methods */}
          <div className="space-y-4">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Phone className="h-5 w-5"/> Call us</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Sat–Thu, 9:00–20:00</p>
                <p className="mt-1 font-medium text-foreground">+98 (000) 000-0000</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5"/> Email</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Support and general inquiries</p>
                <p className="mt-1 font-medium text-foreground">support@yourlaundry.com</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5"/> Address</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>123 Clean Street, City, Country</p>
                <div className="mt-3 h-40 w-full overflow-hidden rounded-xl bg-gray-100" aria-label="Map placeholder" />
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5"/> Send a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  className="grid gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget as HTMLFormElement;
                    const data = Object.fromEntries(new FormData(form) as any);
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(data),
                    })
                      .then(() => alert("Thanks! We received your message."))
                      .catch(() => alert("Something went wrong. Please try again."));
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium" htmlFor="name">Full name</label>
                      <Input id="name" name="name" placeholder="Your name" required className="rounded-2xl"/>
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium" htmlFor="phone">Phone</label>
                      <Input id="phone" name="phone" placeholder="09xxxxxxxxx" className="rounded-2xl"/>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="email">Email</label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" required className="rounded-2xl"/>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="subject">Subject</label>
                    <Input id="subject" name="subject" placeholder="How can we help?" className="rounded-2xl"/>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="message">Message</label>
                    <Textarea id="message" name="message" placeholder="Tell us more..." required className="min-h-[140px] rounded-2xl"/>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ShieldCheck className="h-4 w-4"/>
                      <span>We’ll never share your details.</span>
                    </div>
                    <Button type="submit" size="lg" className="rounded-2xl">Send</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Bottom CTA */}
      <Section className="pb-20">
        <Card className="rounded-2xl">
          <CardContent className="flex flex-col items-start justify-between gap-4 p-6 md:flex-row md:items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4"/>
              <span>Average response time: ~3 hours</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="rounded-2xl">WhatsApp</Badge>
              <Badge variant="secondary" className="rounded-2xl">Telegram</Badge>
              <Badge variant="secondary" className="rounded-2xl">Instagram</Badge>
            </div>
          </CardContent>
        </Card>
      </Section>
    </div>
  );
}
