export interface AddProductFacadeInputDto {
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export interface FindProductFacadeInputDto {
    id: string;
}

export interface FindProductFacadeOutputDto {
    id: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CheckStockFacadeInputDto {
    productId: string;
}

export interface CheckStockFacadeOutputDto {
    productId: string;
    stock: number;
}

export default interface ProductAdmFacadeInterface {

    /* Todos os módulos que quiserem conversar com o módulo "product-adm"
    * deverão utilizar essa facade. */

    addProduct(input: AddProductFacadeInputDto): Promise<void>;
    findProduct(id: FindProductFacadeInputDto): Promise<FindProductFacadeOutputDto>;
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeInputDto>;
}
