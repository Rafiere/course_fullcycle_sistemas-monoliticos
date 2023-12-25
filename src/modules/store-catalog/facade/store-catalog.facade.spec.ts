import {Sequelize} from "sequelize-typescript";
import StoreCatalogFacadeFactory from "../factory/facade.factory";
import ProductModel from "../repository/product.model";

describe("Store catalog facade tests", () => {

    let sequelize: Sequelize

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

    afterEach(async () => {
        await sequelize.close();
    })

    it("should find a product", async () => {

        await ProductModel.create({
            id: "1",
            name: "Product 01",
            description: "Product 01 description",
            salesPrice: 100,
        })

        const facade = StoreCatalogFacadeFactory.create();

        const result = await facade.find({id: "1"});

        expect(result.id).toBe("1");
        expect(result.name).toBe("Product 01");
        expect(result.description).toBe("Product 01 description");
        expect(result.salesPrice).toBe(100);
    })
})
