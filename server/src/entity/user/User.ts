import {BaseEntity} from "@/entity/BaseEntity";
import {Entity, Property, Unique} from "@mikro-orm/core";

@Entity({tableName:"users"})
export class User extends BaseEntity {
    @Property({columnType:"text"})
    @Unique()
    username!: string;


    @Property({columnType:"text"})
    @Unique()
    email!: string;

    @Property({columnType:"text"})
    password!: string;

    @Property({columnType:"date", nullable:true})
    lastLoginAt?: Date;
}