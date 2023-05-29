import { type DefaultSession } from "next-auth";

export interface CustomSession extends DefaultSession {
    access_token: string
} 