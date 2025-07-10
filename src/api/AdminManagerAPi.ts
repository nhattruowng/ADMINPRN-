import type {PaginatedResponse} from "../modole/PaginatedResponse.ts";
import api from "./api.ts";
import {ADMIN_DASHBOARDS_API, ADMINMANAGER_API, BLOG_API, DELETE_USER, MEMBERSHIP_PACKAGE_API} from "./EndPoint.ts";
import type {PaginatedBlog} from "../modole/Blog.ts";
import type {BaseModlole} from "../modole/BaseModlole.ts";
import type {PaginatedPlans, PlanRequest} from "../modole/Plan.ts";
import type {PaginatedQuitPlanResponse} from "../modole/QuitPlan.ts";
import type {AdminDashBoards} from "../modole/AdminDashBoards.ts";

export const AdminManagerAPi = async (PageNumber: number, PageSize: number, token: string): Promise<PaginatedResponse> => {
    const res = await api.get(`${ADMINMANAGER_API}/Users?PageNumber=${PageNumber}&PageSize=${PageSize}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    return res.data;
}

export const DeleteUserApi = async (id: string, token: string) => {
    const res = await api.delete(`${DELETE_USER}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return res.data;
}

export const BlogManagerApi = async (PageNumber: number, PageSize: number, token: string): Promise<PaginatedBlog> => {
    const res = await api.get(`${ADMINMANAGER_API}/Blogs?PageNumber=${PageNumber}&PageSize=${PageSize}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return res.data;
}


export const approveBlogApi = async (id: string, token: string): Promise<BaseModlole<string>> => {
    const res = await api.patch(`${BLOG_API}/${id}/approve`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    return res.data;
}


export const rejectBlogApi = async (id: string, token: string): Promise<BaseModlole<string>> => {
    const res = await api.patch(`${BLOG_API}/${id}/reject`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    return res.data;
}

export const getMemberShipPackages = async (PageNumber: number, token: string): Promise<PaginatedPlans> => {
    const res = await api.get(`${ADMINMANAGER_API}/MemberShipPackages?PageNumber=${PageNumber}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return res.data;
}

export const createNewBlan = async (PlanRequest: PlanRequest, token: string): Promise<BaseModlole<string>> => {
    const res = await api.post(`${MEMBERSHIP_PACKAGE_API}`, PlanRequest, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    return res.data;
}


export const getAllQuitPlan = async (PageNumber: number, token: string): Promise<PaginatedQuitPlanResponse> => {
    const res = await api.get(`${ADMINMANAGER_API}/QuitPlans?PageNumber=${PageNumber}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return res.data;
}
export const getAdminDashboards = async (token: string): Promise<AdminDashBoards> => {
    const res = await api.get(`${ADMIN_DASHBOARDS_API}/summary`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return res.data;
}