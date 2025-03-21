import React, { useState, useEffect } from 'react';

const StarRating = ({ sendDataToParent }) => {
  const [rating, setRating] = useState(0);
  const [savedRating, setSavedRating] = useState(0); // Track the saved rating separately

  // Load the saved rating from localStorage when the component mounts
  useEffect(() => {
    const savedValue = localStorage.getItem('userRating');
    if (savedValue) {
      const parsedValue = parseFloat(savedValue);
      setRating(parsedValue);
      setSavedRating(parsedValue); // Also set the saved rating
    }
  }, []);

  const handleStarClick = (selectedRating) => {
    // If the selected rating is equal to the current rating, toggle between half and full stars
    const newRating = selectedRating === rating ? selectedRating - 0.5 : selectedRating;
    setRating(newRating);
    sendDataToParent(newRating);
  };

  const handleSaveRating = () => {
    localStorage.setItem('userRating', rating);
    setSavedRating(rating); // Update the saved rating state
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