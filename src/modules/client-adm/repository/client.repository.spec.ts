import {Sequelize} from "sequelize-typescript";
import {ClientModel} from "./client.model";
import ClientRepository from "./client-repository";

describe("Client repository tests", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        })

        sequelize.addModels([ClientModel])
        await sequelize.sync()
    })

    /* Após cada teste, a conexão será encerrada. */
    afterEach(async () => {
        await sequelize.close();
    })

    it("should find a client", async () => {

        const client = await ClientModel.create({
            id: "1",
            name: "Client 01",
            email: "x@x.com",
            address: "Address 01",
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const repository = new ClientRepository();
        const result = await repository.find(client.id);

        expect(result.id.id).toBe(client.id);
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.address).toBe(client.address);
    })
})
