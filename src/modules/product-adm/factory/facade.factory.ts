/* Essa classe servirá para criarmos a facade desse módulo, assim, quem
* for usar essa facade não precisará saber como criar esse objeto, apenas
* utilizará a factory, que fará essa criação automaticamente. */

import ProductRepository from "../repository/product.repository";
import AddProductUsecase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacade from "../facade/product-adm.facade";

export default class ProductAdmFacadeFactory {

    static create(){
        const productRepository = new ProductRepository();
        const addProductUseCase = new AddProductUsecase(productRepository);

        return new ProductAdmFacade({
            addProductUseCase: addProductUseCase,
            checkStockUseCase: undefined
        });
    }
}
