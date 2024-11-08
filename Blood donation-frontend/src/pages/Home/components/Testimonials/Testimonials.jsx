import React from "react";
// import Slider from "react-slick"; // Import Slider from react-slick
import './testimonials.css'; // Make sure to add necessary styles

const Testimonials = () => {
  

  return (
     <section className="testimonials">
     <h2>Donor Stories</h2>
     <div className="testimonial-list">
       <div className="testimonial">
         <p>
           "Donating blood was one of the most rewarding experiences of my
           life. Knowing I could help save lives is an incredible feeling."
         </p>
         <h4>- Sarah M.</h4>
       </div>
       <div className="testimonial">
         <p>
           "After receiving a transfusion myself, I now donate regularly.
           It's my way of giving back and helping others in need."
         </p>
         <h4>- James L.</h4>
       </div>
       <div className="testimonial">
         <p>
           "I donate because I know my blood can help someone in their most
           desperate moment. It's a simple act that can have such a huge
           impact."
         </p>
         <h4>- Emily T.</h4>
       </div>
       <div className="testimonial">
         <p>
           "As a frequent donor, I’ve met so many incredible people who are
           united by one goal: saving lives. It’s truly a community effort."
         </p>
         <h4>- Michael R.</h4>
       </div>
       <div className="testimonial">
         <p>
           "Blood donation is something I’m passionate about. It’s a small
           contribution on my part, but I know it makes a world of difference
           for those in need."
         </p>
         <h4>- Linda S.</h4>
       </div>
       <div className="testimonial">
         <p>
           "I’ve been donating blood for years. It’s an easy and fulfilling
           way to help people who need it the most. I encourage everyone to
           give it a try."
         </p>
         <h4>- Daniel H.</h4>
       </div>
     </div>
   </section>
  );
};

export default Testimonials;
