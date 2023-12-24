import {Sequelize} from "sequelize-typescript";
import {ProductModel} from "./product.model";

describe("Product repository integration test", () => {

    let sequelize: Sequelize

    /* Antes de cada teste, será aberta uma conexão com o banco de dados. */
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        })

        sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    /* Após cada teste, a conexão será encerrada. */
    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a product", async () => {

    })
})
