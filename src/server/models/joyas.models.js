import db from '../database/db_connect.js'
import format from 'pg-format'

export const findAll = async ({ limits = 3, orderBy = 'nombre_ASC', page = 1 }) => {
  const [column, sort] = orderBy.split('_')
  const offset = Math.abs(page > 0 ? page - 1 : 0) * limits
  const formatedQuery = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s;', column, sort, limits, offset)
  return await db(formatedQuery)
}

export const getFilter = async ({ precioMin, precioMax, categoria, metal }) => {
  let query = 'SELECT * FROM inventario;'
  const filtros = []
  const values = []

  if (precioMin) {
    values.push(precioMin)
    filtros.push(`precio >= $${values.length}`)
  }
  if (precioMax) {
    values.push(precioMax)
    filtros.push(`precio <= $${values.length}`)
  }

  if (categoria) {
    values.push(categoria)
    filtros.push(`categoria = $${values.length}`)
  }

  if (metal) {
    values.push(metal)
    filtros.push(`metal = $${values.length}`)
  }

  if (filtros.length > 0) {
    query += ` WHERE ${filtros.join(' AND ')} `
  }
  return await db(query, values)
}
