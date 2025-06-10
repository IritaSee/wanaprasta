import React from 'react';

const WhatIsWanaprastha = () => {
  return (
    <div className="article-container py-12 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">What is Wanaprastha Tourism?</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-gray-700 mb-4">
          Wanaprastha Tourism is a sustainable travel concept rooted in ancient Indian philosophy, 
          emphasizing harmony between humans and nature. The term "Wanaprastha" originates from the 
          Vedic ashrama system, representing the third stage of life focused on spiritual growth and 
          environmental stewardship.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Core Principles</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li className="text-gray-700">Sustainable living practices</li>
          <li className="text-gray-700">Minimal environmental impact</li>
          <li className="text-gray-700">Cultural preservation</li>
          <li className="text-gray-700">Community engagement</li>
          <li className="text-gray-700">Spiritual connection with nature</li>
        </ul>
        <p className="text-lg text-gray-700">
          This form of tourism goes beyond typical eco-tourism by integrating traditional knowledge 
          systems with modern sustainable practices, creating a holistic travel experience that benefits 
          both visitors and host communities.
        </p>
      </div>
    </div>
  );
};

export default WhatIsWanaprastha;
