import {Sequelize} from "sequelize-typescript";
import {ClientModel} from "../repository/client.model";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

describe("Client-Adm facade test", () => {

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

    it("should create a client", async () => {

        const facade = ClientAdmFacadeFactory.create()

        const facadeInput = {
            id: "1",
            name: "Client 01",
            email: "x@x.com",
            address: "Address 01"
        }

        await facade.addClient(facadeInput)

        const foundClient = await ClientModel.findOne({
            where: {id: facadeInput.id}
        })

        expect(foundClient.id).toEqual(facadeInput.id);
        expect(foundClient.name).toEqual(facadeInput.name);
        expect(foundClient.email).toEqual(facadeInput.email);
        expect(foundClient.address).toEqual(facadeInput.address);
    })

    it("should find a client", async () => {

            const facade = ClientAdmFacadeFactory.create()

            const createClientInput = {
                id: "1",
                name: "Client 01",
                email: "x@x.com",
                address: "Address 01"
            }

            await facade.addClient(createClientInput);

            const facadeInput = {
                id: "1"
            }

            const result = await facade.findClient(facadeInput)

            expect(result.id).toEqual(createClientInput.id);
            expect(result.name).toEqual(createClientInput.name);
            expect(result.email).toEqual(createClientInput.email);
            expect(result.address).toEqual(createClientInput.address);
    })
})
