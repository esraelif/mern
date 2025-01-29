import React from 'react';

const Button = ({ name, onClick }) => {
    return (
        <button onClick={onClick} className='w-[200px] h-10 flex items-center justify-center text-lg bg-black text-white rounded-md'>
            {name}
        </button>
    );
}

export default Button;
