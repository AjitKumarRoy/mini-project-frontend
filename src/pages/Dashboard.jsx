import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [spreadsheets, setSpreadsheets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpreadsheets();
  }, []);

  async function fetchSpreadsheets() {
    try {
      const res = await api.get('/api/sheets/listSpreadSheets');
      setSpreadsheets(res.data.spreadsheets || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-4 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Dashboard</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="w-full max-w-md flex flex-col gap-4">
          {/* Custom Template Section */}
          <Card className="bg-white shadow-lg p-4 rounded-xl">
            <CardContent className="flex flex-col items-center text-center">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Create a New Spreadsheet</h2>
              <Link to="/create-spreadsheet">
                <Button variant="outline" className="px-6 py-2 text-blue-600 border-blue-500">
                  + New Spreadsheet
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* List of Spreadsheets */}
          <Card className="bg-white shadow-lg p-4 rounded-xl">
            <CardContent>
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Your Spreadsheets</h2>
              {spreadsheets.length === 0 ? (
                <p className="text-gray-500 text-center">No spreadsheets found</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {spreadsheets.map((sheet) => (
                    <Link
                      to={`/sheets/${sheet.id}`}
                      key={sheet.id}
                      className="block p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
                    >
                      {sheet.name}
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
