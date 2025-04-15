import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronsLeft, ChevronsRight } from "lucide-react";
import { format } from "date-fns";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, XCircle, Clock, CircleDot } from "lucide-react";

const statusIcons = {
  Present: <CheckCircle className="text-green-500 mr-2 h-4 w-4" />,
  Absent: <XCircle className="text-red-500 mr-2 h-4 w-4" />,
  Late: <Clock className="text-yellow-500 mr-2 h-4 w-4" />,
  "Half Day": <CircleDot className="text-blue-500 mr-2 h-4 w-4" />,
};

const AttendanceSheetView = () => {
  const { sheetId } = useParams();
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dates, setDates] = useState([]);
  const [startDateIndex, setStartDateIndex] = useState(0);
  const visibleDays = 5; // Number of days to show at a time
  const [attendanceStatuses, setAttendanceStatuses] = useState([]);

  useEffect(() => {
    fetchAttendanceData();
  }, [sheetId]);

  const fetchAttendanceData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.post(`/api/sheets/${sheetId}`, { sheetName: "Sheet1" });
      const data = response.data.data || [];
      setSheetData(data);

      // Extract dates from headers (assuming dates start from the second column)
      if (data.length > 0) {
        const headerRow = data[0];
        const extractedDates = headerRow
          .slice(1)
          .filter((header) => {
            // Basic check if the header looks like a date (e.g. "1/12/2025")
            return /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(header);
          })
          .map((dateStr) => new Date(dateStr));
        setDates(extractedDates);

        // Extract attendance statuses from headers (assuming they appear after the dates)
        const statusStartIndex = headerRow.findIndex(
          (header) =>
            extractedDates.find(
              (d) => d.toLocaleDateString() === new Date(header).toLocaleDateString()
            ) === undefined && header !== "Name"
        );
        if (statusStartIndex !== -1) {
          // Combine default statuses and the statuses from the header into a unique array
          const defaultStatuses = ["Present", "Absent", "Late", "Half Day"];
          const newStatuses = headerRow.slice(statusStartIndex);
          const uniqueStatuses = [...new Set([...defaultStatuses, ...newStatuses])];
          setAttendanceStatuses(uniqueStatuses);
        }
      }
    } catch (err) {
      console.error("Error fetching attendance data:", err);
      setError("Failed to load attendance data.");
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceChange = async (rowIndex, dateIndex, status) => {
    // +1 to skip 'Name' column
    const columnIndex = dates.findIndex((d, index) => index === dateIndex) + 1;
    // +1 for header row, +1 for 1-based indexing
    const rowNumber = rowIndex + 2;

    if (columnIndex === -1) {
      console.error("Date not found for index:", dateIndex);
      return;
    }

    const range = `${String.fromCharCode(65 + columnIndex)}${rowNumber}`;
    const values = [[status]];

    try {
      await api.post(`/api/sheets/${sheetId}/update`, {
        sheetName: "Sheet1",
        range,
        values,
      });
      // Optimistically update the local state
      const updatedSheetData = sheetData.map((row, i) => {
        if (i === rowIndex + 1) {
          const updatedRow = [...row];
          updatedRow[columnIndex] = status;
          return updatedRow;
        }
        return row;
      });
      setSheetData(updatedSheetData);
    } catch (error) {
      console.error("Error updating attendance:", error);
      setError("Failed to update attendance.");
      // Optionally, revert the local state on error
      fetchAttendanceData();
    }
  };

  const navigateDays = (direction) => {
    if (direction === "next") {
      if (startDateIndex + visibleDays < dates.length) {
        setStartDateIndex(startDateIndex + 1);
      }
    } else if (direction === "prev") {
      if (startDateIndex > 0) {
        setStartDateIndex(startDateIndex - 1);
      }
    }
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  if (loading) {
    return (
      <div className="p-4">
        <Skeleton className="h-6 w-1/3 mb-4" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (!sheetData.length) {
    return <div className="p-4 text-gray-500">No attendance data available.</div>;
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <h2 className="text-lg font-semibold">Attendance Sheet</h2>
      </CardHeader>
      <CardContent className="overflow-x-auto p-0">
        {dates.length > visibleDays && (
          <div className="flex justify-between mb-2">
            <Button variant="ghost" size="icon" onClick={() => navigateDays("prev")}>
              <ChevronsLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigateDays("next")}>
              <ChevronsRight className="h-5 w-5" />
            </Button>
          </div>
        )}
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              {dates
                .slice(startDateIndex, startDateIndex + visibleDays)
                .map((date) => (
                  <th
                    key={date.toISOString()}
                    className={`py-2 px-4 border-b ${isToday(date) ? "bg-blue-100 font-semibold" : ""}`}
                  >
                    {format(date, "EEE")}
                    <br />
                    {format(date, "d")}
                    <br />
                    {format(date, "MMM")}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {sheetData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="py-2 px-4 border-b">{row[0]}</td>
                {dates
                  .slice(startDateIndex, startDateIndex + visibleDays)
                  .map((date, dateIndex) => {
                    const attendanceValue = row[dateIndex + 1] || "";
                    return (
                      <td key={date.toISOString()} className="py-2 px-4 border-b text-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    {attendanceValue || "Select"}{" "}
                                    <CalendarIcon className="ml-2 h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                  {[
                                    ...new Set([
                                      "Present",
                                      "Absent",
                                      "Late",
                                      "Half Day",
                                      ...attendanceStatuses,
                                    ]),
                                  ].map((status) => (
                                    <DropdownMenuItem
                                      key={status}
                                      onClick={() => handleAttendanceChange(rowIndex, dateIndex, status)}
                                      className="flex items-center gap-2"
                                    >
                                      {statusIcons[status] || "•"} {status}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Mark attendance</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </td>
                    );
                  })}
              </tr>
            ))}
          </tbody>
        </table>
        {dates.length > visibleDays && (
          <div className="flex justify-between mt-2">
            <Button variant="ghost" size="icon" onClick={() => navigateDays("prev")}>
              <ChevronsLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigateDays("next")}>
              <ChevronsRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceSheetView;
