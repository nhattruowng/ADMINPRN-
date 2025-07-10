import React from "react";

const Error: React.FC = () => {
    return (
        <>
            <section
                className="relative z-10 bg-primary py-[120px] bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url("/path/to/387ca669-8d2d-4820-a7d8-fb1e4ae29bc5.png")`,
                }}
            >
                <div className="container mx-auto">
                    <div className="-mx-4 flex">
                        <div className="w-full px-4">
                            <div className="mx-auto max-w-[400px] text-center bg-white bg-opacity-80 rounded-xl p-6">
                                <h2 className="mb-2 text-[50px] font-bold leading-none text-black sm:text-[80px] md:text-[100px]">
                                    404
                                </h2>
                                <h4 className="mb-3 text-[22px] font-semibold leading-tight text-black">
                                    Ôi không! Không tìm thấy trang bạn cần
                                </h4>
                                <p className="mb-8 text-lg text-black">
                                    Trang bạn đang tìm có thể đã bị xóa hoặc không tồn tại.
                                </p>
                                <a
                                    href="/"
                                    className="inline-block rounded-lg border border-black px-8 py-3 text-center text-base font-semibold text-black transition hover:bg-black hover:text-white"
                                >
                                    Quay về Trang chủ
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Error;