import React from 'react';

import apple from '../assets/images/apple.svg';
import airbnb from '../assets/images/airbnb.svg';
import disney from '../assets/images/disney.svg';
import meta from '../assets/images/facebook.svg';
import quora from '../assets/images/quora.svg';
import samsung from '../assets/images/samsung.svg';
import sas from '../assets/images/sas.svg';
import spark from '../assets/images/spark.svg';

const logos = [apple, airbnb, disney, meta, quora, samsung, sas, spark, apple, airbnb, disney, meta, quora,];


const Carousel = () => {
  return (
    
    <div className="w-full overflow-hidden mt-12 bg-black">
        <h2 className="text-center text-4xl font-bold text-gray-200 mb-4 ">Employment Partners</h2>
      <div className="flex animate-scroll gap-8">
        {/* Duplicate logos to fill more than the viewport width */}
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="flex-shrink-0 w-24 h-24">
            <img src={logo} alt={`Logo ${index}`} className="w-full h-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
