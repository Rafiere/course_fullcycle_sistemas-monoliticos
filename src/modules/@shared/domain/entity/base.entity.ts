/* Todas as entidades terão esses valores. */

import Id from "./value-object/id.value-object";

export default class BaseEntity {

    private readonly _id: Id;
    private readonly _createdAt: Date;
    private readonly _updatedAt: Date;

    constructor(id?: Id, createdAt?: Date, updatedAt?: Date){
        this._id = id ?? new Id();
        this._createdAt = createdAt ?? new Date();
        this._updatedAt = createdAt ?? new Date();
    }

    get id(): Id {
        return this._id;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }
}
