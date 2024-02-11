import { User } from '../types/interfaces';

export let users: User[] = [];

export const deleteUsers = (userId: string) => {
  users = users.filter((user) => user.id !== userId);
};
