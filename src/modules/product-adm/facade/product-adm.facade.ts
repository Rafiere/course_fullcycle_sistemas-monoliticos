import ProductAdmFacadeInterface, {
    AddProductFacadeInputDto,
    CheckStockFacadeInputDto,
    CheckStockFacadeOutputDto,
    FindProductFacadeInputDto, FindProductFacadeOutputDto
} from "./product-adm.facade.interface";
import UseCaseInterface from "../../@shared/domain/entity/use-case/use-case.interface";

export interface UseCasesProps {
    addProductUseCase: UseCaseInterface;
    findProductUseCase: UseCaseInterface;
    checkStockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {

    /* Essa implementação da facade não será conhecida pelos outros módulos. Ela
    * chamará os casos de uso que já existem nesse módulo. */

    /* Essa facade terá tudo o que é necessário para executarmos a transação. */

    /* Caso queiramos implementar outro tipo de facade, desde que o contrato seja seguido, não terá
    * nenhum problema. */

    private addProductUseCase: UseCaseInterface;
    private findProductUseCase: UseCaseInterface;
    private checkStockUseCase: UseCaseInterface;

    constructor(useCasesProps: UseCasesProps) {
        this.addProductUseCase = useCasesProps.addProductUseCase;
        this.findProductUseCase = useCasesProps.findProductUseCase;
        this.checkStockUseCase = useCasesProps.checkStockUseCase;
    }

    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        return this.addProductUseCase.execute(input);
    }

    findProduct(input: FindProductFacadeInputDto): Promise<FindProductFacadeOutputDto> {
        return this.findProductUseCase.execute(input);
    }

    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this.checkStockUseCase.execute(input);
    }
}
