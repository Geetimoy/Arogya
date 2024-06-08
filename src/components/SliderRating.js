import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SliderRating = ({ initialRating, onChange }) => {
  const [value, setValue] = useState(initialRating);

  useEffect(() => {
    setValue(initialRating);
  }, [initialRating]);

  const handleSliderChange = (newValue) => {
    setValue(newValue);
    onChange && onChange(newValue);
  };
  
  return (
    <div style={{ margin: '0 10px' }}>
      
      <div className='text-body-secondary rating-value d-flex justify-content-between'>Rating: { value }</div>
      <Slider
        min={0}
        max={10}
        step={5}
        value={value}
        onChange={handleSliderChange}
      />
      <div className='d-flex justify-content-between rating-caption'>
        <div className='text-center'><span className='d-block'>0</span>Know very little</div>
        <div className='text-center'><span className='d-block'>5</span>Moderate knowledge</div>
        <div className='text-center'><span className='d-block'>10</span>Knowledgeable</div>
      </div>
      
    </div>
  );
};

export default SliderRating;