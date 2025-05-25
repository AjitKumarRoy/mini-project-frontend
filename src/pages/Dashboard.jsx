import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/solid";
import {
  CalendarDaysIcon,
  CurrencyDollarIcon,
  PresentationChartLineIcon,
  GiftIcon,
  CubeIcon,
  ChartPieIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

const iconMap = {
  calendar: CalendarDaysIcon,
  "currency-dollar": CurrencyDollarIcon,
  timeline: PresentationChartLineIcon,
  "party-popper": GiftIcon,
  package: CubeIcon,
  "chart-pie": ChartPieIcon,
  "check-circle": CheckCircleIcon,
};

const templates = [
  {
    title: "Attendance Tracker",
    description: "Track attendance easily.",
    id: "attendance-tracker", // Changed id to a string
    icon: "calendar",
  },
  {
    title: "Expense Sheet",
    description: "Manage your finances.",
    id: 2,
    icon: "currency-dollar",
  },
  {
    title: "Project Timeline",
    description: "Plan project milestones.",
    id: 3,
    icon: "timeline",
  },
  {
    title: "Event Planner",
    description: "Organize your events.",
    id: 4,
    icon: "party-popper",
  },
  {
    title: "Inventory Sheet",
    description: "Track your stock.",
    id: 5,
    icon: "package",
  },
  {
    title: "Budget Planner",
    description: "Plan your budget.",
    id: 6,
    icon: "chart-pie",
  },
  {
    title: "Task Manager",
    description: "Manage your tasks.",
    id: 7,
    icon: "check-circle",
  },
];

const Dashboard = () => {
  const carouselRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setMounted(true);
  }, []);

  const createNewCard = {
    title: "New Spreadsheet",
    description: "Start from a blank sheet.",
    id: "create-new",
    isCreateNew: true,
  };

  const allItems = [createNewCard, ...templates];

  const handleUseTemplate = (templateId) => {
    if (templateId === "attendance-tracker") {
      navigate("/attendance-tracker"); // Navigate to the Attendance Tracker template route
    } else {
      // Handle navigation for other templates if needed
      console.log(`Using template: ${templateId}`);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center p-6 pt-10 min-h-screen">
      {/* Main content area */}
      <div className="flex-grow w-full max-w-6xl flex flex-col items-center">
        {/* Carousel */}
        <div className="w-full overflow-hidden">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scroll-smooth gap-6 px-4 py-4 scrollbar-hide"
          >
            {allItems.map((item, index) => {
              const IconComponent = iconMap[item.icon];
              return (
                <Card
                  key={item.id}
                  className={`w-[200px] min-w-[200px] flex-shrink-0 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform ${
                    mounted ? "animate-fadeInUp" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-5 flex flex-col h-full items-center justify-center text-center">
                    {item.isCreateNew ? (
                      <>
                        <div className="inline-flex items-center justify-center p-3 rounded-full bg-indigo-100 text-indigo-700 mb-3">
                          <PlusIcon className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {item.description}
                        </p>
                        <Link to="/create-spreadsheet" className="w-full">
                          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md py-2 text-sm transition duration-200">
                            Create
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <div className="mb-3 text-indigo-500">
                          {IconComponent ? (
                            <IconComponent className="h-10 w-10 mx-auto" />
                          ) : (
                            <span className="text-gray-400 text-xl">📊</span>
                          )}
                        </div>
                        <h3 className="text-md font-bold text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-700 mb-4">
                          {item.description}
                        </p>
                        <Button
                          variant="outline"
                          className="text-indigo-700 border-indigo-500 hover:bg-indigo-50 transition duration-200 text-sm px-3 py-1"
                          onClick={() => handleUseTemplate(item.id)} // Added onClick handler
                        >
                          Use
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer for Privacy Policy and Terms & Conditions */}
      <footer className="mt-auto mb-4 w-full max-w-6xl text-center text-gray-500 text-sm">
        <Link to="/privacy-policy" className="hover:underline mx-2">
          Privacy Policy
        </Link>
        {" | "}
        <Link to="/terms-conditions" className="hover:underline mx-2">
          Terms & Conditions
        </Link>
      </footer>
    </div>
  );
};

export default Dashboard;