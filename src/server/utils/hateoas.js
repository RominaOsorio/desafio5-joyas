export const prepararHATEOAS = (joyas) => {
  const stockTotal = 0
  const results = joyas.map((j) => ({
    name: j.nombre,
    href: `joyas/${j.id}`
  }))

  return {
    total: joyas.length,
    stockTotal,
    results
  }
}
