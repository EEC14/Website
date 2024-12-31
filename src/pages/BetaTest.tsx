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
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
    >
      {text}
    </button>
  );
};

export const BetaTesting = () => {
  return (
    <div className="flex justify-center items-center h-screen">
        <div>
            <h1 className="text-3xl font-bold mb-4">Download the beta</h1>
            <p className="text-gray-600 mb-4">
            Get the app and start your health journey today.
            </p>
        </div>    
      <div>
        <LinkButton 
          link="https://www.example.com" 
          text="Android"
        />
        <LinkButton 
          link="https://www.google.com" 
          text="IOS"
        />
      </div>
    </div>
  );
};

export default BetaTesting;