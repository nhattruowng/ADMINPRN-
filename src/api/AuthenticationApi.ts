import type {User} from "../modole/User.ts";
import type {ExceptionResponse} from "../modole/AuthenticationRespont.ts";
import type {LoginDto, RegisterDto, RegisterRespont, UserRoleDto} from "../modole/AuthenDTO.ts";
import {CURRENT_USER, DELETE_USER, GET_USER, LOGIN, REGISTER, USER_ROLE} from "./EndPoint.ts";
import api from "./api.ts";

export const LoginApi = async ({email, password}: LoginDto): Promise<User | ExceptionResponse> => {
    const res = await api.post(LOGIN, {
        email,
        password
    })
    return res.data.data as User;
}

export const RegisterApi = async ({email, password}: RegisterDto): Promise<RegisterRespont | ExceptionResponse> => {
    const res = await api.post(REGISTER, {
        email: email,
        password: password
    })
    console.log(res.data)
    return res.data;
}


export const CurrentUserApi = async (token: string): Promise<any> => {
    const res = await api.get(CURRENT_USER, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        }
    })
    return res.data;
}

export const DeleteUserApi = async (id: string): Promise<any> => {
    const res = await api.delete(`${DELETE_USER}/${id}`, {
        headers: {
            Accept: "application/json"
        }
    })
    return res.data;
}

export const GetUserApi = async (id: string): Promise<any> => {
    const res = await api.get(`${GET_USER}/${id}`, {
        headers: {
            Accept: "application/json"
        }
    })
    return res.data;
}

export const UserRoleApi = async ({email, roleName}: UserRoleDto): Promise<ExceptionResponse> => {
    const res = await api.post(USER_ROLE, {
        email,
        roleName,
        header: {
            Accept: "application/json"
        }
    })
    return res.data;
}