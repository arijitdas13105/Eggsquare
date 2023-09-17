import React, { useState } from "react";
import { files } from "./Files";

import "./Review.css";

const Review = () => {
  const reviews = [
    {
      id: 1,
      name: "Arjun Singh",
      comment:
        "Egg Square exceeds expectations with premium eggs and hassle-free delivery. Exceptional quality and service every time!",
      rating: 5,
      image: files.arjun,
    },
    {
      id: 2,
      name: "labanya",
      comment:
        "I can't get enough of Egg Square's eggs! Their delivery service is punctual, making it a delightful experience",
      rating: 4.5,
      image: files.ana,
    },
    {
      id: 7,
      name: "Vikas Chauhan",
      comment:
        "I'm blown away by Egg Square's egg quality and delivery efficiency. A truly delightful experience every time.",
      rating: 4,
      image: files.vikash,
    },
    {
      id: 3,
      name: "Deepak Tomar",
      comment: "Outstanding experience with Egg Square! Eggs are consistently fresh, and their delivery service is efficient and convenient",
      rating: 5,
      image: files.deepak,
    },
    {
      id: 4,
      name: "Kavita Dubey",
      comment: "Egg Square sets the bar high for egg quality and delivery. I'm a loyal customer, thanks to their exceptional service",
      rating: 4,
      image: files.kavita,
    },

    {
      id:5,
      name: "Vikram Verma",
      comment: "I've never had such consistently excellent eggs! Egg Square's delivery is fast and reliable. Highly recommended!",
      rating: 4,
      image: files.vikram,
    },{
      id: 6,
      name: "Nidhi Jain",
      comment: "Egg Square's eggs are unbeatable in quality, and their delivery is seamless. They've won my trust and my taste buds",
      rating: 4,
      image: files.nidhi,
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const cardsToShow = window.innerWidth <= 768 ? 1 : 3;
  const handleNext = () => {
    if (startIndex + cardsToShow < reviews.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    // <div className='review-container'>
    //    <div className='review-comment'>

    //     {
    //         reviews.map((review)=>(
    //             <span> {review.comment} </span>
    //         ))
    //     }
    //     </div>
    //    <div className='review-profile'>
    //     <div className='review-photo' >
    //         <img/>

    //     </div>
    //     <span className='Name' ></span>
    //     </div>

    // </div>
    <>
      <div className="review-container">
        <div className="Testimonial">
          <div className="Testimonial-h">
            <h1>Testimonials</h1>
            <span>Hear from our extraordinary customers</span>
          </div>

          {/* //conditional arrow */}

          {/* <div className="arrow-container">
            {startIndex > 0 && (
              <button className="arrow-button" onClick={handlePrev}>
                &lt;
              </button>
            )}

            {startIndex + 3 < reviews.length && (
              <button className="arrow-button" onClick={handleNext}>
                &gt;
              </button>
            )}
          </div> */}

          <div className="arrow-container">
            <button className="arrow-button" onClick={handlePrev}>
              &lt;
            </button>

            <button className="arrow-button" onClick={handleNext}>
              &gt;
            </button>
          </div>
        </div>

        {/* //The part of the code that decides which reviews to show  reviews.slice() */}

        {reviews.slice(startIndex, startIndex + cardsToShow).map((review) => (
            
        
            <div className="review-holder" key={review.id}>
            <div className="review-comment">
              <span> {review.comment} </span>
            </div>
            <div className="review-profile">
              <div className="review-photo">
                <img src={review.image} />
              </div>
              <div className="Name">
                <span>{review.name}</span>
                {/* <span>{review.rating} </span> */}

                <div className="review-rating">
                  {Array.from({ length: review.rating }, (_, index) => (
                    <span key={index}>&#9733;</span> // Unicode character for star symbol
                  ))}

                 
                </div>
              </div>
            </div>
          </div>
          
          
        ))}
      </div>
    </>
  );
};

export default Review;
