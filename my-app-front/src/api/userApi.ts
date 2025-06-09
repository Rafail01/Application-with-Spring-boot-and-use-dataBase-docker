import axios from "axios";
import {PageResponse, User} from "../types/types";

const API_URL = "/users";

export const getUsers = async (page: number = 0, size: number = 5): Promise<PageResponse<User>> => {
    const response = await axios.get(`${API_URL}?page=${page}&size=${size}&sort=id,asc`);
    return response.data;
};

export const updateUser = async (id: number, userData: { name: string; email: string; password: string; age: string; phone: string; role: string }) => {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
};

export const deleteUser = async (id: number) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
}

export const createUser = async (userData: { name: string; email: string; password: string; age: string; phone: string ; role: string}) => {
    const response = await axios.post(API_URL, userData);
    return response.data;
};