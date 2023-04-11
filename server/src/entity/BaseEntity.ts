import {BigIntType, PrimaryKey, Property} from "@mikro-orm/core";

export abstract class BaseEntity {
    @PrimaryKey({type: BigIntType})
    id!: string;

    @Property({columnType: "date"})
    createdAt: Date = new Date();

    @Property({columnType: "date", onUpdate: () => new Date()})
    updatedAt: Date = new Date();
}