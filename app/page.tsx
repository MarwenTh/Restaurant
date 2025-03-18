"use client";
import Benefits from "@/components/landing-page/benefits/Benefits";
import Container from "@/components/landing-page/Container";
import CTA from "@/components/landing-page/CTA";
import FAQ from "@/components/landing-page/FAQ";
import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import Hero from "@/components/landing-page/Hero";
import Logos from "@/components/landing-page/Logos";
import Section from "@/components/landing-page/Section";
import Stats from "@/components/landing-page/Stats";
import Testimonials from "@/components/landing-page/Testimonials";
import { ThemeColorToggle } from "@/components/theme-color-toggle";
import ThemeModeToggle from "@/components/theme-mode-toggle";
import Image from "next/image";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <Header />
      <Hero />
      {/* <Logos /> */}
      {/* <Container>
        <Benefits />

        {/* <Section
          id="pricing"
          title="Pricing"
          description="Simple, transparent pricing. No surprises."
        >
          <Pricing />
        </Section> 

        <Section
          id="testimonials"
          title="What Our Clients Say"
          description="Hear from those who have partnered with us."
        >
          <Testimonials />
        </Section>

        <FAQ />

        <Stats />

        <CTA />

        <Footer />
      </Container> */}
    </>
  );
};

export default page;
