import React, { useState } from "react";
import { files } from "./Files";

import "./Review.css";

const Review = () => {
  const reviews = [
    {
      id: 1,
      name: "John Doe1",
      comment:
        "These eggs are delicious and fresh!The best eggs I hresh!The best eggs I have ever tasted!",
      rating: 5,
      image: files.shraddha,
    },
    {
      id: 2,
      name: "Jane Smith2",
      comment:
        "The best eggs I have ever tasted!The best eggs I have ever tasted!",
      rating: 4.5,
      image: files.ana,
    },
    {
      id: 7,
      name: "Jane Smith3",
      comment:
        "The best eggs I have ever tasted!The best eggs I have ever tasted!",
      rating: 4,
      image: files.isha,
    },
    {
      id: 3,
      name: "Jake Johnson4",
      comment: "Highly recommended eggs!",
      rating: 5,
      image: files.alia,
    },
    {
      id: 4,
      name: "Alexdra Williams5",
      comment: "These eggs are excellent!",
      rating: 4,
      image: files.shraddha,
    },

    {
      id:5,
      name: "labanya",
      comment: "These eggs are excellent!",
      rating: 4,
      image: files.shraddha,
    },{
      id: 6,
      name: "shreya",
      comment: "These eggs are excellent6!",
      rating: 4,
      image: files.shraddha,
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
