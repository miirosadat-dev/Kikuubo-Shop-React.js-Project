// Turns (current 5, total 12) into [1, "gap-4", 4, 5, 6, "gap-12", 12]
const getPageItems = (current, total) => {
    const wanted = [1, current - 1, current, current + 1, total]
        .filter((p) => p >= 1 && p <= total)
        .sort((a, b) => a - b);

    const unique = [...new Set(wanted)];
    const items = [];
    unique.forEach((page, index) => {
        if (index > 0 && page - unique[index - 1] > 1) items.push(`gap-${page}`);
        items.push(page);
    });
    return items;
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <nav
            aria-label="Pagination"
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
            <button
                type="button"
                className="btn btn-outline btn-sm"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </button>

            {getPageItems(currentPage, totalPages).map((item) =>
                typeof item === "string" ? (
                    <span key={item} className="px-1 text-gray-400">
                        ...
                    </span>
                ) : (
                    <button
                        key={item}
                        type="button"
                        onClick={() => onPageChange(item)}
                        aria-current={item === currentPage ? "page" : undefined}
                        className={`btn btn-sm min-w-9 ${item === currentPage ? "btn-primary" : "btn-outline"
                            }`}
                    >
                        {item}
                    </button>
                ),
            )}

            <button
                type="button"
                className="btn btn-outline btn-sm"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </nav>
    );
};

export default Pagination;