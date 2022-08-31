import { Request, Response  } from 'express'
import 'express-async-errors' // Throws exception on async errors instead of try/catch
import Opening from '../models/opening.model'

const getOpenings = async (req: Request, res: Response): Promise<void> => {
    const openings = await Opening.find()
    res.status(200).json(openings)
}

const createOpening = async (req: Request, res: Response): Promise<void> => {
    if (!req.body.name) { // TODO: fix conditional
        res.status(400)
        throw new Error('Please specify an opening name')
    }
    const opening = await Opening.create({
        name: req.body.name,
    })
    res.status(200).json(opening)
}

const deleteOpening = async(req: Request, res: Response): Promise<void> => {
    const opening = await Opening.findById(req.params.id)
    if (!opening) {
        res.status(400)
        throw new Error(`Opening with ID ${req.params.id} not found`)
    }
    await opening.remove()
    res.status(200).json({ id: req.params.id })
}

export { getOpenings, createOpening, deleteOpening }
