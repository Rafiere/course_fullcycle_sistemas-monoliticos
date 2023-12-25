import {Sequelize} from "sequelize-typescript";
import {ProductModel} from "./product.model";
import Id from "../../@shared/domain/entity/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductRepository from "./product.repository";

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

        const productRepository = new ProductRepository();

        const product = new Product({
            id: new Id("1"),
            name: "Product 01",
            description: "Product 01 description",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        await productRepository.add(product);

        const productFromDatabase = await ProductModel.findOne({where: {id: product.id.id}});

        expect(product.id.id).toEqual(productFromDatabase.getDataValue('id'));
        expect(product.name).toEqual(productFromDatabase.getDataValue('name'));
        expect(product.description).toEqual(productFromDatabase.getDataValue('description'));
        expect(product.purchasePrice).toEqual(productFromDatabase.getDataValue('purchasePrice'));
        expect(product.stock).toEqual(productFromDatabase.getDataValue('stock'));
        expect(product.createdAt.getTime()).toEqual(productFromDatabase.getDataValue('createdAt').getTime());
        expect(product.updatedAt.getTime()).toEqual(productFromDatabase.getDataValue('updatedAt').getTime());
    })
})
