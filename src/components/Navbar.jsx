// src/components/Navbar.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Sun, Moon, Menu as MenuIcon, X, User, Code, Briefcase, TrendingUp, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AppContext from '../context/AppContext'; // Adjust path as needed

const navItems = [
    { label: 'Home', href: '#hero', icon: <User size={18} /> },
    { label: 'Projects', href: '#projects', icon: <Code size={18} /> },
    { label: 'About', href: '#about', icon: <Briefcase size={18} /> },
    { label: 'Journey', href: '#experience-skills', icon: <TrendingUp size={18} /> },
    { label: 'Contact', href: '#contact', icon: <MessageSquare size={18} /> },
];

function Navbar() {
    const { darkMode, toggleDark } = useContext(AppContext);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -60% 0px" }
        );

        navItems.forEach(item => {
            const element = document.querySelector(item.href);
            if (element) observer.observe(element);
        });

        const handleScroll = () => {
            setHasScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const NavLink = ({ href, label, icon, isMobile = false }) => (
        <a
            key={href}
            href={href}
            onClick={(e) => {
                e.preventDefault();
                if (isMobile) setMobileMenuOpen(false);
                document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out
        ${activeSection === href.substring(1)
                ? 'bg-blue-600 text-white shadow-md dark:bg-blue-500'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-blue-600 dark:hover:text-blue-400'
            }
        ${isMobile ? 'w-full justify-start text-base py-3' : 'hover:scale-105 transform'} 
      `}
        >
            {icon}
            <span>{label}</span>
        </a>
    );

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ease-in-out 
        ${hasScrolled ? 'backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 shadow-xl' : 'bg-transparent dark:bg-transparent shadow-none'}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
                <a href="#hero" onClick={(e) => { e.preventDefault(); document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' }); }}
                   className="font-bold text-3xl text-gray-900 dark:text-white transition-colors hover:opacity-80">
                    Erick<span className="text-blue-600 dark:text-blue-400">.</span>
                </a>
                <div className="hidden md:flex items-center space-x-1">
                    {navItems.map(item => (
                        <NavLink key={item.href} href={item.href} label={item.label} icon={item.icon} />
                    ))}
                    <button
                        onClick={toggleDark}
                        aria-label="Toggle Dark Mode"
                        className="p-2.5 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                    >
                        {darkMode ? <Sun size={22} /> : <Moon size={22} />}
                    </button>
                </div>
                <div className="flex items-center md:hidden space-x-2">
                    <button
                        onClick={toggleDark}
                        aria-label="Toggle Dark Mode"
                        className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                    >
                        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                    </button>
                    <button
                        onClick={() => setMobileMenuOpen(o => !o)}
                        aria-label="Toggle Menu"
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-menu"
                        className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                    >
                        {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2, ease: "circOut" }}
                        className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg"
                    >
                        <div className="px-3 pt-3 pb-4 space-y-2">
                            {navItems.map(item => (
                                <NavLink key={item.href} href={item.href} label={item.label} icon={item.icon} isMobile={true} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;
