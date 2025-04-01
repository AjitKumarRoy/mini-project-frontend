import React, { useEffect, useState } from 'react'
import api from '../api/api'
import { Link } from 'react-router-dom'
import { PieChart, Pie, Cell } from 'recharts' // Example with Recharts

const Dashboard = () => {
  const [spreadsheets, setSpreadsheets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSpreadsheets()
  }, [])

  async function fetchSpreadsheets() {
    try {
      const res = await api.post('/api/sheets/listSpreadSheets')
      setSpreadsheets(res.data.spreadsheets || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const data = [
    { name: 'A', value: 60 },
    { name: 'B', value: 40 },
  ]

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {loading && <p>Loading...</p>}

      <div className="flex flex-col gap-4">
        {/* Example chart */}
        <div className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold mb-2">Sample Chart</h2>
          <div className="flex justify-center">
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#FF8042' : '#00C49F'} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>

        {/* List of Spreadsheets */}
        <div className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold mb-2">Your Spreadsheets</h2>
          {spreadsheets.map((sheet) => (
            <Link
              to={`/sheets/${sheet.id}`}
              key={sheet.id}
              className="block p-2 border-b hover:bg-gray-50"
            >
              {sheet.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
