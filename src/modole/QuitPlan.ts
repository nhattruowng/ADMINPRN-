type HealthImpact = {
    cancerRiskReductionPercent: number;
    heartRiskReductionPercent: number;
    summary: string;
};

export interface QuitPlan {
    id: string;
    reason: string;
    startDate: string;
    targetDate: string;
    cigarettesPerDayBeforeQuit: number;
    yearsSmokingBeforeQuit: number;
    status: string;
    userId: string;
    packageId: string;
    packageName: string;
    adviceText: string | null;
    smokeFreeDays: number;
    healthImpact: HealthImpact;
}

export interface PaginatedQuitPlanResponse {
    items: QuitPlan[];
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}