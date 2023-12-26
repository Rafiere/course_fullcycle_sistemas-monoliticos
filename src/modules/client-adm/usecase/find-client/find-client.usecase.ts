import UseCaseInterface from "../../../@shared/domain/entity/use-case/use-case.interface";
import ClientGateway from "../../gateway/client.gateway";
import {FindClientInputDto, FindClientOutputDto} from "./find-client.usecase.dto";

export default class FindClientUsecase implements UseCaseInterface {

    private clientRepository: ClientGateway

    constructor(clientRepository: ClientGateway) {
        this.clientRepository = clientRepository;
    }

    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {

        const client = await this.clientRepository.find(input.id);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }
    }
}
