import ProductGateway from "../../gateway/product.gateway";
import UseCaseInterface from "../../../@shared/domain/entity/use-case/use-case.interface";
import {FindProductInputDto, FindProductOutputDto} from "./find-product.dto";
import Id from "../../../@shared/domain/entity/value-object/id.value-object";

export default class FindProductUsecase implements UseCaseInterface {

    private _productRepository: ProductGateway;

    constructor(productRepository: ProductGateway) {
        this._productRepository = productRepository;
    }

    async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {

        const product = await this._productRepository.find(input.id);

        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        }
    }
}
