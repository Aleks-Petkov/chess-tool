import './Chessboard.css'
import { useRef, useState } from 'react'
import Square from '../Square/Square'
import { Chess, Piece } from 'chess.ts'

const ranks = ['1', '2', '3', '4', '5', '6', '7', '8']
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const imagePixelOffset = 50
let activePiece: HTMLElement | null = null

const Chessboard = () => {

  const grabPiece = (e: React.MouseEvent): void => {
    const element = e.target as HTMLElement
    if (element.classList.contains('piece')) {
      moveElement(element, e)
      activePiece = element
    }
  }

  const movePiece = (e: React.MouseEvent): void => {
    if (activePiece) {
      moveElement(activePiece, e)
    }
  }

  const dropPiece = (e: React.MouseEvent): void => {
    console.log(e)
    activePiece = null;
  }

  const moveElement = (e: HTMLElement, event: React.MouseEvent): void => {
    const chessboard = chessRef.current!
    const minX = chessboard.offsetLeft - imagePixelOffset
    const minY = chessboard.offsetTop - imagePixelOffset
    const maxX = chessboard.offsetLeft + chessboard.clientWidth - imagePixelOffset
    const maxY = chessboard.offsetTop + chessboard.clientHeight - imagePixelOffset
    const x = event.clientX - imagePixelOffset
    const y = event.clientY - imagePixelOffset

    e.style.position = 'absolute'
    e.style.left = x < minX ? `${minX}px` : x > maxX ? `${maxX}px` : `${x}px`
    e.style.top = y < minY ? `${minY}px` : y > maxY ? `${maxY}py` : `${y}px`
  }


  const [chess, setChess] = useState(new Chess())
  let chessRef = useRef<HTMLDivElement>(null)
  let board = []
  let isWhite = true
  for (const rank of ranks.reverse()) {
    for (const file of files) {
      const piece: Piece | null = chess.get(file + rank)
      board.push(<Square key={`${file}${rank}`} piece={piece} squareColor={isWhite} />)
      isWhite = !isWhite
    }
    isWhite = !isWhite
  }
  return (
    <div onMouseDown={e => grabPiece(e)}
      onMouseMove={e => movePiece(e)}
      onMouseUp={e => dropPiece(e)}
      className="chessboard"
      ref={chessRef}>
      {board}
    </div>
  )
}

export default Chessboard
