import React from 'react';

export default function MoveList() {
  const chessMoves = [
    { white: 'e4', black: 'e5' },
    { white: 'Nf3', black: 'Nc6' },
    { white: 'Bc4', black: 'Bc5' },
    { white: 'O-O', black: 'Nf6' },
    { white: 'd4', black: 'exd4' },
    { white: 'c3', black: 'dxc3' },
    { white: 'Nxc3', black: 'd6' },
    { white: 'Bg5', black: 'h6' },
    { white: 'Bh4', black: 'g5' },
    { white: 'Nxg5', black: 'hxg5' },
    { white: 'Bxg5', black: 'Rg8' },
    { white: 'f4', black: 'Qd7' },
    { white: 'Qd2', black: 'Nh7' },
    { white: 'Bh4', black: 'Qh3' },
    { white: 'Qf2', black: 'Rxg2+' },
    { white: 'Qxg2', black: 'Qxg2+' },
    { white: 'Kxg2', black: 'Be6' },
    { white: 'Nd2', black: 'Kd7' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-inter">
      <div className="w-[350px] max-w-sm h-[600px] bg-blue-800 rounded-lg shadow-xl overflow-hidden flex flex-col">
        <div className="p-4 bg-blue-900 text-white text-center text-xl font-semibold rounded-t-lg">
          Chess Move List
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-2">
          {chessMoves.map((move, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-700 rounded-md p-2 text-white text-lg font-medium shadow-sm"
            >
              <span className="w-1/6 text-center text-blue-200">{index + 1}.</span>
              <div className="w-1/2 text-left pl-2">
                {move.white}
              </div>
              <div className="w-1/2 text-left pl-2">
                {move.black || '-'} 
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-blue-900 text-white text-center text-sm rounded-b-lg">
          End of Moves
        </div>
      </div>
    </div>
  );
}
