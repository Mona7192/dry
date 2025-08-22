"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles, ShieldCheck, Timer, Leaf, Truck, ArrowRight,
  Users, Award, Recycle, CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Ui/card";
import { Button } from "@/components/Ui/button";
import { Badge } from "@/components/Ui/badge";

// Animation
const container = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Section: React.FC<{ id?: string; className?: string; children: React.ReactNode }> = ({ id, className, children }) => (
  <section id={id} className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className || ""}`}>
    {children}
  </section>
);

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <Section className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div initial="hidden" animate="show" variants={container}>
              <Badge className="mb-3 rounded-2xl px-3 py-1 text-sm">About Us</Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Fast, eco-friendly dry cleaning made for modern life
              </h1>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                We pick up, clean, and deliver with <span className="font-semibold text-foreground">care</span>.
                Since day one, our mission has been simple: spotless clothes, zero hassle.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-2xl">
                  <Link href="/book">Book an Order <ArrowRight className="ml-2 h-4 w-4"/></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-2xl">
                  <Link href="#values">Our values</Link>
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> Secure payments</div>
                <div className="flex items-center gap-2"><Timer className="h-4 w-4"/> Same-day pickup*</div>
                <div className="flex items-center gap-2"><Leaf className="h-4 w-4"/> Eco detergents</div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
              <Card className="rounded-2xl shadow-lg">
                <CardContent className="p-0">
                  <div className="grid grid-cols-3 gap-2 p-4 sm:gap-3">
                    <div className="h-28 rounded-xl bg-blue-100 sm:h-36"/>
                    <div className="h-28 rounded-xl bg-blue-200 sm:h-36"/>
                    <div className="h-28 rounded-xl bg-blue-300 sm:h-36"/>
                    <div className="h-28 rounded-xl bg-blue-300 sm:h-36"/>
                    <div className="h-28 rounded-xl bg-blue-100 sm:h-36"/>
                    <div className="h-28 rounded-xl bg-blue-200 sm:h-36"/>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Section>
      </div>

      {/* Stats */}
      <Section className="py-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            {label:"Orders completed", value:"24k+"},
            {label:"Avg. turnaround", value:"24h"},
            {label:"Customer rating", value:"4.9/5"},
            {label:"Pieces cleaned", value:"1.2M"},
          ].map((s)=> (
            <Card key={s.label} className="rounded-2xl">
              <CardContent className="p-5">
                <div className="text-2xl font-bold md:text-3xl">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section id="values" className="py-8">
        <div className="mb-6 flex items-center gap-2">
          <Sparkles className="h-5 w-5"/>
          <h2 className="text-2xl font-semibold sm:text-3xl">Our Values</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {icon: <Leaf className="h-5 w-5"/>, title:"Eco-friendly", desc:"Biodegradable detergents and water-saving tech."},
            {icon: <Timer className="h-5 w-5"/>, title:"On-time, every time", desc:"Smart routing for reliable pickups and delivery."},
            {icon: <ShieldCheck className="h-5 w-5"/>, title:"Safety first", desc:"Tight quality control and secure handling."},
            {icon: <Truck className="h-5 w-5"/>, title:"Door-to-door", desc:"Seamless pickup and delivery across the city."},
          ].map((v)=> (
            <Card key={v.title} className="rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  {v.icon}
                  <span>{v.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-muted-foreground">{v.desc}</CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Story */}
      <Section className="py-12">
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5"/> Our Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
              <p>
                We started as a two-person team obsessed with clean lines and cleaner clothes.
                Today, we blend skilled craftsmanship with tech to deliver a premium, convenient service.
              </p>
              <ul className="grid gap-2">
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4"/> 2019 — launched our first pickup route</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4"/> 2021 — added real-time order tracking</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4"/> 2024 — switched to greener solvents</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5"/> Why choose us</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-4 w-4"/> Multi-point garment inspection</div>
              <div className="flex items-start gap-3"><Timer className="mt-0.5 h-4 w-4"/> Express options available</div>
              <div className="flex items-start gap-3"><Recycle className="mt-0.5 h-4 w-4"/> Reusable packaging on request</div>
              <div className="flex items-start gap-3"><Sparkles className="mt-0.5 h-4 w-4"/> Gentle care for delicates</div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-10">
        <Card className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="flex flex-col items-start justify-between gap-4 p-8 md:flex-row md:items-center">
            <div>
              <h3 className="text-2xl font-semibold">Ready for crease-free days?</h3>
              <p className="mt-1 text-white/80">Book a pickup in under a minute.</p>
            </div>
            <Button asChild size="lg" variant="secondary" className="rounded-2xl">
              <Link href="/book">Start now</Link>
            </Button>
          </CardContent>
        </Card>
      </Section>
    </div>
  );
}
