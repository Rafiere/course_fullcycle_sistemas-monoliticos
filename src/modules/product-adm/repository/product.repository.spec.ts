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

        expect(product.id.id).toEqual(productFromDatabase.id);
        expect(product.name).toEqual(productFromDatabase.name);
        expect(product.description).toEqual(productFromDatabase.description);
        expect(product.purchasePrice).toEqual(productFromDatabase.purchasePrice);
        expect(product.stock).toEqual(productFromDatabase.stock);
        expect(product.createdAt.getTime()).toEqual(productFromDatabase.createdAt.getTime());
        expect(product.updatedAt.getTime()).toEqual(productFromDatabase.updatedAt.getTime());
    })

    it("should find a product", async () => {

        const productRepository = new ProductRepository();

        const createdAt = new Date();
        const updatedAt = new Date();

        await ProductModel.create({
            id: "1",
            name: "Product 01",
            description: "Product 01 description",
            purchasePrice: 100,
            stock: 10,
            createdAt: createdAt,
            updatedAt: updatedAt
        })

        const product = await productRepository.find("1");

        const marginOfError = 100; // Margem de erro pois uma diferença de 2~3 milissegundos pode ocorrer e falhar o teste.

        expect(product.id.id).toEqual("1");
        expect(product.name).toEqual("Product 01");
        expect(product.description).toEqual("Product 01 description");
        expect(product.purchasePrice).toEqual(100);
        expect(product.stock).toEqual(10);
        expect(Math.abs(product.createdAt.getTime() - createdAt.getTime())).toBeLessThanOrEqual(marginOfError);
        expect(Math.abs(product.updatedAt.getTime() - updatedAt.getTime())).toBeLessThanOrEqual(marginOfError);
    })
})
