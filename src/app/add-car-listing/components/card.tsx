import React, { FC } from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`border rounded-xl shadow-sm hover:shadow-md transition p-4 ${className}`}>
      {children}
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
}

export const CardContent: FC<CardContentProps> = ({ children }) => {
  return <div className="space-y-4">{children}</div>;
};
