import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="py-8 md:py-12 lg:py-16">
        <div className="container">
          <SectionTitle
            title="Services"
            paragraph="At True Frame Software, we deliver tailored, innovative IT solutions that empower businesses to grow, streamline operations, and stay ahead in the digital era. We offer a full spectrum of software services designed to meet global standards and local needs."
            center
          />

          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
