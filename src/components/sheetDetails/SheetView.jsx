import React, { useState } from "react"; // Import useState
import { Trash2 } from "lucide-react";

const SheetView = ({
  loading,
  sheetData,
  openDeleteDialog,
  openDeleteColumnDialog,
  handleCellClick,
  editingCell,
  cellValue,
  handleCellValueChange,
  handleCellBlur,
  columnCount, // Receive columnCount as a prop
  setColumnCount, // Receive setColumnCount as a prop
  formValues, // Receive formValues as a prop
  handleInputChange, // Receive handleInputChange as a prop
  handleAddRow, // Receive handleAddRow as a prop
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (sheetData.length === 0) {
    return (
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
            <button
              onClick={handleAddRow}
              className="bg-green-500 text-white py-2 px-4 mt-3 rounded-md hover:bg-green-600 transition-colors"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-auto border border-gray-300 rounded-lg">
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-3 min-w-[40px] text-center"></th>
            {sheetData[0]?.map((_, colIdx) => (
              <th
                key={`delete-col-${colIdx}`}
                className="border p-3 min-w-[100px] sm:min-w-[150px] text-center"
              >
                <div
                  onClick={() => openDeleteColumnDialog(colIdx)}
                  className="cursor-pointer text-gray-500 hover:text-red-500 mx-auto w-fit"
                >
                  <Trash2 className="w-4 h-4 mx-auto text-red-500 hover:text-red-700" />
                </div>
              </th>
            ))}
          </tr>
          <tr className="bg-gray-100">
            <th className="border p-3 min-w-[40px] text-center"></th>
            {sheetData[0]?.map((header, colIdx) => (
              <th
                key={colIdx}
                className="border p-3 min-w-[100px] sm:min-w-[150px] text-center relative"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sheetData.slice(1)?.map((row, rowIdx) => (
            <tr key={rowIdx} className="even:bg-gray-50">
              <td className="border text-center p-3">
                <div onClick={() => openDeleteDialog(rowIdx)}>
                  <Trash2 className="w-4 h-4 mx-auto text-red-500 hover:text-red-700" />
                </div>
              </td>
              {row.map((cell, colIdx) => (
                <td
                  key={colIdx}
                  className="border p-3 min-w-[80px] sm:min-w-[150px] max-w-[200px] overflow-hidden"
                  onClick={() => handleCellClick(rowIdx, colIdx, cell)}
                >
                  <div className="w-24 sm:w-40 overflow-x-auto whitespace-nowrap flex justify-center items-center">
                    {editingCell?.row === rowIdx && editingCell?.col === colIdx ? (
                      <input
                        type="text"
                        value={cellValue}
                        onChange={handleCellValueChange}
                        onBlur={() => handleCellBlur(rowIdx, colIdx)}
                        className="w-full p-1 text-center border rounded"
                        autoFocus
                      />
                    ) : (
                      cell
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SheetView;