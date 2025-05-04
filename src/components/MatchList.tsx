import React from "react";

export const MatchList: React.FC = () => {
  return (
    <div className="bg-idl-gray rounded-lg shadow-md overflow-hidden">
      <div className="p-8 text-center">
        <a
          href="https://steamcommunity.com/id/bl1nkz/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-idl-light hover:text-idl-accent transition-colors"
        >
          Click here and leave a nice comment
        </a>
      </div>
    </div>
  );
};
