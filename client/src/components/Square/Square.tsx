import './Square.css'
import { Piece } from 'chess.ts'
import { pieceToSymbol } from '../Chessboard/Chessboard';

interface Props {
    piece: Piece | null;
    squareColor: boolean;
}

const Square = ({ piece, squareColor }: Props) => {
    const image = `assets/images/${pieceToSymbol(piece)}.png`
    return (
        <div className={(squareColor ? 'white' : 'black') + ' square'}>
            {piece !== null && <div style={{ backgroundImage: `url(${image})` }} className='piece' />}
        </div>
    )

}

export default Square
