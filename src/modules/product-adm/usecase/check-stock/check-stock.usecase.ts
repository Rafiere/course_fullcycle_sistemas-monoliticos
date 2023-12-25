import ProductGateway from "../../gateway/product.gateway";
import UseCaseInterface from "../../../@shared/domain/entity/use-case/use-case.interface";
import {CheckStockInputDto, CheckStockOutputDto} from "./check-stock.dto";

export default class CheckStockUsecase implements UseCaseInterface {

    private productRepository: ProductGateway;

    constructor(productRepository: ProductGateway) {
        this.productRepository = productRepository;
    }

    async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {

        const product = await this.productRepository.find(input.productId);

        return {
            productId: product.id.id,
            stock: product.stock
        }
    }
}
