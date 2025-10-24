import { useState } from 'react'

export default function ExpenseForm({ onAdd, categories }) {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
  const [note, setNote] = useState('')

  function submit(e) {
    e.preventDefault()
    const a = Number(amount)
    if (!a || a <= 0) return alert('Enter amount greater than 0')
    onAdd({ amount: a, category, date, note: note.trim() })
    setAmount(''); setNote('')
  }

  return (
    <form onSubmit={submit}>
      <div className="row">
        <input type="number" step="0.01" min="0.01" placeholder="Amount, ₼" value={amount} onChange={e=>setAmount(e.target.value)} />
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="row" style={{marginTop:8}}>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
        <input placeholder="Note (optional)" value={note} onChange={e=>setNote(e.target.value)} />
        <button className="primary" type="submit">Add</button>
      </div>
    </form>
  )
}
