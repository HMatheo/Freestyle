import {BaseEntity} from "@/entities/BaseEntity";
import {BigIntType, Entity, Property, Unique} from "@mikro-orm/core";

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

    @Property({type:BigIntType, nullable:true})
    lastLoginAt?: number;
}