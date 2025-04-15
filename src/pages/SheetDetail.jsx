import React, { useEffect, useState, useRef } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";
import SheetHeader from "../components/sheetDetails/SheetHeader";
import SheetTabs from "../components/sheetDetails/SheetTabs";
import AddColumnSection from "../components/sheetDetails/AddColumnSection";
import AddRowSection from "../components/sheetDetails/AddRowSection";
import SheetView from "../components/sheetDetails/SheetView";
import DeleteConfirmationDialog from "../components/sheetDetails/DeleteConfirmationDialog";
import { Button } from "@/components/ui/button"; // Keep this for the "Add Sheet" button
import AttendanceSheetView from "./AttendanceSheetView"; // Import the new component

const SheetDetail = () => {
  const { sheetId } = useParams();
  const [spreadsheetName, setSpreadsheetName] = useState("");
  const [sheets, setSheets] = useState([]);
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sheetName, setSheetName] = useState("Sheet1");
  const [formValues, setFormValues] = useState({});
  const [columnCount, setColumnCount] = useState(0);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("view");
  const [datePickersVisible, setDatePickersVisible] = useState({});
  const [selectedDates, setSelectedDates] = useState({});
  const sheetContainerRef = useRef(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDeleteIndex, setRowToDeleteIndex] = useState(null);
  const [editingCell, setEditingCell] = useState(null);
  const [cellValue, setCellValue] = useState("");
  const [columnToDeleteIndex, setColumnToDeleteIndex] = useState(null);
  const [deleteColumnDialogOpen, setDeleteColumnDialogOpen] = useState(false);
  useEffect(() => {
    fetchSpreadsheetDetails();
    fetchSheets();
    fetchSheetData();
  }, [sheetId, sheetName]);

  async function fetchSpreadsheetDetails() {
    try {
      const res = await api.get(`/api/sheets/${sheetId}/metadata`);
      setSpreadsheetName(
        res.data.metadata.properties.title || "Untitled Spreadsheet"
      );
    } catch (error) {
      console.error(
        "Error fetching spreadsheet details:",
        error.response ? error.response.data : error.message
      );
    }
  }

  async function fetchSheets() {
    try {
      const res = await api.get(`/api/sheets/${sheetId}/listSheets`);
      setSheets(res.data.sheets || []);
    } catch (error) {
      console.error(
        "Error fetching sheets:",
        error.response ? error.response.data : error.message
      );
    }
  }

  async function fetchSheetData() {
    try {
      setLoading(true);
      const res = await api.post(`/api/sheets/${sheetId}`, { sheetName });
      const data = res.data.data || [];

      const maxColumns = data.reduce(
        (max, row) => Math.max(max, row.length),
        0
      );
      const normalizedData = data.map((row) => [
        ...row,
        ...Array(maxColumns - row.length).fill(""),
      ]);

      setSheetData(normalizedData);
      setColumnCount(maxColumns);
      setEditingCell(null); // Reset editing cell on data refresh
      setCellValue("");
      setIsAddingColumn(false);
      setNewColumnName("");
    } catch (error) {
      console.error(
        "Error fetching sheet data:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (key, value) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleDateChange = (date, index) => {
    const updatedSelectedDates = { ...selectedDates };
    updatedSelectedDates[index] = date;
    setSelectedDates(updatedSelectedDates);
    setFormValues({
      ...formValues,
      [`col${index}`]: date.toLocaleDateString(),
    });
    setDatePickersVisible({ ...datePickersVisible, [index]: false });
  };

  const handleDateInputClick = (index) => {
    setDatePickersVisible({
      ...datePickersVisible,
      [index]: !datePickersVisible[index],
    });
  };

  const handleAddRow = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const maxColumns =
        sheetData.length > 0 ? sheetData[0].length : columnCount;
      const newRow = Array.from(
        { length: maxColumns },
        (_, idx) => formValues[`col${idx}`] || ""
      );

      await api.post(`/api/sheets/${sheetId}/append`, {
        sheetName,
        values: [newRow],
      });

      setFormValues({});
      setSelectedDates({});
      setDatePickersVisible({});
      await fetchSheetData();
    } catch (error) {
      console.error(
        "Error adding row:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddColumn = () => {
    setActiveTab("addColumn"); // Switch to view tab when adding column UI is shown
    setIsAddingColumn(true);
  };

  const handleNewColumnNameChange = (e) => {
    setNewColumnName(e.target.value);
  };

  const confirmAddColumn = async () => {
    if (!newColumnName.trim()) {
      setIsAddingColumn(false);
      setNewColumnName("");
      return;
    }
    setIsSubmitting(true);
    setIsAddingColumn(false);
    try {
      // Determine the new column's letter
      const newColIndex = sheetData[0].length;
      const newColLetter = String.fromCharCode(65 + newColIndex);

      // Construct the range to append a new column header
      const headerRange = `${newColLetter}1:${newColLetter}1`;
      const headerValues = [[newColumnName.trim()]];

      // Construct the range for the rest of the column (assuming you want to fill with empty strings)
      const dataStartRow = 2;
      const dataEndRow = sheetData.length;
      const dataRange = `${newColLetter}${dataStartRow}:${newColLetter}${dataEndRow}`;
      const emptyColumnValues = Array(sheetData.length - 1).fill([""]);

      // Make the API calls to update the sheet
      await api.post(`/api/sheets/${sheetId}/update`, {
        sheetName,
        range: headerRange,
        values: headerValues,
      });

      if (sheetData.length > 1) {
        await api.post(`/api/sheets/${sheetId}/update`, {
          sheetName,
          range: dataRange,
          values: emptyColumnValues,
        });
      }

      await fetchSheetData();
    } catch (error) {
      console.error("Error adding column:", error);
    } finally {
      setIsSubmitting(false);
      setNewColumnName("");
    }
  };

  const handleAddSheet = async () => {
    try {
      const newSheetTitle = `Sheet${sheets.length + 1}`;
      await api.post(`/api/sheets/${sheetId}/createSheet`, {
        sheetName: newSheetTitle,
      });
      fetchSheets();
      setSheetName(newSheetTitle);
    } catch (error) {
      console.error(
        "Error adding sheet:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const isDateColumn = (index) => {
    if (sheetData && sheetData[0] && sheetData[0][index]) {
      const placeholder = sheetData[0][index];
      const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
      const lowerPlaceholder = placeholder.toLowerCase();
      return (
        dateRegex.test(placeholder) ||
        lowerPlaceholder === "date" ||
        lowerPlaceholder === "dates"
      );
    }
    return false;
  };

  const openDeleteDialog = (rowIndex) => {
    setRowToDeleteIndex(rowIndex);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setRowToDeleteIndex(null);
    setDeleteDialogOpen(false);
  };

  const confirmDeleteRow = async () => {
    if (isDeleting || rowToDeleteIndex === null) return;

    const rowNumberToDelete = rowToDeleteIndex + 2;

    setIsDeleting(true);
    setDeleteDialogOpen(false);
    try {
      await api.delete(`/api/sheets/${sheetId}/deleteRows`, {
        data: {
          sheetName,
          startRow: rowNumberToDelete,
          endRow: rowNumberToDelete,
        },
      });
      await fetchSheetData();
    } catch (error) {
      console.error(
        "Error deleting row:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsDeleting(false);
      setRowToDeleteIndex(null);
    }
  };

  const openDeleteColumnDialog = (colIndex) => {
    setColumnToDeleteIndex(colIndex);
    setDeleteColumnDialogOpen(true);
  };

  const closeDeleteColumnDialog = () => {
    setColumnToDeleteIndex(null);
    setDeleteColumnDialogOpen(false);
  };

  const confirmDeleteColumn = async () => {
    if (isDeleting || columnToDeleteIndex === null) return;

    setIsDeleting(true);
    setDeleteColumnDialogOpen(false);
    try {
      const colToDeleteIndexBackend = columnToDeleteIndex; // Backend expects 0-based index
      const startColumn = String.fromCharCode(65 + colToDeleteIndexBackend);
      const endColumn = String.fromCharCode(65 + colToDeleteIndexBackend);

      await api.delete(`/api/sheets/${sheetId}/deleteColumn`, { // Assuming your delete column endpoint is different
        data: {
          sheetName,
          startColumn,
          endColumn,
        },
      });
      await fetchSheetData();
    } catch (error) {
      console.error("Error deleting column:", error);
    } finally {
      setIsDeleting(false);
      setColumnToDeleteIndex(null);
    }
  };

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleCellClick = (rowIndex, colIndex, value) => {
    setEditingCell({ row: rowIndex, col: colIndex });
    setCellValue(value);
  };

  const handleCellValueChange = (e) => {
    setCellValue(e.target.value);
  };

  const handleCellBlur = async (rowIndex, colIndex) => {
    if (editingCell?.row === rowIndex && editingCell?.col === colIndex) {
      setEditingCell(null);
      const originalValue = sheetData[rowIndex + 1][colIndex];
      if (cellValue !== originalValue) {
        // Only update if the value has changed
        if (cellValue.trim() !== "") {
          const updatedData = [...sheetData];
          updatedData[rowIndex + 1][colIndex] = cellValue;
          setSheetData(updatedData); // Optimistic update

          const startRow = rowIndex + 2; // +1 for 0-based index, +1 to skip header
          const startCol = String.fromCharCode(65 + colIndex); // Convert 0-based index to A, B, C...
          const range = `${startCol}${startRow}:${startCol}${startRow}`;
          const values = [[cellValue]];

          try {
            await api.post(`/api/sheets/${sheetId}/update`, { // Assuming your endpoint is still /update
              sheetName,
              range,
              values,
            });
            await fetchSheetData(); // Re-fetch to ensure data consistency
          } catch (error) {
            console.error("Error updating cell:", error);
            await fetchSheetData(); // Revert on error
          }
        } else {
          // If user enters nothing, revert to the original value (no update)
          await fetchSheetData();
        }
        setCellValue("");
      }
    }
  };

  const isAttendanceSheet = spreadsheetName.toLowerCase().startsWith("attendance");

  return (
    <div className="flex flex-col bg-gradient-to-br from-gray-100 to-gray-200 pt-10">
      <SheetHeader spreadsheetName={spreadsheetName} />

      <div className="bg-white p-3 w-full z-10 flex gap-2 overflow-x-auto shadow-sm">
        <Button
          onClick={handleAddSheet}
          className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          +
        </Button>
        {sheets.map((sheet) => (
          <button
            key={sheet.sheetId}
            className={`px-4 py-2 rounded-md ${
              sheetName === sheet.title
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300 transition-colors"
            }`}
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

      <SheetTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleAddColumn={handleAddColumn}
        isSubmitting={isSubmitting}
        isAddingColumn={isAddingColumn}
      />

      {activeTab === "addColumn" && (
        <AddColumnSection
          newColumnName={newColumnName}
          handleNewColumnNameChange={handleNewColumnNameChange}
          confirmAddColumn={confirmAddColumn}
          isSubmitting={isSubmitting}
        />
      )}

      {activeTab === "add" && sheetData.length > 0 && (
        <AddRowSection
          sheetData={sheetData}
          formValues={formValues}
          handleInputChange={handleInputChange}
          isDateColumn={isDateColumn}
          datePickersVisible={datePickersVisible}
          handleDateInputClick={handleDateInputClick}
          selectedDates={selectedDates}
          handleDateChange={handleDateChange}
          handleAddRow={handleAddRow}
          isSubmitting={isSubmitting}
        />
      )}

      {activeTab === "view" && (
        <div
          ref={sheetContainerRef}
          className="mt-4 bg-white p-4 overflow-y-auto"
          style={{
            maxHeight: 'calc(100vh - 132px - 64px - 60px - 110px)',
          }}
        >
          {isAttendanceSheet ? (
            <AttendanceSheetView />
          ) : (
            <SheetView
              loading={loading}
              sheetData={sheetData}
              openDeleteDialog={openDeleteDialog}
              openDeleteColumnDialog={openDeleteColumnDialog}
              handleCellClick={handleCellClick}
              editingCell={editingCell}
              cellValue={cellValue}
              handleCellValueChange={handleCellValueChange}
              handleCellBlur={handleCellBlur}
              columnCount={columnCount} // Pass columnCount
              setColumnCount={setColumnCount} // Pass setColumnCount
              formValues={formValues} // Pass formValues
              handleInputChange={handleInputChange} // Pass handleInputChange
              handleAddRow={handleAddRow} // Pass handleAddRow
            />
          )}
        </div>
      )}

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this row?"
        onConfirm={confirmDeleteRow}
        isDeleting={isDeleting}
      />

      <DeleteConfirmationDialog
        open={deleteColumnDialogOpen}
        onOpenChange={setDeleteColumnDialogOpen}
        title="Confirm Delete Column"
        message={`Are you sure you want to delete column ${
          columnToDeleteIndex !== null
            ? String.fromCharCode(65 + columnToDeleteIndex) + 1
            : ""
        }? This will delete all data in this column.`}
        onConfirm={confirmDeleteColumn}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default SheetDetail;