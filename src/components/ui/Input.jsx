// src/components/ui/Input.jsx
import React from 'react';

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
    <input
        type={type}
        className={`flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50 transition-shadow ${className}`}
        ref={ref}
        {...props}
    />
));
Input.displayName = 'Input'; // Adding displayName for better debugging

export default Input;
