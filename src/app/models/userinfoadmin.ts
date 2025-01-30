import { Talk } from "./createtalk";
import { User } from "./user";

export class UserInfoAdmin{
    constructor(
        public usuario: User,
        public charlas: Array<Talk>
    ){}
}