import StoreCatalogFacadeInterface, {
    FindAllStoreCatalogFacadeOutputDto,
    FindStoreCatalogFacadeInputDto,
    FindStoreCatalogFacadeOutputDto
} from "./store-catalog.facade.interface";
import FindProductUsecase from "../usecase/find-product/find-product-usecase";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";

export interface UseCaseProps {
    findProductUsecase: FindProductUsecase;
    findAllUseCase: FindAllProductsUsecase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {

    private readonly findProductUsecase: FindProductUsecase;
    private readonly findAllUseCase: FindAllProductsUsecase;

    constructor(props: UseCaseProps) {
        this.findProductUsecase = props.findProductUsecase;
        this.findAllUseCase = props.findAllUseCase;
    }

    async find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {

        return await this.findProductUsecase.execute(id);
    }

    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {

        return await this.findAllUseCase.execute();
    }
}
