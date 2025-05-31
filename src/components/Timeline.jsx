// src/components/Timeline.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react'; // Default icon

const dotColors = {
    blue: 'bg-blue-500 dark:bg-blue-400',
    green: 'bg-green-500 dark:bg-green-400',
    purple: 'bg-purple-500 dark:bg-purple-400',
};

function Timeline({ title, items, icon, dotColor = "blue" }) {
    const IconComponent = icon || Briefcase;
    const currentDotColor = dotColors[dotColor] || dotColors.blue;
    // Dynamically create text color class. Tailwind needs full class names to purge CSS correctly,
    // so this approach might require ensuring these classes are present or using a safer method.
    // For simplicity here, we construct it. In a real app, consider mapping or predefining these.
    const iconTextColorClass = `text-${dotColor}-600 dark:text-${dotColor}-400`;


    return (
        <div className="py-12">
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white text-center mb-12 md:mb-16 flex items-center justify-center space-x-3">
                <IconComponent size={32} className={iconTextColorClass} />
                <span>{title}</span>
            </h3>
            {items.length > 0 ? (
                <div className="relative max-w-3xl mx-auto px-4">
                    <div className="absolute left-4 sm:left-1/2 top-2 w-1.5 h-[calc(100%-1rem)] bg-gray-300 dark:bg-gray-700 transform -translate-x-1/2 rounded-full"></div>

                    {items.map((item, idx) => (
                        <motion.div
                            key={idx}
                            className="mb-12 relative"
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <div className={`flex items-start ${idx % 2 === 0 ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
                                <div className={`absolute left-4 sm:left-1/2 top-1.5 w-5 h-5 rounded-full transform -translate-x-1/2 z-10 border-[5px] border-gray-100 dark:border-gray-800/30 ${currentDotColor} shadow-md`}></div>

                                <div className={`w-full sm:w-[calc(50%-2.5rem)] p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700/80 ${idx % 2 === 0 ? 'sm:mr-auto' : 'sm:ml-auto'}`}>
                                    <p className={`text-sm font-semibold text-${dotColor}-600 dark:text-${dotColor}-400 mb-1.5`}>{item.year}</p>
                                    <h4 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                                    <p className="text-md font-medium text-gray-600 dark:text-gray-300 mb-3">{item.org}</p>
                                    {item.details && <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.details}</p>}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600 dark:text-gray-400 text-lg">No entries yet for {title.toLowerCase()}.</p>
            )}
        </div>
    );
}

export default Timeline;
