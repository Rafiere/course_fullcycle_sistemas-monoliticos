import ClientAdmFacadeInterface, {
    AddClientFacadeInputDto,
    AddClientFacadeOutputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto
} from "./client-adm.facade.interface";
import UseCaseInterface from "../../@shared/domain/entity/use-case/use-case.interface";

export interface UseCaseProps {
    findClientUseCase: UseCaseInterface;
    addClientUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {

    private findClientUseCase: UseCaseInterface;
    private addClientUseCase: UseCaseInterface;

    constructor(useCaseProps: UseCaseProps) {
        this.findClientUseCase = useCaseProps.findClientUseCase;
        this.addClientUseCase = useCaseProps.addClientUseCase;
    }

    async addClient(input: AddClientFacadeInputDto): Promise<AddClientFacadeOutputDto> {

        return await this.addClientUseCase.execute(input)
    }

    async findClient(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {

        return await this.findClientUseCase.execute(input)
    }
}
