import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    id: 1,
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

  return (
    <div className="bg-gray-100 flex flex-col items-center p-6 pt-10">
      {/* Carousel */}
      <div className="w-full max-w-6xl overflow-hidden">
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

      {/* Responsive image below carousel */}
      <div className="mt-10 w-full max-w-6xl px-4">
        <img
          src="https://storage.googleapis.com/files.cs-first.com/apski/examples/Optimized-Google-Workspace-Sheets-Part-1.png" // replace with your image URL
          alt="Dashboard Banner"
          className="w-full h-auto rounded-xl shadow-md object-cover"
        />
      </div>
    </div>
  );
};

export default Dashboard;
