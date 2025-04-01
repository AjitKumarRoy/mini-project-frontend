import React, { useEffect, useState } from 'react'
import api from '../api/api'
import { useParams } from 'react-router-dom'

const SheetDetail = () => {
  const { sheetId } = useParams()
  const [sheetData, setSheetData] = useState([])
  const [loading, setLoading] = useState(true)
  const [sheetName, setSheetName] = useState('Sheet1') // default
  const [formValues, setFormValues] = useState({}) // for new row

  useEffect(() => {
    fetchSheetData()
  }, [])

  async function fetchSheetData() {
    try {
      setLoading(true)
      const res = await api.get(`/api/sheets/${sheetId}`, {
        // we can pass sheetName in body if needed, but GET typically uses query
        // or you might have a separate route
        params: { sheetName }
      })
      setSheetData(res.data.data || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (key, value) => {
    setFormValues({ ...formValues, [key]: value })
  }

  const handleAddRow = async () => {
    try {
      // Convert formValues object into an array of arrays for your columns
      // e.g. if formValues = { Roll: '21', Name: 'John', Class: '15' }
      const newRow = Object.values(formValues)
      await api.post(`/api/sheets/${sheetId}/append`, {
        sheetName,
        values: [newRow]
      })
      // re-fetch data
      fetchSheetData()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-2">
      <h1 className="text-xl font-bold mb-4">Spreadsheet: {sheetId}</h1>

      {/* If multiple sheets, a dropdown to select sheet name */}
      {/* <select value={sheetName} onChange={(e) => setSheetName(e.target.value)}> ... </select> */}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-2">
          {/* List View of rows */}
          {sheetData.map((row, idx) => (
            <div key={idx} className="bg-white shadow p-2 rounded">
              {row.map((cell, cidx) => (
                <p key={cidx}>{cell}</p>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Form to add new row */}
      <div className="mt-4 p-2 bg-white shadow rounded">
        <h2 className="font-semibold mb-2">Add New Row</h2>
        {/* Example for a known set of columns: Roll, Name, Class, Marks */}
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Roll"
            className="border p-2"
            onChange={(e) => handleInputChange('Roll', e.target.value)}
          />
          <input
            type="text"
            placeholder="Name"
            className="border p-2"
            onChange={(e) => handleInputChange('Name', e.target.value)}
          />
          <input
            type="text"
            placeholder="Class"
            className="border p-2"
            onChange={(e) => handleInputChange('Class', e.target.value)}
          />
          <input
            type="number"
            placeholder="Marks"
            className="border p-2"
            onChange={(e) => handleInputChange('Marks', e.target.value)}
          />

          <button
            onClick={handleAddRow}
            className="bg-red-500 text-white py-2 rounded"
          >
            Add Row
          </button>
        </div>
      </div>
    </div>
  )
}

export default SheetDetail
