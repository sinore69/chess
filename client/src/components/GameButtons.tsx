import React from 'react';
import { RotateCcw, Flag, ThumbsUp } from 'lucide-react';

function GameButtons(props: {
  confirmResignation: boolean
}) {
  return (
    <div className='flex flex-row gap-x-2'>
      <button
        // onClick={onResign}
        className="flex items-center px-2 py-2 md:px-4 md:py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
      >
        <Flag size={16} className="" />
      </button>
      <button
        // onClick={onOfferDraw}
        className="flex items-center px-2 py-2 md:px-4 md:py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors"
      >
        <ThumbsUp size={16} className="" />
      </button>
      <button
        // onClick={onNewGame}
        className="flex items-center px-2 py-2 md:px-4 md:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
      >
        <RotateCcw size={16} className="" />
      </button>
    </div>
  );
};

export default GameButtons;