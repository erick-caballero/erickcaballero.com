// src/components/ui/Textarea.jsx
import React from 'react';

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
    <textarea
        className={`flex min-h-[120px] w-full rounded-lg border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50 transition-shadow ${className}`}
        ref={ref}
        {...props}
    />
));
Textarea.displayName = 'Textarea'; // Adding displayName

export default Textarea;
