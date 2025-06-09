import {useQuery, UseQueryResult} from "@tanstack/react-query";
import { getUsers } from "../api/userApi";
import {PageResponse, User} from "../types/types";

export const useUsers = (page: number, size: number = 5): UseQueryResult<PageResponse<User>, Error> => {
    return useQuery<PageResponse<User>, Error, PageResponse<User>, [string, number, number]>({
        queryKey: ["users", page, size],
        queryFn: () => getUsers(page, size),
        keepPreviousData: true,
    });
};
