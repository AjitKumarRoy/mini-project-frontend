import React from "react";

const AddColumnSection = ({ newColumnName, handleNewColumnNameChange, confirmAddColumn, isSubmitting }) => {
  return (
    <div className="sticky top-[260px] left-0 bg-white shadow p-4">
      <h2 className="font-semibold mb-3">Add New Column</h2>
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Column Name"
          className="border p-2 rounded-md w-full sm:w-48"
          value={newColumnName}
          onChange={handleNewColumnNameChange}
        />
        <button
          onClick={confirmAddColumn}
          disabled={isSubmitting || !newColumnName.trim()}
          className={`py-2 px-4 rounded-md ${
            isSubmitting || !newColumnName.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600 transition-colors"
          }`}
        >
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
};

export default AddColumnSection;