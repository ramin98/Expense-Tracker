import { useMemo, useState } from 'react'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import Charts from './components/Charts.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { calcStats } from './utils/analytics.js'

const DEFAULT_CATS = ['Food','Transport','Housing','Health','Entertainment','Shopping','Connectivity','Other']

export default function App() {
  const [expenses, setExpenses] = useLocalStorage('expenses:v1', [])
  const [filter, setFilter] = useState({ q:'', from:'', to:'', cat:'ALL' })

  const filtered = useMemo(() => {
    return expenses.filter(e => {
      const byQ = filter.q ? (e.note?.toLowerCase().includes(filter.q.toLowerCase())) : true
      const byCat = filter.cat === 'ALL' ? true : e.category === filter.cat
      const byFrom = filter.from ? new Date(e.date) >= new Date(filter.from) : true
      const byTo = filter.to ? new Date(e.date) <= new Date(filter.to) : true
      return byQ && byCat && byFrom && byTo
    })
  }, [expenses, filter])

  const stats = useMemo(() => calcStats(filtered), [filtered])

  function addExpense(exp) {
    setExpenses(prev => [{ id: crypto.randomUUID(), ...exp }, ...prev])
  }
  function removeExpense(id) { setExpenses(prev => prev.filter(x => x.id !== id)) }
  function clearAll() {
    if (confirm('Удалить все записи?')) setExpenses([])
  }

  return (
    <div className="container">
      <div className="header">
        <div>
          <div className="h1">Expense Tracker</div>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <h2>Add expense</h2>
          <p className="sub">Amount, category, date and note — enough for basic analysis.</p>
          <ExpenseForm onAdd={addExpense} categories={DEFAULT_CATS} />
          <div className="footer-note">Tip: you can remove fields/validation and code them live with guests.</div>
        </div>

        <div className="card">
          <h2>Filter</h2>
          <p className="sub">Search by note, narrow by date and category.</p>
          <div className="row">
            <input placeholder="Search note…" value={filter.q} onChange={e=>setFilter(v=>({...v,q:e.target.value}))} />
            <select value={filter.cat} onChange={e=>setFilter(v=>({...v,cat:e.target.value}))}>
              <option value="ALL">All categories</option>
              {DEFAULT_CATS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="row" style={{marginTop:8}}>
            <input type="date" value={filter.from} onChange={e=>setFilter(v=>({...v,from:e.target.value}))} />
            <input type="date" value={filter.to} onChange={e=>setFilter(v=>({...v,to:e.target.value}))} />
            <button className="ghost" onClick={()=>setFilter({ q:'', from:'', to:'', cat:'ALL' })}>Reset</button>
          </div>

          <div className="stats" style={{marginTop:12}}>
            <div className="stat">
              <div className="label">Entries</div>
              <div className="value">{filtered.length}</div>
            </div>
            <div className="stat">
              <div className="label">Total amount</div>
              <div className="value">{stats.total.toFixed(2)} ₼</div>
            </div>
            <div className="stat">
              <div className="label">Categories</div>
              <div className="value">{stats.categories.length}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid" style={{marginTop:16}}>
        <div className="card">
          <h2>Expense list</h2>
          <p className="sub">Click “×” to delete. Records are stored in the browser.</p>
          <ExpenseList items={filtered} onRemove={removeExpense} />
          {expenses.length > 0 && <div style={{marginTop:8}}><button className="ghost" onClick={clearAll}>Clear all</button></div>}
        </div>

        <div className="card">
          <h2>Analytics</h2>
          <p className="sub">Category pie and monthly trend.</p>
          <Charts stats={stats} />
        </div>
      </div>

    </div>
  )
}
