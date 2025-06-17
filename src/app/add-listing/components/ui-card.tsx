import React, { FC } from "react";

interface ShadCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  selected?: boolean;
}

export const ShadCard: FC<ShadCardProps> = ({
  children,
  onClick,
  className = "",
  selected = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`border rounded-xl p-4 shadow hover:shadow-lg transition-all cursor-pointer ${
        selected ? "border-blue-500" : "border-neutral-200"
      } ${className}`}
    >
      {children}
    </div>
  );
};

interface ShadCardContentProps {
  title: string;
  description?: string;
  thumbnail?: string;
}

export const ShadCardContent: FC<ShadCardContentProps> = ({
  title,
  description,
  thumbnail,
}) => {
  return (
    <div className="flex items-center space-x-4">
      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          className="w-12 h-12 rounded-full object-cover"
        />
      )}
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        {description && <p className="text-sm text-neutral-500">{description}</p>}
      </div>
    </div>
  );
};
