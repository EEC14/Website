import React from 'react';

interface LinkButtonProps {
  link: string;
  text: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ link, text }) => {
  const handleClick = () => {
    window.open(link, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-md"
    >
      {text}
    </button>
  );
};

export const BetaTesting = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl text-center mb-12">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Download the beta</h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Get the app and start your health journey today.
        </p>
      </div>
      <div className="flex gap-6">
        <LinkButton 
          link="https://play.google.com/store/apps/details?id=com.healthchatdev.HealthChat" 
          text="Android"
        />
        <LinkButton 
          link="https://testflight.apple.com/join/G7CpHTH2" 
          text="iOS"
        />
      </div>
    </div>
  );
};

export default BetaTesting;