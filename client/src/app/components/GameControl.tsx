import React from 'react'

function GameControl() {
  return (
    <div className=''>
        <div className='pt-2 lg:h-[720px] lg:w-[460px] bg-red-200 flex justify-center flex-col'>
            <div>play against</div>
            <button>bot|friend</button>
            <div>time control</div>
            <div>3|5|10</div>
            <button>start</button>
        </div>
    </div>
  )
}

export default GameControl