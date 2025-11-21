import React from 'react';

export default function Footer() {
    return (
        <footer className="py-8 border-t border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} Erick Caballero. All rights reserved.
                </p>
                <p className="text-gray-600 text-xs">
                    Designed with <span className="text-indigo-500">♥</span> in the Void.
                </p>
            </div>
        </footer>
    );
}
