import React from 'react';

const Square = ({ onClick, value }) => {
  return (
    <button
      className='square'
      onClick={onClick}
    >
      {(value === 'X' && <p className='text-red-500'>{value}</p>) ||
        (value === 'O' && <p className='text-green-500'>{value}</p>)}
    </button>
  );
};

export default Square;
