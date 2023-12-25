/* Essa classe servirá para criarmos a facade desse módulo, assim, quem
* for usar essa facade não precisará saber como criar esse objeto, apenas
* utilizará a factory, que fará essa criação automaticamente. */

import ProductRepository from "../repository/product.repository";
import AddProductUsecase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacade from "../facade/product-adm.facade";
import CheckStockUsecase from "../usecase/check-stock/check-stock.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecase";

export default class ProductAdmFacadeFactory {

    static create(){
        const productRepository = new ProductRepository();
        const addProductUseCase = new AddProductUsecase(productRepository);
        const findProductUseCase = new FindProductUsecase(productRepository);
        const checkStockUseCase = new CheckStockUsecase(productRepository);

        return new ProductAdmFacade({
            addProductUseCase: addProductUseCase,
            findProductUseCase: findProductUseCase,
            checkStockUseCase: checkStockUseCase
        });
    }
}
