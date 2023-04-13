import {BigIntType, PrimaryKey, Property} from "@mikro-orm/core";

export abstract class BaseEntity {
    @PrimaryKey({type: BigIntType})
    id!: string;

    @Property({columnType: "int"})
    createdAt: number = Date.now();

    @Property({columnType: "int", onUpdate: () => Date.now()})
    updatedAt: number = Date.now();
}