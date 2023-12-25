import {AddProductInputDto, AddProductOutputDto} from "./add-product.dto";
import Id from "../../../@shared/domain/entity/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import UseCaseInterface from "../../../@shared/domain/entity/use-case/use-case.interface";

export default class AddProductUsecase implements UseCaseInterface {

    private _productRepository: ProductGateway;

    constructor(productRepository: ProductGateway) {
        this._productRepository = productRepository;
    }

    async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {

        const props = {
            id: new Id(input.id),
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock
        }

        const product = new Product(props);

        /* Vamos adicionar o "Product". Essa adição poderia ser feita em
         * um banco de dados, uma API, um arquivo .txt e etc. */

        this._productRepository.add(product);

        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        };
    }
}
