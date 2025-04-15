import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";
import { motion } from "framer-motion";

const SheetHeader = ({ spreadsheetName }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 pt-4">
      <motion.button
        onClick={handleBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="self-start inline-flex mb-4 items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
      >
        <ArrowLeftCircle size={22} />
        <span className="font-medium">Back</span>
      </motion.button>
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 left-0 w-full z-10 shadow-md">
        <h1 className="text-xl font-semibold">
          Spreadsheet: {spreadsheetName}
        </h1>
      </div>
    </div>
  );
};

export default SheetHeader;
