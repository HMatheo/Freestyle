import {Entity, ManyToOne, Property} from "@mikro-orm/core";
import {BaseEntity, User} from "@/entities";

@Entity({ tableName: "messages" })
export class Message extends BaseEntity {
    @ManyToOne(() => User)
    author: User;

    @Property({ columnType: "text"})
    content: string;
}