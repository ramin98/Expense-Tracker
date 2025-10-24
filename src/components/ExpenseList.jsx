export default function ExpenseList({ items, onRemove }) {
  if (items.length === 0) return <div className="muted">Nothing found.</div>
  return (
    <div className="list">
      {items.map(x => (
        <div className="item" key={x.id}>
          <div>
            <div className="amt">{x.amount.toFixed(2)} ₼ <span className="cat">• {x.category}</span></div>
            {x.note && <div className="note">{x.note}</div>}
          </div>
          <div className="date">{new Date(x.date).toLocaleDateString()}</div>
          <button className="ghost" onClick={()=>onRemove(x.id)} title="Delete">×</button>
        </div>
      ))}
    </div>
  )
}
