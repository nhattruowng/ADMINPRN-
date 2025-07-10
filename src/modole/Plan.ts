export interface Plan {
    id: string;
    name: string;
    type: string;
    price: number;
    description: string;
    durationMonths: number;
    features: string;
}

export interface PaginatedPlans {
    items: Plan[];
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface PlanRequest {
    name: string;
    type: number;
    price: number;
    description: string;
    durationMonths: number;
    features: string;
}

