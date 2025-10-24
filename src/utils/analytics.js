// Простые агрегаты и группировки
export function sum(arr, pick) {
  return arr.reduce((acc, x) => acc + (pick ? pick(x) : x), 0)
}

export function groupBy(arr, pickKey) {
  return arr.reduce((acc, x) => {
    const k = pickKey(x)
    acc[k] = acc[k] || []
    acc[k].push(x)
    return acc
  }, {})
}

export function toYYYYMM(d) {
  const date = new Date(d)
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}`
}

export function calcStats(expenses) {
  const total = sum(expenses, e => e.amount)
  const byCat = groupBy(expenses, e => e.category)
  const categories = Object.entries(byCat).map(([cat, arr]) => ({
    category: cat,
    total: sum(arr, e => e.amount),
    count: arr.length
  })).sort((a,b) => b.total - a.total)

  const byMonth = groupBy(expenses, e => toYYYYMM(e.date))
  const timeline = Object.keys(byMonth).sort().map(m => ({
    month: m,
    total: sum(byMonth[m], e => e.amount)
  }))

  return { total, categories, timeline }
}
