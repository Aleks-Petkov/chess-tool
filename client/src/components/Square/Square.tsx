import './Square.css'
import { Piece } from 'chess.ts'

interface Props {
    piece: Piece | null;
    squareColor: boolean;
}

const Square = ({ piece, squareColor }: Props) => {
    const p = piece?.color === 'w' ? piece.type.toUpperCase() : piece?.type
    const image = `assets/images/${p}.png`
    return (
        <div className={(squareColor ? 'white' : 'black') + ' square'}>
            {piece !== null && <div style={{ backgroundImage: `url(${image})` }} className='piece' />}
        </div>
    )

}

export default Square
