import './Chessboard.css'
import { useRef, useState } from 'react'
import Square from '../Square/Square'
import { Chess, Piece } from 'chess.ts'

const ranks = ['1', '2', '3', '4', '5', '6', '7', '8']
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const OFFSET = 50
const GRID_SIZE = 800;
const SQUARE_SIZE = 100;
let grabbedElement: HTMLElement | null = null
let grabbedPiece: Piece | null = null

const fileNumberToString = (file: number): string => {
  return files[file - 1]
}

export const pieceToSymbol = (piece: Piece | null): string | undefined => {
  return piece?.color === 'w' ? piece.type.toUpperCase() : piece?.type
}


const isPiece = (e: HTMLElement): boolean => {
  return e.classList.contains('piece')
}

const Chessboard = () => {

  const squareOnCursor = (x: number, y: number): string => {
    const chessboard = chessRef.current!
    const file = Math.floor((x - chessboard.offsetLeft) / SQUARE_SIZE) + 1
    const rank = Math.abs(Math.ceil((y - chessboard.offsetTop - GRID_SIZE) / SQUARE_SIZE)) + 1
    return fileNumberToString(file) + rank.toString()
  }

  const pieceOnCursor = (x: number, y: number): Piece | null => {
    return chess.get(squareOnCursor(x, y))
  }

  const grabPiece = (e: React.MouseEvent): void => {
    const element = e.target as HTMLElement
    if (isPiece(element)) {
      moveElement(element, e.clientX, e.clientY)
      grabbedElement = element
      grabbedPiece = pieceOnCursor(e.clientX, e.clientY)
    }
  }

  const movePiece = (e: React.MouseEvent): void => {
    if (grabbedElement) {
      moveElement(grabbedElement, e.clientX, e.clientY)
    }
  }

  const dropPiece = (e: React.MouseEvent): void => {
    const maybePiece: Piece | null = pieceOnCursor(e.clientX, e.clientY)
    console.log(maybePiece)
    const chessboard = chessRef.current!
    if (maybePiece === null && grabbedElement !== null) {
      const square = squareOnCursor(e.clientX, e.clientY);
      let move = pieceToSymbol(grabbedPiece) + square; //grabbedPiece never null
      move = move[0].toLowerCase() === "p" ? move.substring(1) : move;
      console.log(move)
      const b = chess.move(move)
      console.log(b)
      grabbedElement = null
    }
  }

  const moveElement = (e: HTMLElement, cursorX: number, cursorY: number): void => {
    const chessboard = chessRef.current!
    const minX = chessboard.offsetLeft - OFFSET
    const minY = chessboard.offsetTop - OFFSET
    const maxX = chessboard.offsetLeft + chessboard.clientWidth - OFFSET
    const maxY = chessboard.offsetTop + chessboard.clientHeight - OFFSET
    const x = cursorX - OFFSET
    const y = cursorY - OFFSET

    e.style.position = 'absolute'
    e.style.left = x < minX ? `${minX}px` : x > maxX ? `${maxX}px` : `${x}px`
    e.style.top = y < minY ? `${minY}px` : y > maxY ? `${maxY}py` : `${y}px`
  }


  const [chess, setChess] = useState(new Chess())
  //const [pieces, setPieces] = useState<Piece[]>()
  let chessRef = useRef<HTMLDivElement>(null)
  let startingBoard = []
  let isWhite = true
  for (const rank of ranks.reverse()) {
    for (const file of files) {
      const piece: Piece | null = chess.get(file + rank)
      startingBoard.push(<Square key={`${file}${rank}`} piece={piece} squareColor={isWhite} />)
      isWhite = !isWhite
    }
    isWhite = !isWhite
  }
  const [board, setBoard] = useState(startingBoard)
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
