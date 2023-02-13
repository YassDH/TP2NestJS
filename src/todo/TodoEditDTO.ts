import { TodoStatusEnum } from "./TodoStatusEnum";

export class TodoEditDTO {
    name: string;
    description: string;
    statut : TodoStatusEnum
}