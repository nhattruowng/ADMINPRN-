import {useState} from "react";
import {FcGoogle} from 'react-icons/fc';
import {Link, useNavigate} from "react-router-dom";
import {useLogin} from "../hooks/AuthenticationHooks.ts.ts";

const Login = () => {
    const [key, setKey] = useState("");
    const [password, setPassword] = useState("");
    const {mutate, isPending} = useLogin();
    const navigate = useNavigate();


    const handleLogin = () => {
        mutate({email: key, password: password}, {
            onSuccess: () => {
                setTimeout(() => navigate("/"), 1500)
            },
            onError: () => {
                alert("Login failed");
            }
        })
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center bg-white text-black h-screen">
                <div className="mx-auto w-full flex flex-col justify-center px-5 md:max-w-[50%] lg:max-w-[50%]">
                    <a className="mt-10 w-fit text-black" href="/">
                        <div className="flex items-center">
                            <svg
                                viewBox="0 0 320 512"
                                className="mr-3 h-[13px] w-[8px] text-black"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
                            </svg>
                            <p className="text-sm">Quay lại trang chủ</p>
                        </div>
                    </a>

                    <div
                        className="my-auto mt-8 flex flex-col w-[350px] max-w-[450px] mx-auto md:mt-[70px] lg:mt-[130px]">
                        <p className="text-[32px] font-bold">Đăng nhập</p>
                        <p className="my-2.5 font-normal">
                            Nhập email và mật khẩu để đăng nhập
                        </p>

                        <input type="hidden" name="provider" value="google"/>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center w-full h-10 px-4 py-6 text-sm font-medium border rounded-md border-gray-300 hover:bg-gray-100"
                        >
                            <FcGoogle className="mr-2 h-5 w-5"/>
                            Google
                        </button>

                        <div className="relative my-4">
                            <div className="flex items-center py-1 space-x-4">
                                <div className="grow border-t border-zinc-300"/>
                                <div className="grow border-t border-zinc-300"/>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    autoComplete="email"
                                    className="mt-1 mb-2 w-full min-h-[44px] rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm"
                                    onChange={event => setKey(event.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Mật khẩu</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Mật Khẩu"
                                    autoComplete="current-password"
                                    className="mt-1 w-full min-h-[44px] rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm"
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </div>
                            <button
                                onClick={handleLogin}
                                disabled={isPending}
                                type="button"
                                className="mt-2 flex items-center justify-center w-full rounded-lg bg-black text-white hover:bg-gray-800 px-4 py-4 text-sm font-medium"
                            >
                                {isPending ? "Xác thực ..." : "Đăng nhập"}
                            </button>
                        </div>

                        <div className="text-sm space-y-2">
                            <p>
                                <Link to="/" className="font-medium text-black">
                                    Quên mật khẩu?
                                </Link>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;