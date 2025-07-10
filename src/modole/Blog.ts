export interface Blog {
    id: string;
    title: string;
    content: string;
    featuredImageUrl: string;
    views: number;
    status: "Published" | "Pending" | "Rejected" | string;
    publishedDate: string;
    authorName: string;
    averageRating: number;
    commentsCount: number;
}
export interface PaginatedBlog {
    items: Blog[];
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}