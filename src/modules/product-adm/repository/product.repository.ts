import ProductGateway from "../gateway/product.gateway";
import Product from "../domain/product.entity";
import {ProductModel} from "./product.model";

export default class ProductRepository implements ProductGateway {

    /* Essa é a implementação do gateway, ou seja, estamos implementando como
    * os métodos abaixo, que foram definidos no "ProductGateway", acessarão o banco
    * de dados. */

    async add(product: Product): Promise<void> {

         await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        })
    }

    find(id: string): Promise<Product> {
        return Promise.resolve(undefined);
    }

}
