import axios from "axios";

const API_URL = "/users";

export const getUsers = async () => {
    const response = await axios.get(API_URL);
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