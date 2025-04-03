import React, { useEffect, useState, useRef } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";

const SheetDetail = () => {
  const { sheetId } = useParams();
  const [spreadsheetName, setSpreadsheetName] = useState("");
  const [sheets, setSheets] = useState([]);
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sheetName, setSheetName] = useState("Sheet1");
  const [formValues, setFormValues] = useState({});
  const [columnCount, setColumnCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("view");

  const sheetContainerRef = useRef(null);

  useEffect(() => {
    fetchSpreadsheetDetails();
    fetchSheets();
    fetchSheetData();
  }, [sheetName]);

  async function fetchSpreadsheetDetails() {
    try {
      const res = await api.get(`/api/sheets/${sheetId}/metadata`);
      setSpreadsheetName(res.data.metadata.properties.title || "Untitled Spreadsheet");
    } catch (error) {
      console.error("Error fetching spreadsheet details:", error.response ? error.response.data : error.message);
    }
  }

  async function fetchSheets() {
    try {
      const res = await api.get(`/api/sheets/${sheetId}/listSheets`);
      setSheets(res.data.sheets || []);
    } catch (error) {
      console.error("Error fetching sheets:", error.response ? error.response.data : error.message);
    }
  }

  async function fetchSheetData() {
    try {
      setLoading(true);
      const res = await api.post(`/api/sheets/${sheetId}`, { sheetName });
      const data = res.data.data || [];

      const maxColumns = data.reduce((max, row) => Math.max(max, row.length), 0);
      const normalizedData = data.map((row) => [...row, ...Array(maxColumns - row.length).fill("")]);

      setSheetData(normalizedData);
      setColumnCount(maxColumns);
    } catch (error) {
      console.error("Error fetching sheet data:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (key, value) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleAddRow = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const maxColumns = sheetData.length > 0 ? sheetData[0].length : columnCount;
      const newRow = Array.from({ length: maxColumns }, (_, idx) => formValues[`col${idx}`] || "");

      await api.post(`/api/sheets/${sheetId}/append`, { sheetName, values: [newRow] });

      setFormValues({});
      await fetchSheetData();
    } catch (error) {
      console.error("Error adding row:", error.response ? error.response.data : error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddSheet = async () => {
    try {
      const newSheetTitle = `Sheet${sheets.length + 1}`;
      await api.post(`/api/sheets/${sheetId}/createSheet`, { sheetName: newSheetTitle });
      fetchSheets();
      setSheetName(newSheetTitle);
    } catch (error) {
      console.error("Error adding sheet:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col mt-[56px] bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 sticky top-[80px] left-0 w-full z-10 shadow-md">
        <h1 className="text-xl font-semibold">Spreadsheet: {spreadsheetName}</h1>
      </nav>

      {/* Sheet List */}
      <div className="bg-white p-3 sticky top-[130px] left-0 w-full z-10 flex gap-2 overflow-x-auto shadow-sm">
        <button onClick={handleAddSheet} className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
          +
        </button>
        {sheets.map((sheet) => (
          <button
            key={sheet.sheetId}
            className={`px-4 py-2 rounded-md ${sheetName === sheet.title ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300 transition-colors"}`}
            onClick={() => {
              setSheetName(sheet.title);
              setColumnCount(0);
              setSheetData([]);
            }}
          >
            {sheet.title}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex mt-4 sticky top-[200px] left-0 bg-white shadow-sm">
        <button
          className={`px-4 py-2 rounded-t-md ${activeTab === "view" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300 transition-colors"}`}
          onClick={() => setActiveTab("view")}
        >
          View Sheet
        </button>
        <button
          className={`px-4 py-2 rounded-t-md ${activeTab === "add" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300 transition-colors"}`}
          onClick={() => setActiveTab("add")}
        >
          Add Row
        </button>
      </div>

      {/* Add Row Section */}
      {activeTab === "add" && sheetData.length > 0 && (
        <div className="sticky top-[260px] left-0 bg-white shadow p-4">
          <h2 className="font-semibold mb-3">Add New Row</h2>
          <div className="flex flex-wrap gap-3">
            {sheetData[0].map((_, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={sheetData[0][idx] || `Column ${idx + 1}`}
                className="border p-2 rounded-md w-full sm:w-32 text-center"
                value={formValues[`col${idx}`] || ""}
                onChange={(e) => handleInputChange(`col${idx}`, e.target.value)}
              />
            ))}
          </div>
          <button
            onClick={handleAddRow}
            disabled={isSubmitting}
            className={`py-2 px-4 mt-3 rounded-md ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600 transition-colors"}`}
          >
            {isSubmitting ? "Adding..." : "Add Row"}
          </button>
        </div>
      )}

      {/* Scrollable Sheet Data Container */}
      {activeTab === "view" && (
        <div ref={sheetContainerRef} className="flex-1 overflow-auto mt-4 bg-white p-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : sheetData.length === 0 ? (
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="font-semibold mb-3">Define Columns</h2>
              <input
                type="number"
                min="1"
                className="border p-2 mb-3 rounded-md w-full sm:w-40 text-center"
                placeholder="Number of columns"
                onChange={(e) => setColumnCount(parseInt(e.target.value, 10) || 0)}
              />
              {columnCount > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Enter First Row Data</h3>
                  <div className="flex flex-wrap gap-3">
                    {[...Array(columnCount)].map((_, idx) => (
                      <input
                        key={idx}
                        type="text"
                        placeholder={`Column ${idx + 1}`}
                        className="border p-2 rounded-md w-full sm:w-32 text-center"
                        onChange={(e) => handleInputChange(`col${idx}`, e.target.value)}
                      />
                    ))}
                  </div>
                  <button onClick={handleAddRow} className="bg-green-500 text-white py-2 px-4 mt-3 rounded-md hover:bg-green-600 transition-colors">
                    Submit
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-auto border border-gray-300 rounded-lg">
              <table className="w-full border-collapse border">
                <thead className="bg-gray-100">
                  <tr>
                    {sheetData[0].map((_, colIdx) => (
                      <th key={colIdx} className="border p-3 min-w-[100px] sm:min-w-[150px] text-center">
                        Column {colIdx + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sheetData.map((row, rowIdx) => (
                    <tr key={rowIdx} className="even:bg-gray-50">
                      {row.map((cell, colIdx) => (
                        <td key={colIdx} className="border text-center p-3 min-w-[80px] sm:min-w-[150px] max-w-[200px] overflow-hidden">
                          <div className="w-24 sm:w-40 overflow-x-auto whitespace-nowrap">{cell}</div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SheetDetail;