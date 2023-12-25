import {Sequelize} from "sequelize-typescript";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {

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

    it("should find all products", async () => {

        const product01 = await ProductModel.create({
            id: "1",
            name: "Product 01",
            description: "Product 01 description",
            salesPrice: 100,
        })

        const product02 = await ProductModel.create({
            id: "2",
            name: "Product 02",
            description: "Product 02 description",
            salesPrice: 200,
        })

        const productRepository = new ProductRepository();

        const products = await productRepository.findAll();

        expect(products.length).toBe(2);

        expect(products[0].id.id).toBe(product01.id);
        expect(products[0].name).toBe(product01.name);
        expect(products[0].description).toBe(product01.description);
        expect(products[0].salesPrice).toBe(product01.salesPrice);

        expect(products[1].id.id).toBe(product02.id);
        expect(products[1].name).toBe(product02.name);
        expect(products[1].description).toBe(product02.description);
        expect(products[1].salesPrice).toBe(product02.salesPrice);
    })

    it("should find a product", async () => {

        await ProductModel.create({
            id: "1",
            name: "Product 01",
            description: "Product 01 description",
            salesPrice: 100,
        })

        const productRepository = new ProductRepository();
        const product = await productRepository.find("1");

        expect(product.id.id).toBe("1");
        expect(product.name).toBe("Product 01");
        expect(product.description).toBe("Product 01 description");
        expect(product.salesPrice).toBe(100);
    })
})
