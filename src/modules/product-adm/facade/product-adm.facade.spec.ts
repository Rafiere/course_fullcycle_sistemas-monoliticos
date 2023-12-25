import {Sequelize} from "sequelize-typescript";
import {ProductModel} from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import AddProductUsecase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacadeFactory from "../factory/facade.factory";

describe("Product adm facade integration tests", () => {

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

        const productFacade = ProductAdmFacadeFactory.create();

        const facadeInput = {
            id: "1",
            name: "Product 01",
            description: "Product 01 description",
            purchasePrice: 100,
            stock: 10
        }

        /* Não estamos chamando o caso de uso direto, e sim a facade. Todos os
        * módulos que precisarem se comunicar com o módulo "product-adm" utilizarão a
        * facade. */
        await productFacade.addProduct(facadeInput);

        const product = await ProductModel.findOne({where: {id: "1"}});

        expect(product.id).toEqual(facadeInput.id);
        expect(product.name).toEqual(facadeInput.name);
        expect(product.description).toEqual(facadeInput.description);
        expect(product.purchasePrice).toEqual(facadeInput.purchasePrice);
        expect(product.stock).toEqual(facadeInput.stock);
    })

    it("should find a product", async () => {

        const productFacade = ProductAdmFacadeFactory.create();

        const facadeInput = {
            id: "1",
            name: "Product 01",
            description: "Product 01 description",
            purchasePrice: 100,
            stock: 10
        }

        /* Não estamos chamando o caso de uso direto, e sim a facade. Todos os
        * módulos que precisarem se comunicar com o módulo "product-adm" utilizarão a
        * facade. */
        await productFacade.addProduct(facadeInput);

        const createdProduct = await ProductModel.findOne({where: {id: "1"}});

        const facadeFoundProduct = await productFacade.findProduct({id: "1"});

        expect(createdProduct.id).toEqual(facadeFoundProduct.id);
        expect(createdProduct.name).toEqual(facadeFoundProduct.name);
        expect(createdProduct.description).toEqual(facadeFoundProduct.description);
        expect(createdProduct.purchasePrice).toEqual(facadeFoundProduct.purchasePrice);
        expect(createdProduct.stock).toEqual(facadeFoundProduct.stock);
    })
})
