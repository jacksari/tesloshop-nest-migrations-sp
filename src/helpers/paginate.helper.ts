export interface PaginatedData<T> {
    current_page: number;
    data: T[];
    // first_page_url: string;
    from: number;
    last_page: number;
    // last_page_url: string;
    // links: { url: string | null; label: string; active: boolean }[];
    // next_page_url: string | null;
    // path: string;
    per_page: number;
    // prev_page_url: string | null;
    to: number;
    total: number;
}

export function pagination<T>(
    data: T[],
    page: number,
    perpage: number,
): PaginatedData<T> {
    const total = data.length > 0 ? data[0]['total'] : 0;
    const totalPages = Math.ceil(total / perpage);
    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    return {
        current_page: page,
        data,
        //   first_page_url: `${basePath}?page=1`,
        from: (page - 1) * perpage + 1,
        last_page: totalPages,
        //   last_page_url: `${basePath}?page=${totalPages}`,
        //   next_page_url: nextPage ? `${basePath}?page=${nextPage}` : null,
        //   path: basePath,
        per_page: perpage,
        //   prev_page_url: prevPage ? `${basePath}?page=${prevPage}` : null,
        to: (page - 1) * perpage + data.length,
        total: total,
    };
}