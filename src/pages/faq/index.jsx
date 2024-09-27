import { Link } from "react-router-dom";
import LeftArrowIcon from "../../assets/arrow-left.png";
import FAQBanner from "../../assets/faq-banner.png";
import SearchIcon from "../../assets/search.png";
import ChevronDownIcon from "../../assets/chevron-down.png";
import { useState } from "react";

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question:
        "Are the products sold at this pet shop guaranteed to be of high quality?",
      answer:
        "All products we sell have undergone a strict curation process to ensure their quality. We partner with trusted brands and only sell products that are safe and of high quality for your pets.",
    },
    {
      question: "How long does it take for my order to be delivered?",
      answer:
        "Delivery times vary based on your location and the shipping method selected during checkout.",
    },
    {
      question: "Is there a return or exchange policy?",
      answer:
        "Yes, we offer a return or exchange policy within 30 days of purchase. Please refer to our policy for more details.",
    },
    {
      question: "How can I track my order?",
      answer:
        "You can track your order through the tracking link provided in the confirmation email.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept all major credit cards, PayPal, and other secure payment methods.",
    },
    {
      question:
        "Do you provide customer support for product-related inquiries?",
      answer:
        "Yes, our customer support team is available to assist you with any product-related inquiries.",
    },
  ];

  return (
    <div id="faq" className="flex flex-col gap-16 pt-40 px-20">
      <Link to="/" id="breadcrumb" className="flex gap-6 items-center">
        <img src={LeftArrowIcon} alt="left-arrow-icon" className="w-5 h-5" />
        <div className="flex gap-2 items-center">
          <span className="text-sm text-chinese-black opacity-50">Home</span>
          <span className="text-sm font-semibold text-chinese-black opacity-50">
            /
          </span>
          <span className="text-chinese-black text-sm opacity-50">
            Help & Support
          </span>
          <span className="text-sm font-semibold text-chinese-black">/</span>
          <span className="text-chinese-black text-sm">FAQ</span>
        </div>
      </Link>

      <div className="w-full flex flex-col gap-[100px] items-center">
        <div className="w-full relative">
          <img src={FAQBanner} alt="faq-banner" className="w-full" />
          <h1 className="absolute mt-10 right-20 bottom-44 font-semibold text-[64px] text-center w-[650px]">
            Frequently Asked Questions{" "}
          </h1>
        </div>
        <div className="w-[600px] border border-gainsboro rounded-xl flex justify-between items-center">
          <input
            type="text"
            placeholder="Search topic"
            className="p-6 w-3/4 h-16 outline-none"
          />
          <button className="flex justify-center items-center w-16 bg-gainsboro h-full p-5 rounded-r-xl">
            <img src={SearchIcon} alt="search-icon" className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="w-[1322px] mx-auto my-8 p-16 bg-white rounded-md shadow-md">
        {faqData.map((item, index) => (
          <div key={index} className="mb-4 border-b">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left py-3 flex justify-between items-center focus:outline-none"
            >
              <span className="text-base font-medium">{item.question}</span>
              <img
                src={ChevronDownIcon}
                alt="chevron"
                className={`${activeIndex == index && "rotate-180"}`}
              />
            </button>
            {activeIndex === index && (
              <div className="py-2 text-gray-600 text-sm">{item.answer}</div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center gap-7">
        <h1 className="font-medium text-[40px]">Need More Help?</h1>
        <span className="text-sm">Please contact our Customer Service </span>
        <button className="w-[185px] border font-medium text-sm p-4 rounded-md ease-in-out duration-500 bg-spiro-disco-ball text-white hover:text-spiro-disco-ball hover:bg-white hover:border-spiro-disco-ball">
          Contact Us
        </button>
      </div>
    </div>
  );
}
