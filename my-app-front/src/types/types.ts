export interface User {
    id: number;
    name: string;
    email: string;
    age: string;
    phone: string;
    role: string;
    password: string;
}

export interface PageResponse<T>{
    content:T[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
    last: number;
    first: number;
}
