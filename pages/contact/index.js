import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
import ContactMap from "@/components/pages/contact/ContactMap";
import ContactUs from "@/components/pages/home/ContactUs";

export default function ContactPage() {
  return (
    <MainLayout>
      <ContactMap />
      <ContactUs noBackground={true} />
    </MainLayout>
  );
}
