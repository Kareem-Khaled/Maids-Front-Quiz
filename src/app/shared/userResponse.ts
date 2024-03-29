import { User } from "./user";

export interface userResponse {
    data: User;
    support: {
        url: string,
        text: string
    }
}