import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { EyeIcon } from '@heroicons/react/24/outline';

const Footer = () => {
    const { user } = useAuth();
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
        const fetchViewCount = async () => {
            if (user) {
                try {
                    const response = await fetch('/api/users/views'); // Adjust API endpoint if needed
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setViewCount(data.viewCount || 0);
                } catch (error) {
                    console.error('Error fetching view count for footer:', error);
                    // Optionally set a default or error state
                }
            } else {
                setViewCount(0); // Reset if no user
            }
        };

        fetchViewCount();
    }, [user]);

    const footerVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] } },
    };

    const linkVariants = {
        hover: { color: "#a3b183" }, // A subtle light green/gray
        tap: { scale: 0.95 },
    };

    return (
        <motion.footer
            className="bg-gray-900 text-gray-400 py-6 px-6 shadow-inner"
            variants={footerVariants}
            initial="initial"
            animate="animate"
        >
            <div className="container mx-auto flex justify-between items-center text-sm md:text-base">
                <div className="flex items-center space-x-4">
                    <Link to="/about" className="hover:text-gray-300 transition-colors" variants={linkVariants} whileHover="hover" whileTap="tap">About</Link>
                    <Link to="/contact" className="hover:text-gray-300 transition-colors" variants={linkVariants} whileHover="hover" whileTap="tap">Contact</Link>
                    <Link to="/privacy-policy" className="hover:text-gray-300 transition-colors" variants={linkVariants} whileHover="hover" whileTap="tap">Privacy Policy</Link>
                    <Link to="/terms-of-service" className="hover:text-gray-300 transition-colors" variants={linkVariants} whileHover="hover" whileTap="tap">Terms of Service</Link>
                </div>

                {user && (
                    <div className="flex items-center space-x-2">
                        <EyeIcon className="h-4 w-4 text-gray-500" />
                        <span>{viewCount} Views</span>
                    </div>
                )}

                <div>
                    &copy; {new Date().getFullYear()} EasySheets. All rights reserved.
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;