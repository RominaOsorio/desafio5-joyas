import express from 'express'
import cors from 'cors'

import { prepararHATEOAS } from './utils/hateoas.js'
import { findAll, getFilter } from './models/joyas.models.js'
import { logServer } from './middlewares/logServer.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use(cors())
app.use(logServer)

app.get('/joyas', async (req, res) => {
  try {
    const joyas = await findAll(req.query)
    const HATEOAS = await prepararHATEOAS(joyas)
    res.status(200).json({ status: true, message: HATEOAS })
  } catch (error) {
    res.status(500).json({ status: false, message: 'Ha ocurrido un error en el servidor' })
  }
})

app.get('/joyas/filtros', async (req, res) => {
  try {
    const result = await getFilter(req.query)
    res.status(200).json({ status: true, message: result })
  } catch (error) {
    res.status(500).json({ status: false, message: error })
  }
})

app.get('*', (req, res) => res.status(404).json({ status: false, message: 'Page not found' }))

app.listen(PORT, () => console.log(`Server UP! ${PORT}`))

export default app
