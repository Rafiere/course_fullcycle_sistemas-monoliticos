import ClientGateway from "../gateway/client.gateway";
import Client from "../domain/client.entity";
import {ClientModel} from "./client.model";
import Id from "../../@shared/domain/entity/value-object/id.value-object";

export default class ClientRepository implements ClientGateway {

    async add(client: Client): Promise<void> {

        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: new Date(),
            updatedAt: new Date()
        })

    }

    async find(id: string): Promise<Client> {

        const client = await ClientModel.findOne({
            where: {id: id}
        })

        if (!client) {
            throw new Error("Client not found")
        }

        return new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            address: client.address,
        })
    }
}
