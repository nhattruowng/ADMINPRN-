

interface User {
    id: string;
    fullName: string;
    email: string;
    userImage: string;
    roleName: string | null;
}
export interface PaginatedResponse {
    items: User[];
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}