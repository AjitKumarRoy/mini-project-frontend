import React, { useState, useContext } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SpreadsheetContext } from "../contexts/SpreadsheetContext"; // Import the context
import { ArrowLeftCircle } from "lucide-react";
import { motion } from "framer-motion";


const CreateSpreadsheet = () => {
  const navigate = useNavigate();
  const [spreadsheetName, setSpreadsheetName] = useState("");
  const [columns, setColumns] = useState([{ name: "", type: "Text" }]);
  const [selectedDates, setSelectedDates] = useState({});
  const [showCalendar, setShowCalendar] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setNeedsRefresh } = useContext(SpreadsheetContext); // Get the setter function

  const handleColumnChange = (index, key, value) => {
    const updatedCols = [...columns];
    updatedCols[index][key] = value;
    setColumns(updatedCols);
    if (key === "type" && value !== "Date") {
      setShowCalendar(null);
    }
  };

  const addColumn = () => {
    setColumns([...columns, { name: "", type: "Text" }]);
  };

  const removeColumn = (index) => {
    setColumns(columns.filter((_, i) => i !== index));
    const updatedSelectedDates = { ...selectedDates };
    delete updatedSelectedDates[index];
    setSelectedDates(updatedSelectedDates);
  };

  const handleDateChange = (date, index) => {
    const updatedSelectedDates = { ...selectedDates };
    updatedSelectedDates[index] = date;
    setSelectedDates(updatedSelectedDates);
    const updatedCols = [...columns];
    updatedCols[index].name = date.toLocaleDateString();
    setColumns(updatedCols);
    setShowCalendar(null);
  };

  const handleColumnNameClick = (index) => {
    if (columns[index].type === "Date") {
      setShowCalendar(index);
    } else {
      setShowCalendar(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await api.post("/api/sheets/createSpreadSheet", {
        title: spreadsheetName,
      });
      const { spreadsheetId } = res.data;

      await api.post(`/api/sheets/${spreadsheetId}/writeBoldText`, {
        sheetName: "Sheet1",
        range: "A1:" + String.fromCharCode(64 + columns.length) + "1",
        values: [columns.map((col) => col.name)],
      });

      setNeedsRefresh(true); // Trigger the refresh in Navbar
      navigate(`/sheets/${spreadsheetId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

    const handleBack = () => {
      if (window.history.state && window.history.state.idx > 0) {
        navigate(-1);
      } else {
        navigate("/"); // Fallback: Navigate to home (or any default route)
      }
    };

  return (
    <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 pt-10 pb-8">

      {/* Back Icon at the top */}
      <motion.button
        onClick={handleBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="self-start inline-flex mb-4 items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
      >
        <ArrowLeftCircle size={22} />
        <span className="font-medium">Back</span>
      </motion.button>

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center text-blue-600">
          New Spreadsheet
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Spreadsheet Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              value={spreadsheetName}
              onChange={(e) => setSpreadsheetName(e.target.value)}
              required
            />
          </div>

          {columns.map((col, idx) => (
            <div key={idx} className="flex items-center space-x-2 w-full">
              <input
                type="text"
                className={`column-name-input w-30 md:flex-grow md:flex-grow border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 text-sm ${
                  col.type === "Date" ? "cursor-pointer" : ""
                }`}
                placeholder={
                  col.type === "Date" ? "Select Date" : "Column Name"
                }
                value={col.name}
                onChange={(e) =>
                  handleColumnChange(idx, "name", e.target.value)
                }
                onClick={() => handleColumnNameClick(idx)}
                required
              />
              <div className="relative w-24 sm:w-auto">
                <select
                  className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-3 py-2 pr-6 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm"
                  value={col.type}
                  onChange={(e) =>
                    handleColumnChange(idx, "type", e.target.value)
                  }
                >
                  <option>Text</option>
                  <option>Number</option>
                  <option>Date</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {columns.length > 1 && (
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeColumn(idx)}
                >
                  X
                </button>
              )}
              {showCalendar === idx && (
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

          <button
            type="button"
            onClick={addColumn}
            className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md w-fit"
          >
            Add Column +
          </button>

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-md w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Spreadsheet"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSpreadsheet;
