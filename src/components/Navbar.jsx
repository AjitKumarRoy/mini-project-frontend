import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "../assets/guest.png";
import {
  ShieldCheckIcon,
  ScaleIcon,
  InformationCircleIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  EyeIcon, // Import EyeIcon
} from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid"; // Import the hamburger icon
// import { HomeIcon } from "@heroicons/react/24/outline";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { HomeIcon } from "lucide-react"; // or wherever your icon is from
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { SpreadsheetContext } from "../contexts/SpreadsheetContext"; // Import the context
import api from "../api/api";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for the side menu
  const dropdownRef = useRef(null);
  const { user, logout, isAuthenticated } = useAuth();
  const [viewCount, setViewCount] = useState(0);
  const [spreadsheets, setSpreadsheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [spreadsheetToDelete, setSpreadsheetToDelete] = useState(null);
  const { needsRefresh, fetchAndUpdateSpreadsheets } =
    useContext(SpreadsheetContext);

  useEffect(() => {
    console.log("Navbar - isAuthenticated:", isAuthenticated);
    if (isAuthenticated) {
      // Only fetch if authenticated
      console.log("Navbar - Fetching spreadsheets...");
      fetchAndUpdateSpreadsheets(setSpreadsheets, setLoading);
    } else {
      console.log("Navbar - Not authenticated, clearing spreadsheets.");
      setSpreadsheets([]); // Clear spreadsheets if not authenticated
      setLoading(false);
    }
  }, [fetchAndUpdateSpreadsheets, needsRefresh, isAuthenticated]); // Re-run when needsRefresh changes

  async function fetchSpreadsheets() {
    try {
      const res = await api.get("/api/sheets/listSpreadSheets");
      setSpreadsheets(res.data.spreadsheets || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteClick = (spreadsheetId) => {
    setSpreadsheetToDelete(spreadsheetId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    setIsDeleteDialogOpen(false);
    setLoading(true);
    try {
      await api.delete(`/api/sheets/${spreadsheetToDelete}/deleteSpreadSheet`);
      fetchAndUpdateSpreadsheets(setSpreadsheets, setLoading); // Use the context function
    } catch (error) {
      console.error("Error deleting spreadsheet:", error);
      // Optionally display an error message to the user
    } finally {
      setLoading(false);
      setSpreadsheetToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setSpreadsheetToDelete(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        isMenuOpen === false
      ) {
        setIsOpen(false);
      }

      // Check if the side menu is open and the click is outside it
      const sideMenuElement = document.querySelector(".fixed.left-0"); // Target the side menu by its fixed and left-0 classes
      if (
        sideMenuElement &&
        isMenuOpen &&
        !sideMenuElement.contains(event.target) &&
        !document
          .querySelector('[aria-label="Open Menu"]')
          ?.contains(event.target) // Exclude the hamburger button itself
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef, isOpen, isMenuOpen]);

  useEffect(() => {
    const fetchViewCount = async () => {
      try {
        const response = await api.get("/api/view-counts");
        setViewCount(response.data.totalViews || 0);
      } catch (error) {
        console.error("Error fetching view count:", error);
      }
    };

    fetchViewCount();
  }, [user]);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const sideMenuVariants = {
    open: {
      x: 0,
      transition: { type: "tween", stiffness: 300, damping: 20 },
    },
    closed: {
      x: "-100%",
      transition: { type: "tween", stiffness: 300, damping: 20 },
    },
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.15, ease: "easeOut" },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.1, ease: "easeIn" } },
  };

  const menuItemVariants = {
    initial: { opacity: 0, y: -5 },
    animate: { opacity: 1, y: 0 },
    hover: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      scale: 1.02,
      transition: { duration: 0.1 },
    },
    tap: { scale: 0.98 },
  };

  const logoutButtonVariants = {
    hover: { backgroundColor: "#dc2626" },
    tap: { scale: 0.95 },
  };

  const signInButtonVariants = {
    hover: { backgroundColor: "#3b82f6" },
    tap: { scale: 0.95 },
  };

  const viewCountVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2, delay: 0.1 },
    },
  };

  return (
    <div>
      <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg py-1 px-6 w-full z-50 backdrop-blur-md relative">
        <div className="container mx-auto flex items-center justify-between">
          {/* Hamburger Menu */}
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="focus:outline-none mr-4"
              aria-label="Open Menu"
            >
              <Bars3Icon className="h-8 w-8 text-white" />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="text-1xl font-extrabold text-white tracking-wider absolute left-1/2 -translate-x-1/2"
            >
              EASY <span className="text-yellow-300">SHEETS</span>
            </Link>
          </div>

          {/* Profile Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none flex items-center gap-2"
              aria-label="User Menu"
            >
              <motion.img
                src={user?.profilePicture || logoImage}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-white hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </button>

            {/* Dropdown / Navigation Menu with AnimatePresence */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="absolute right-0 mt-3 w-64 bg-white text-gray-800 shadow-xl rounded-xl overflow-hidden z-[99999999]"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
                    <motion.img
                      src={user?.profilePicture || logoImage}
                      alt="Profile"
                      className="w-16 h-16 rounded-full mx-auto border-2 border-indigo-500 mb-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    <p className="text-center font-semibold text-lg text-gray-900">
                      {user?.name || "Guest"}
                    </p>
                    <p className="text-center text-sm text-gray-500 italic">
                      {user ? "Logged in" : "Guest User"}
                    </p>
                  </div>

                  {/* Premium Nav Links */}
                  <motion.ul
                    className="text-gray-700 font-medium"
                    initial="initial"
                    animate="animate"
                  >
                    <motion.li
                      className="px-5 py-3 hover:bg-gray-100 transition-colors cursor-pointer flex items-center gap-3"
                      variants={menuItemVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={closeDropdown}
                    >
                      <ShieldCheckIcon className="h-5 w-5 text-indigo-500" />
                      <Link to="/privacy-policy" className="block w-full">
                        <span className="text-indigo-700">Privacy</span> &
                        Security
                      </Link>
                    </motion.li>
                    <motion.li
                      className="px-5 py-3 hover:bg-gray-100 transition-colors cursor-pointer flex items-center gap-3"
                      variants={menuItemVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={closeDropdown}
                    >
                      <ScaleIcon className="h-5 w-5 text-blue-500" />
                      <Link to="/terms-of-service" className="block w-full">
                        Terms of <span className="text-blue-700">Service</span>
                      </Link>
                    </motion.li>
                    <motion.li
                      className="px-5 py-3 hover:bg-gray-100 transition-colors cursor-pointer flex items-center gap-3"
                      variants={menuItemVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={closeDropdown}
                    >
                      <InformationCircleIcon className="h-5 w-5 text-green-500" />
                      <Link to="/about" className="block w-full">
                        Learn <span className="text-green-700">About</span> Us
                      </Link>
                    </motion.li>
                    <motion.li
                      className="px-5 py-3 hover:bg-gray-100 transition-colors cursor-pointer flex items-center gap-3"
                      variants={menuItemVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={closeDropdown}
                    >
                      <ChatBubbleLeftRightIcon className="h-5 w-5 text-yellow-500" />
                      <Link to="/contact" className="block w-full">
                        Get in <span className="text-yellow-700">Touch</span>
                      </Link>
                    </motion.li>
                  </motion.ul>

                  {/* View Count Display at the Bottom */}
                  <motion.div
                    className="px-5 py-3 border-t border-gray-200 flex items-center gap-2 text-sm text-gray-600"
                    variants={viewCountVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <EyeIcon className="h-4 w-4 text-gray-500" />
                    <span>
                      Views: <span className="font-semibold">{viewCount}</span>
                    </span>
                  </motion.div>

                  <motion.div
                    className="px-5 py-3 border-t border-gray-200"
                    variants={menuItemVariants}
                  >
                    {user ? (
                      <motion.button
                        onClick={() => {
                          logout();
                          closeDropdown();
                        }}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition-colors font-semibold flex items-center justify-center gap-2"
                        variants={logoutButtonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        Sign Out
                      </motion.button>
                    ) : (
                      <Link to="/login" className="w-full focus:outline-none">
                        <motion.button
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors font-semibold flex items-center justify-center gap-2"
                          variants={signInButtonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          onClick={closeDropdown}
                        >
                          <UserIcon className="h-5 w-5" />
                          Sign In
                        </motion.button>
                      </Link>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Side Menu */}
        <motion.div
          className="fixed top-0 left-0 h-screen w-80 bg-white shadow-xl z-[99999998] p-6"
          variants={sideMenuVariants}
          animate={isMenuOpen ? "open" : "closed"}
          initial="closed"
        >
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleMenu}
              className="focus:outline-none"
              aria-label="Close Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Conditional Home Icon */}
          <div className="w-20">
            {(() => {
              const location = useLocation();
              if (
                location.pathname === "/create-spreadsheet" ||
                location.pathname.startsWith("/sheets") ||
                location.pathname === "/login" ||
                location.pathname === "/privacy-policy" ||
                location.pathname === "/terms-of-service" ||
                location.pathname === "/contact" ||
                location.pathname === "/about" 
              ) {
                return (
                  <div className="mb-4">
                    <Link
                      to="/"
                      onClick={toggleMenu}
                      className="flex items-center gap-2 transition-all duration-300 hover:scale-105"
                    >
                      <HomeIcon className="h-6 w-6 text-gray-700 hover:text-gray-900 transition-colors duration-200" />
                      <span className="text-sm font-medium bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
                        Home
                      </span>
                    </Link>
                  </div>
                );
              }
              return null;
            })()}
          </div>

          {user ? (
            <div>
              <h2 className="text-lg font-bold tracking-wide uppercase bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                Your Spreadsheets
              </h2>
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <Card className="bg-white shadow-lg rounded-xl">
                  {" "}
                  {/* Removed p-4 from here */}
                  <CardContent className="pb-2">
                    <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center justify-between">
                      Total Spreadsheets: {spreadsheets.length}
                    </h2>
                    {spreadsheets.length === 0 ? (
                      <p className="text-gray-500 text-center">
                        No spreadsheets found
                      </p>
                    ) : (
                      <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
                        {spreadsheets.map((sheet, index) => (
                          <div
                            key={sheet.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
                          >
                            <Link
                              to={`/sheets/${sheet.id}`}
                              className="flex-grow"
                              onClick={toggleMenu}
                            >
                              {index + 1}. {sheet.name}
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(sheet.id)}
                              className="ml-2 text-red-500 hover:text-red-700 focus:outline-none transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="text-gray-700">
              <h2 className="text-lg font-bold tracking-wide uppercase bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                Please sign in to view your spreadsheets.
              </h2>
            </div>
          )}
          <h2 className="mt-6 text-lg font-bold tracking-wide uppercase bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
            Google Sheets made Easy.
          </h2>
        </motion.div>
      </nav>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="z-[999999999] max-w-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="mb-4">
            Are you sure you want to delete this spreadsheet? This action cannot
            be undone.
          </p>
          <DialogFooter>
            <Button variant="secondary" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Navbar;
