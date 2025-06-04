import React from 'react'

function Header() {
    return (
        <div className='w-full animate-fadeInUp'>
            <h1 className="text-4xl md:text-5xl font-bold text-white flex justify-center">
                <span className="text-blue-400">Chess</span>Master
            </h1>
            <p className="text-gray-300 flex justify-center mb-1 text-center">
                Play chess online with friends or challenge our AI bot. Enhance your skills and enjoy the game of kings.
            </p>
        </div>
    )
}

export default Header