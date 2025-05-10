import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page | TrueFrame for SaaS and Business",
  description: "This is About Page for TrueFrame Nextjs Template",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Page"
        description="Empowering organizations with advanced software development and IT expertise."/>
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
