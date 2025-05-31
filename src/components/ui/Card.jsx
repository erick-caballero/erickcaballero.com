// src/components/ui/Card.jsx
import React from 'react';

const Card = ({ className, children, ...props }) => (
    <div
        className={`rounded-xl border bg-card text-card-foreground shadow-lg dark:shadow-2xl ${className}`}
        {...props}
    >
        {children}
    </div>
);

export default Card;
