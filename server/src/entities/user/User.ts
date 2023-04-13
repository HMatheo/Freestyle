import {BaseEntity} from "@/entities/BaseEntity";
import {Entity, Property, Unique} from "@mikro-orm/core";

@Entity({tableName:"users"})
export class User extends BaseEntity {
    @Property({columnType:"varchar"})
    @Unique()
    username!: string;


    @Property({columnType:"varchar"})
    @Unique()
    email!: string;

    @Property({columnType:"varchar"})
    password!: string;

    @Property({columnType:"int", nullable:true})
    lastLoginAt?: number;
}