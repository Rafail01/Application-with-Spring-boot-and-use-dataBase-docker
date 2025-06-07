import React from "react";
import { useUsers } from "./hooks/useUsers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {UserList} from "./components/UserList";

const queryClient = new QueryClient();


const App = () => (
    <QueryClientProvider client={queryClient}>
        <UserList />
    </QueryClientProvider>
);

export default App;
