import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, User, Mail, Sun, Moon, Folder } from 'lucide-react';
import AppContext from '../context/AppContext';

const navItems = [
    { icon: Home, label: 'Home', href: '#hero' },
    { icon: Folder, label: 'Projects', href: '#projects' },
    { icon: Briefcase, label: 'Skills', href: '#experience-skills' },
    { icon: Mail, label: 'Contact', href: '#contact' },
];

function Navbar() {
    const { darkMode, toggleDark } = useContext(AppContext);

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-auto">
            <motion.nav
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="glass-card px-6 py-3 rounded-2xl flex items-center gap-4 shadow-2xl ring-1 ring-white/20 dark:ring-white/10"
            >
                {navItems.map((item) => (
                    <NavItem key={item.label} item={item} />
                ))}
            </motion.nav>
        </div>
    );
}

function NavItem({ item }) {
    return (
        <a
            href={item.href}
            onClick={(e) => { e.preventDefault(); document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' }); }}
            className="relative group p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
            <item.icon size={24} className="text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
            </span>
        </a>
    );
}

export default Navbar;
