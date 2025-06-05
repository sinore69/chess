import { X } from "lucide-react";
import React, { useState } from "react";

function GameOverPopUp(props: {
  loserColor: string;
  color: string;
  reason: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  function onClose() {
    setIsOpen(false);
  }

  if (!isOpen) return null;

  return (
    <div
      className={`absolute inset-0 z-50 flex items-center justify-center
        bg-black bg-opacity-50 backdrop-blur-sm
        transition-opacity duration-200 ease-out
        ${isOpen ? "opacity-100" : "opacity-0"}
      `}
      onClick={onClose} // close when clicking outside
    >
      <div
        className={`flex flex-col justify-center
          bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl
          transform transition-transform duration-200 ease-out
          ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
        onClick={(e) => e.stopPropagation()} // don't close when clicking inside
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">
            {props.color === props.loserColor ? "You Lost" : "You Won"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="text-gray-200">{props.reason}</div>
      </div>
    </div>
  );
}

export default GameOverPopUp;
