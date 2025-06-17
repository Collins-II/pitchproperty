import React, { FC } from "react";
import twFocusClass from "@/utils/twFocusClass";
import Link from "next/link";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  const handleClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav className={`nc-Pagination inline-flex space-x-2 text-base font-medium ${className}`}>
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`inline-flex w-10 h-10 items-center justify-center rounded-full 
        ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-gray-100"} 
        border border-gray-300 text-gray-700 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-700`}
      >
        &lt;
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => handleClick(page)}
            className={`inline-flex w-10 h-10 items-center justify-center rounded-full 
            ${currentPage === page ? "bg-primary-500 dark:bg-primary-300 text-white dark:text-slate-700" : "bg-white hover:bg-gray-100"} 
            border border-gray-300 text-gray-700 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-700 ${twFocusClass()}`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`inline-flex w-10 h-10 items-center justify-center rounded-full 
        ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-gray-100"} 
        border border-gray-300 text-gray-700 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-700`}
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;
