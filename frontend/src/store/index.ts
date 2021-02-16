import { Writable, writable } from "svelte/store";
import type UsersManagement from "../api";

export const isUserLoggedIn: Writable<boolean> = writable(false);

export const currentUser: Writable<UsersManagement.ICurrentUser | null> = writable(null);