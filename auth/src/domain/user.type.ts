import { UUID } from "./uuid.type";

export type User = {
    systemId: UUID;
    username: string;
    password?: string;
}