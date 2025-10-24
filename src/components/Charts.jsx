import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'

const palette = ['#7aa2f7','#9ece6a','#bb9af7','#f7768e','#e0af68','#2ac3de','#c0caf5','#73daca']

export default function Charts({ stats }) {
  const pieData = stats.categories.map((c, i) => ({
    name: c.category, value: Number(c.total.toFixed(2)), fill: palette[i % palette.length]
  }))

  const lineData = stats.timeline.map(t => ({ month: t.month, total: Number(t.total.toFixed(2)) }))

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#7aa2f7" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
