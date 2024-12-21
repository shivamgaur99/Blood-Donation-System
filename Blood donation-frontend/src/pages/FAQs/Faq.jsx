import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Faq.css"; 

const Faq = (props) => {
  let dark = props.theme;

  const faqData = [
    {
      question: "Who can donate blood?",
      answer:
        "Anyone in good health, aged between 18 and 65 years, weighing at least 50 kg, and not suffering from any major health conditions can donate blood.",
    },
    {
      question: "How often can I donate blood?",
      answer:
        "You can donate whole blood every 56 days, while platelet donations can be made every 7 days, up to 24 times a year.",
    },
    {
      question: "Is blood donation safe?",
      answer:
        "Yes, blood donation is a safe process. All equipment used is sterilized, and the procedure is supervised by trained medical professionals.",
    },
    {
      question: "What should I do before donating blood?",
      answer:
        "Make sure to eat a healthy meal, drink plenty of water, and avoid any alcoholic beverages before donating blood.",
    },
    {
      question: "What happens after I donate blood?",
      answer:
        "After donation, you’ll be asked to rest and have some refreshments to ensure you're feeling fine before you leave. The donated blood is then processed and distributed to those in need.",
    },
  ];

  return (
    <div className={`faq-container ${dark ? "dark-theme" : "light-theme"}`}>
    <div className="faq-image-container">
        <img
          src="/images/faq-medium.png" 
          alt="Faq"
          className="faq-image"
        />
      </div>
      <div className={`faq ${dark ? "dark-theme" : "light-theme"}`}>
        <Typography
          variant="h4"
          className="faq-title"
          sx={{ marginBottom: "20px" }}
        >
          Frequently Asked Questions
        </Typography>
        {faqData.map((faq, index) => (
          <Accordion key={index} className="faq-accordion">
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon sx={{ color: "white" }} className="faq-icon" />
              }
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              className="faq-summary"
            >
              <Typography className="faq-question">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="faq-answer">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Faq;
