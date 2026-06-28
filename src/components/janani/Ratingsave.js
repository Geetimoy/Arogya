import React, { useState, useEffect } from 'react';

const StarRating = ({ sendDataToParent, ratingValue = 0 }) => {
  const [rating, setRating] = useState(0);

  // Update rating whenever parent sends new value
  useEffect(() => {
    setRating(Number(ratingValue || 0));
  }, [ratingValue]);

  const handleStarClick = (selectedRating) => {

    // Toggle half rating
    const newRating =
      selectedRating === rating
        ? selectedRating - 0.5
        : selectedRating;

    setRating(newRating);

    sendDataToParent(newRating);
  };

  const renderStars = () => {

    const stars = [];

    for (let i = 1; i <= 5; i++) {

      const isFull = i <= rating;
      const isHalf = i - 0.5 === rating;

      stars.push(
        <span
          key={i}
          className={`star ${isFull ? 'full' : ''} ${isHalf ? 'half' : ''}`}
          onClick={() => handleStarClick(i)}
          style={{
            cursor: 'pointer',
            fontSize: '24px'
          }}
        >
          {isFull ? '★' : isHalf ? '½' : '☆'}
        </span>
      );
    }

    return stars;
  };

  return (
    <div>
      {renderStars()}
      <span className='star-count'> {rating}</span>
    </div>
  );
};

export default StarRating;