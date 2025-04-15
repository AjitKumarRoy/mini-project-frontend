import React, { useState, useEffect, useContext } from "react";
import api from '../api/api';
import { useNavigate } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { SpreadsheetContext } from "../contexts/SpreadsheetContext"; // Import the context

const AttendanceTrackerTemplate = () => {
    const navigate = useNavigate();
    const [internalSpreadsheetName, setInternalSpreadsheetName] = useState("");
    const [attendees, setAttendees] = useState("");
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [attendanceStatuses, setAttendanceStatuses] = useState([
        { label: "Present", active: true },
        { label: "Absent", active: true },
        { label: "Late", active: true },
        { label: "Half Day", active: false },
    ]);
    const [newStatus, setNewStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setNeedsRefresh } = useContext(SpreadsheetContext); // Get the setter function

    const spreadsheetName = `Attendance-${internalSpreadsheetName}`;

    useEffect(() => {
        document.getElementById("spreadsheetName")?.focus();
        setInternalSpreadsheetName(""); // Initialize without the prefix
    }, []);

    useEffect(() => {
        if (toDate < fromDate) {
            setToDate(fromDate);
        }
    }, [fromDate]);

    const handleStatusToggle = (label) => {
        setAttendanceStatuses((prevStatuses) =>
            prevStatuses.map((status) =>
                status.label === label ? { ...status, active: !status.active } : status
            )
        );
    };

    const handleAddStatus = () => {
        const trimmedStatus = newStatus.trim();
        if (trimmedStatus && !attendanceStatuses.some(s => s.label.toLowerCase() === trimmedStatus.toLowerCase())) {
            setAttendanceStatuses((prevStatuses) => [
                ...prevStatuses,
                { label: trimmedStatus, active: true },
            ]);
            setNewStatus("");
        }
    };

    const handleCreateSpreadsheet = async () => {
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);

        const attendeeList = attendees.split(",").map(a => a.trim());
        const activeStatuses = attendanceStatuses.filter(s => s.active).map(s => s.label);

        // Generate date columns
        const dates = [];
        let currentDate = new Date(fromDate);
        while (currentDate <= toDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Prepare column headers
        const headers = ["Name", ...dates.map(date => date.toLocaleDateString()), ...activeStatuses];

        try {
            const response = await api.post(
                "/api/sheets/createSpreadSheet",
                { title: spreadsheetName }
            );
            const { spreadsheetId } = response.data;

            // Write headers
            await api.post(`/api/sheets/${spreadsheetId}/writeBoldText`, {
                sheetName: "Sheet1",
                range: `A1:${String.fromCharCode(64 + headers.length)}1`,
                values: [headers],
            });

            // Optionally, you might want to write attendee names in the first column
            const attendeeRows = attendeeList.map(attendee => [attendee]);
            if (attendeeRows.length > 0) {
                await api.post(`/api/sheets/${spreadsheetId}/append`, {
                    sheetName: "Sheet1",
                    range: `A2:A${attendeeList.length + 1}`,
                    values: attendeeRows,
                });
            }

            console.log("Spreadsheet created successfully!", spreadsheetId);
            setNeedsRefresh(true); // Trigger the refresh in Navbar
            navigate(`/sheets/${spreadsheetId}`);
        } catch (error) {
            console.error("Error creating spreadsheet:", error);
            // Optionally, display an error message
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = internalSpreadsheetName && attendees.trim() !== "";

    return (
        <div className="bg-gray-100 pt-20 pb-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Attendance Tracker</h2>

                <div className="mb-4">
                    <Label htmlFor="spreadsheetName" className="block text-gray-700 text-sm font-bold mb-2">
                        Spreadsheet Name
                    </Label>
                    <Input
                        type="text"
                        id="spreadsheetName"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={internalSpreadsheetName}
                        onChange={(e) => setInternalSpreadsheetName(e.target.value)}
                        placeholder="e.g., Class A"
                    />
                    <p className="text-gray-500 text-xs mt-1">Will be saved as: {`Attendance-${internalSpreadsheetName}`}</p>
                </div>

                <div className="mb-4">
                    <Label htmlFor="attendees" className="block text-gray-700 text-sm font-bold mb-2">
                        Attendees (comma-separated)
                    </Label>
                    <Input
                        type="text"
                        id="attendees"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="e.g., Alice, Bob, Charlie"
                        value={attendees}
                        onChange={(e) => setAttendees(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <Label className="block text-gray-700 text-sm font-bold mb-2">
                        Attendance Duration
                    </Label>
                    <div className="flex items-center space-x-2">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <div>
                                <Label htmlFor="fromDate" className="block text-gray-700 text-xs font-bold mb-1">
                                    From
                                </Label>
                                <DatePicker
                                    value={fromDate}
                                    onChange={(newValue) => setFromDate(newValue)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="toDate" className="block text-gray-700 text-xs font-bold mb-1">
                                    To
                                </Label>
                                <DatePicker
                                    value={toDate}
                                    onChange={(newValue) => setToDate(newValue)}
                                />
                            </div>
                        </LocalizationProvider>
                    </div>
                </div>

                <div className="mb-4">
                    <Label className="block text-gray-700 text-sm font-bold mb-2">
                        Attendance Status
                    </Label>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        {attendanceStatuses.map((status) => (
                            <Button
                                key={status.label}
                                variant={status.active ? "default" : "outline"}
                                className={`rounded-full text-sm ${
                                    status.active
                                        ? "bg-blue-500 text-white hover:bg-blue-600"
                                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                } flex items-center space-x-1`}
                                onClick={() => handleStatusToggle(status.label)}
                            >
                                {status.label}
                                {status.active && <X className="w-3 h-3" />}
                            </Button>
                        ))}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Input
                            type="text"
                            placeholder="E.g., Work From Home"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                        />
                        <Button size="sm" onClick={handleAddStatus}>
                            Add
                        </Button>
                    </div>
                </div>

                <Button
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full font-semibold rounded-md py-2 text-sm transition duration-200 ${
                        isFormValid && !isSubmitting
                            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                    onClick={handleCreateSpreadsheet}
                >
                    {isSubmitting ? "Creating..." : "Create Spreadsheet"}
                </Button>
            </div>
        </div>
    );
};

export default AttendanceTrackerTemplate;