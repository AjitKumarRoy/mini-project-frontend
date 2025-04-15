import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddRowSection = ({ sheetData, formValues, handleInputChange, isDateColumn, datePickersVisible, handleDateInputClick, selectedDates, handleDateChange, handleAddRow, isSubmitting }) => {
  return (
    <div className="sticky top-[320px] left-0 bg-white shadow p-4">
      <h2 className="font-semibold mb-3">Add New Row</h2>
      <div className="flex flex-wrap gap-3">
        {sheetData[0]?.map((header, idx) => (
          <div key={idx} className="relative">
            <input
              type="text"
              placeholder={header || `Column ${idx + 1}`}
              className={`border p-2 rounded-md w-full sm:w-32 text-center ${
                isDateColumn(idx) ? "cursor-pointer" : ""
              }`}
              value={formValues[`col${idx}`] || ""}
              onChange={(e) =>
                handleInputChange(`col${idx}`, e.target.value)
              }
              onClick={() =>
                isDateColumn(idx) && handleDateInputClick(idx)
              }
              readOnly={isDateColumn(idx)}
            />
            {isDateColumn(idx) && datePickersVisible[idx] && (
              <div className="absolute z-10 shadow-md rounded-lg bg-white mt-1">
                <DatePicker
                  selected={selectedDates[idx]}
                  onChange={(date) => handleDateChange(date, idx)}
                  inline
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleAddRow}
        disabled={isSubmitting}
        className={`py-2 px-4 mt-3 rounded-md ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-500 text-white hover:bg-red-600 transition-colors"
        }`}
      >
        {isSubmitting ? "Adding..." : "Add Row"}
      </button>
    </div>
  );
};

export default AddRowSection;