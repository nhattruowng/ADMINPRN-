import {useDispatch} from "react-redux";
import {useMutation} from "@tanstack/react-query";
import {LoginApi, RegisterApi} from "../api/AuthenticationApi.ts";
import type {LoginDto, RegisterDto, RegisterRespont} from "../modole/AuthenDTO.ts";
import type {User} from "../modole/User.ts";
import type {ExceptionResponse} from "../modole/AuthenticationRespont.ts";
import {setUser} from "../store/userSlice.ts.ts";


export const useLogin = () => {
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: async ({email, password}: LoginDto): Promise<User | ExceptionResponse> => await LoginApi({
            email,
            password
        }),
        onSuccess: (data: User | ExceptionResponse) => {

            if ("accessToken" in data) {
                if (data as User && data.role === "Admin") {
                    dispatch(setUser(data));
                    alert("Login successful");
                } else {
                    alert("Tai khoan k phai admin");
                }
            } else {
                alert("dang nhap that bai")
            }

        },

        onError: () => {
            alert("Lỗi kết nối máy chủ hoặc sai định dạng dữ liệu");
        },
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn:
            async ({email, password}: RegisterDto):
                Promise<RegisterRespont | ExceptionResponse> => await RegisterApi({
                email,
                password
            }),
        onSuccess: () => {
            console.log("register success");
        },
        onError: () => {
            console.log("register error");
        }

    })
}