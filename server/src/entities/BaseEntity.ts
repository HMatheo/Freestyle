import {BigIntType, PrimaryKey, Property} from "@mikro-orm/core";

export abstract class BaseEntity {
    @PrimaryKey({type: BigIntType})
    id!: string;

    @Property({type: BigIntType})
    createdAt: number = Date.now();

    @Property({type: BigIntType, onUpdate: () => Date.now()})
    updatedAt: number = Date.now();
}