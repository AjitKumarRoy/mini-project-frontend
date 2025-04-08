// contexts/SpreadsheetContext.js
import React, { createContext, useState, useCallback } from 'react';
import api from '../api/api';

export const SpreadsheetContext = createContext({
  needsRefresh: false,
  setNeedsRefresh: () => {},
  fetchAndUpdateSpreadsheets: () => Promise.resolve(),
});

export const SpreadsheetProvider = ({ children }) => {
  const [needsRefresh, setNeedsRefresh] = useState(false);

  const fetchAndUpdateSpreadsheets = useCallback(async (setSpreadsheets, setLoading) => {
    setLoading(true);
    try {
      const res = await api.get("/api/sheets/listSpreadSheets");
      setSpreadsheets(res.data.spreadsheets || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setNeedsRefresh(false); // Reset the flag after fetching
    }
  }, []);

  return (
    <SpreadsheetContext.Provider value={{ needsRefresh, setNeedsRefresh, fetchAndUpdateSpreadsheets }}>
      {children}
    </SpreadsheetContext.Provider>
  );
};