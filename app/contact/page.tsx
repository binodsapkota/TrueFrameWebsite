import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | TrueFrame for SaaS and Business",
  description: "This is Contact Page for TrueFrame Nextjs Template",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Page"
        description="Contact us for any questions or inquiries. Our dedicated support team is here to help you with technical issues, product information, or business inquiries. We aim to respond within 24 hours."/>

      <Contact />
    </>
  );
};

export default ContactPage;
