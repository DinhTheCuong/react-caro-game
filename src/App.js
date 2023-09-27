import React, { useState } from 'react';
import Board from '../src/components/board';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const navigate = useNavigate();

  const handleClick = (i) => {
    if (checkWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setSquares(squares);
    setXIsNext(!xIsNext);
  };

  const winner = checkWinner(squares);

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className='flex flex-col justify-center items-center bg-[#282c34] w-full h-[100vh]'>
      <p
        style={{
          fontSize: 80,
          fontWeight: 'bold',
          background: '-webkit-linear-gradient(#12c2e9, #c471ed, #f64f59)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 40,
        }}
      >
        Caro Game
      </p>
      <Board
        squares={squares}
        onClick={(i) => handleClick(i)}
      />
      <div className='game-info mt-10'>
        {String(status).includes('Winner') ? (
          <div className='font-bold text-[32px] text-yellow-400'>{status}</div>
        ) : (
          <div className='font-bold text-[32px] text-orange-400'>{status}</div>
        )}
      </div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold text-[28px] py-2 px-4 rounded-lg mt-8'
        onClick={() => navigate(0)}
      >
        Reset
      </button>
    </div>
  );
}

function checkWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
