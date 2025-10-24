import { useState } from 'react'

export default function ExpenseForm({ onAdd }) {
  
  // KOD BURADA OLACAQ

  return (
    <form>
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
