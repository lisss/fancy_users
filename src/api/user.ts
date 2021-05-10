import { fetchData } from './commmon';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    postCode: string;
    title: string;
}

const USERS_ENDPOINT = 'users';

export const getUsers = () => fetchData<User[]>(USERS_ENDPOINT);

export const updateUser = (id: number, data: Partial<User>) =>
    fetchData<User>(`${USERS_ENDPOINT}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });
