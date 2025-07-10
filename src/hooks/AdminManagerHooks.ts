import {
    AdminManagerAPi,
    approveBlogApi,
    BlogManagerApi, createNewBlan,
    DeleteUserApi, getAdminDashboards, getAllQuitPlan,
    getMemberShipPackages,
    rejectBlogApi
} from "../api/AdminManagerAPi.ts";
import {useApiHandler} from "./useApiHandler.ts";

export const useAdminManagerUserHook = () => {
    return useApiHandler(AdminManagerAPi)
}

export const useDeleteUSer = () => {
    return useApiHandler(DeleteUserApi)
}

export const useGetBlogHook = () => {
    return useApiHandler(BlogManagerApi);
}

export const useApproveBlogApi = () => {
    return useApiHandler(approveBlogApi);
}

export const useRejectBlogApi = () => {
    return useApiHandler(rejectBlogApi);
}

export const useGetMemberShipPackages = () => {
    return useApiHandler(getMemberShipPackages)
}

export const useCreateNewBlan = () => {
    return useApiHandler(createNewBlan)
}

export const useGetAllQuitPlan = () => {
    return useApiHandler(getAllQuitPlan)
}

export const useGetAdminDashboards = () => {
  return useApiHandler(getAdminDashboards)
}