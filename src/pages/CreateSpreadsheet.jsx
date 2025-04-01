import React, { useState } from 'react'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'

const CreateSpreadsheet = () => {
  const navigate = useNavigate()
  const [spreadsheetName, setSpreadsheetName] = useState('')
  const [columns, setColumns] = useState([{ name: '', type: 'Text' }])

  const handleColumnChange = (index, key, value) => {
    const updatedCols = [...columns]
    updatedCols[index][key] = value
    setColumns(updatedCols)
  }

  const addColumn = () => {
    setColumns([...columns, { name: '', type: 'Text' }])
  }

  const removeColumn = (index) => {
    setColumns(columns.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // 1. Create the spreadsheet
      const res = await api.post('/api/sheets/createSpreadSheet', {
        title: spreadsheetName,
      })
      const { spreadsheetId } = res.data

      // 2. Optionally create a new sheet, or update with the columns
      // This depends on your backend logic
      // For example, you might want to create a "Sheet1" and fill in the header row
      await api.post(`/api/sheets/${spreadsheetId}/update`, {
        sheetName: 'Sheet1',
        range: 'A1:' + String.fromCharCode(64 + columns.length) + '1', // e.g., A1:C1
        values: [columns.map((col) => col.name)],
      })

      // ...any other logic to set data types, etc.

      // Navigate to newly created spreadsheet detail
      navigate(`/sheets/${spreadsheetId}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-2">
      <h1 className="text-xl font-bold mb-4">New Spreadsheet</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Spreadsheet Name */}
        <div>
          <label className="block font-medium mb-1">Spreadsheet Name</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={spreadsheetName}
            onChange={(e) => setSpreadsheetName(e.target.value)}
            required
          />
        </div>

        {/* Dynamic Columns */}
        {columns.map((col, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              type="text"
              className="border p-2 flex-1"
              placeholder={`Column Name`}
              value={col.name}
              onChange={(e) => handleColumnChange(idx, 'name', e.target.value)}
              required
            />
            <select
              className="border p-2"
              value={col.type}
              onChange={(e) => handleColumnChange(idx, 'type', e.target.value)}
            >
              <option>Text</option>
              <option>Number</option>
              <option>Date</option>
              {/* add more as needed */}
            </select>
            {columns.length > 1 && (
              <button
                type="button"
                className="text-red-500"
                onClick={() => removeColumn(idx)}
              >
                X
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addColumn}
          className="text-white bg-gray-700 py-1 px-2 w-fit rounded"
        >
          Add Column +
        </button>

        <button
          type="submit"
          className="bg-red-500 text-white py-2 rounded mt-4"
        >
          Create Spreadsheet
        </button>
      </form>
    </div>
  )
}

export default CreateSpreadsheet
