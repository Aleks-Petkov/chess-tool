import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express'
import { promises as fs } from 'fs'

const app: express.Application = express()
const defaultPort: number = 3000
//app.use(express.static('client')) 
app.get('/', async (req, res) => {
    res.send(await fs.readFile('client/index.html', 'utf8'))
})
app.listen(process.env.PORT || defaultPort, () => {
    const port = (process.env.PORT == undefined) ? defaultPort : process.env.PORT
    console.log(`Server listening on http://localhost:${port}`)
})