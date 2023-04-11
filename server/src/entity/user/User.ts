import {BaseEntity} from "@/entity/BaseEntity";
import {Entity, Property} from "@mikro-orm/core";

@Entity()
export class User extends BaseEntity {
    @Property({columnType:"text"})
    username: string;

    @Property({columnType:"text"})
    email: string;

    @Property({columnType:"text"})
    password: string;

    @Property({columnType:"date", nullable:true})
    lastLoginAt?: Date;
}