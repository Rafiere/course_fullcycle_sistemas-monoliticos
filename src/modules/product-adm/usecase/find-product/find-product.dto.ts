import Id from "../../../@shared/domain/entity/value-object/id.value-object";

export interface FindProductInputDto {
    id: string;
}

export interface FindProductOutputDto {
    id: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}
