import React from "react";

const SheetTabs = ({ activeTab, setActiveTab, handleAddColumn, isSubmitting, isAddingColumn }) => {
  return (
    <div className="flex mt-4 py-2 bg-white shadow-sm justify-around">
      <button
        className={`px-4 py-2 rounded-md ${
          activeTab === "view"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300 transition-colors"
        }`}
        onClick={() => setActiveTab("view")}
      >
        View Sheet
      </button>
      <button
        className={`px-4 py-2 rounded-md ${
          activeTab === "add"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300 transition-colors"
        }`}
        onClick={() => setActiveTab("add")}
      >
        Add Row
      </button>
      <button
        onClick={handleAddColumn}
        disabled={isSubmitting}
        className={`px-4 py-2 rounded-md ${
          isSubmitting || isAddingColumn
            ? "bg-gray-400 cursor-not-allowed"
            : `${
                activeTab === "addColumn"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 transition-colors"
              }`
        }`}
      >
        Add Column
      </button>
    </div>
  );
};

export default SheetTabs;