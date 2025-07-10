
export interface AdminDashBoards {
    data:{
        totalUsers:number,
        newUsersThisMonth:number,
        totalBlogs:number,
        publishedBlogs:number,
        pendingBlogs:number,
        totalRatings:number,
        averageRating:number,
        totalQuitPlans:number,
        activeQuitPlans:number,
        completedQuitPlans:number,
        totalRevenue:number,
    }
    additionalData:string,
    message:string,
    statusCode:string,
    code:string,
}