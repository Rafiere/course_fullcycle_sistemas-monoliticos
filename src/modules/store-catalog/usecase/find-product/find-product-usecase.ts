import ProductGateway from "../../gateway/product.gateway";
import {FindProductInputDto, FindProductOutputDto} from "./find-product.dto";
import UseCaseInterface from "../../../@shared/domain/entity/use-case/use-case.interface";

export default class FindProductUsecase implements UseCaseInterface {

    constructor(private readonly productRepository: ProductGateway) {}

    async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {

        const product = await this.productRepository.find(input.id);

        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        }
    }
}
