import React, { useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

type PaginationProps = {
    noOfPages: number;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    currentPage: number

}
const Pagination = ({
    noOfPages,
    goToNextPage,
    goToPreviousPage,
    currentPage
}: PaginationProps) => {
    return (
        <div className="flex items-center justify-center gap-4 mt-4">
            <button
                onClick={goToPreviousPage}
                className="p-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                disabled={currentPage == 1 }
            >
                <IoIosArrowBack />
            </button>

            <span className="px-4 py-2 border-gray-300 text-gray-500 rounded-lg shadow text-sm">
                Page {currentPage}
            </span>

            <button
                onClick={goToNextPage}
                className="p-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                disabled={currentPage == noOfPages}
            >
                <IoIosArrowForward />
            </button>
        </div>

    )
}

export default React.memo(Pagination)