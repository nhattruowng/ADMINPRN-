export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
}

type RoleName = "Admin" | "Member" | "Coach";
export interface UserRoleDto {
    email: string;
    roleName: RoleName;
}

export interface RegisterRespont {
    id: string;
    fullName:string;
    email:string;
}