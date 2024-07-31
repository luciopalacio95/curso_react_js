import { useState } from 'react'
import { Square } from './components/Square'
import { TURNS } from './Constants'
import { checkEndGame, checkWinnerFrom } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { confettiEffect } from './components/effects/Confetti'
import { fireworkEffect } from './components/effects/Firework'

function App () {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
    // en la comparativa usamos || esto para ver su es false, y ?? para ver si es null o undefined
  })
  // null no hay ganador y false es empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {
    // no actualizamos si ya tiene algo
    if (board[index] || winner) return
    // actualizar tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // guardar la partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confettiEffect()
      fireworkEffect()
      setWinner(newWinner) // actualizar un estado es asyncrono
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }

  return (
    <main className='board'>
      <h1>¡TA –TE – TI!</h1>
      <button onClick={resetGame}>Reset juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
