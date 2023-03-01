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

const getFileString = (file: number): string => {
  return files[file - 1]
}

const getFileNumber = (file: string): number => {
  return files.indexOf(file) + 1
}

export const pieceToSymbol = (piece: Piece | null): string | undefined => {
  return piece?.color === 'w' ? piece?.type.toUpperCase() : piece?.type
}


const isPiece = (e: HTMLElement): boolean => {
  return e.classList.contains('piece')
}

// TODO: decide what functions to put inside component
const Chessboard = () => {

  const [fromSquare, setFromSquare] = useState("")


  const centerOfSquare = (square: string): number[] => {
    const file = square[0]
    const rank = parseInt(square[1])
    const chessboard = chessRef.current!
    const centerX = getFileNumber(file) * SQUARE_SIZE
    const centerY = rank * SQUARE_SIZE
    const minX = chessboard.offsetLeft - OFFSET
    const maxY = chessboard.offsetTop + chessboard.clientHeight + OFFSET
    return [minX + centerX, maxY - centerY]
  }

  const returnGrabbedElement = (): void => {
    if (grabbedElement === null) return;
    let center = centerOfSquare(fromSquare)
    moveAndResetGrabbedElement(grabbedElement, center[0], center[1])
  }

  window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    returnGrabbedElement();
  });

  const makeMove = (toSquare: string): void => {
    if (grabbedElement === null) return; // TODO: check if check is necessary?
    const move = getMoveNotation(toSquare)
    let center = []
    if (move) {
      console.log("Made move: " + chess.move(move)?.san)
      center = centerOfSquare(toSquare)
    } else {
      center = centerOfSquare(fromSquare)
    }
    moveAndResetGrabbedElement(grabbedElement, center[0], center[1])
  }


  const squareOnCursor = (x: number, y: number): string => {
    const chessboard = chessRef.current!
    const file = Math.floor((x - chessboard.offsetLeft) / SQUARE_SIZE) + 1
    const rank = Math.abs(Math.ceil((y - chessboard.offsetTop - GRID_SIZE) / SQUARE_SIZE)) + 1
    return getFileString(file) + rank.toString()
  }

  const pieceOnCursor = (x: number, y: number): Piece | null => {
    return chess.get(squareOnCursor(x, y))
  }

  const getMoveNotation = (square: string): string => {
    let move = ""
    const legalMovesFromSquare = chess.moves({ square: fromSquare })
    legalMovesFromSquare.forEach(m => {
      if (m.substring(m.length - 2) === square)
        move = m
    })
    return move
  }

  const mouseDown = (e: React.MouseEvent): void => {
    const element = e.target as HTMLElement
    if (isPiece(element) && !grabbedElement) {
      grabbedElement = element
      setFromSquare(squareOnCursor(e.clientX, e.clientY))
    } else {
      makeMove(squareOnCursor(e.clientX, e.clientY))
    }
  }

  const movePiece = (e: React.MouseEvent): void => {
    if (grabbedElement) {
      moveElement(grabbedElement, e.clientX, e.clientY)
    }
  }


  const dropPiece = (e: React.MouseEvent): void => {
    const maybePiece: Piece | null = pieceOnCursor(e.clientX, e.clientY)
    const toSquare = squareOnCursor(e.clientX, e.clientY)
    console.log(maybePiece)
    if (toSquare === fromSquare) return;
    makeMove(toSquare)
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

  const moveAndResetGrabbedElement = (e: HTMLElement, cursorX: number, cursorY: number): void => {
    moveElement(e, cursorX, cursorY);
    grabbedElement = null
  }

  const [chess, setChess] = useState(new Chess())
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
    <div onMouseDown={e => mouseDown(e)}
      onMouseMove={e => movePiece(e)}
      onMouseUp={e => dropPiece(e)}
      className="chessboard"
      ref={chessRef}>
      {board}
    </div>
  )
}

export default Chessboard
