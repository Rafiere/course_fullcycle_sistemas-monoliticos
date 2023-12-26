import ClientGateway from "../../gateway/client.gateway";
import {AddClientInputDto, AddClientOutputDto} from "./add-client.usecase.dto";
import UseCaseInterface from "../../../@shared/domain/entity/use-case/use-case.interface";
import Id from "../../../@shared/domain/entity/value-object/id.value-object";
import Client from "../../domain/client.entity";

export default class AddClientUsecase implements UseCaseInterface {
    private clientRepository: ClientGateway

    constructor(clientRepository: ClientGateway) {
        this.clientRepository = clientRepository;
    }

    async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {

        const props = {
            name: input.name,
            email: input.email,
            address: input.address
        }

        const client = new Client(props);

        await this.clientRepository.add(client);

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
