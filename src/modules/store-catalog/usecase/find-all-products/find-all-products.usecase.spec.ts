import Product from "../../domain/product.entity";
import Id from "../../../@shared/domain/entity/value-object/id.value-object";
import FindAllProductsUsecase from "./find-all-products.usecase";

const product01 = new Product({
    id: new Id("1"),
    name: "Product 01",
    description: "Product 01 description",
    salesPrice: 100,
});

const product02 = new Product({
    id: new Id("2"),
    name: "Product 02",
    description: "Product 02 description",
    salesPrice: 200,
});

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockResolvedValue(Promise.resolve([product01, product02])),
    };
}

describe("Find all products usecase unit tests", () => {

    it("should find all products", async () => {

        const productRepository = MockRepository();

        const usecase = new FindAllProductsUsecase(productRepository);

        const result = await usecase.execute();

        expect(productRepository.findAll).toHaveBeenCalled();
        expect(result.products.length).toBe(2);

        expect(result.products[0].id).toBe(product01.id.id);
        expect(result.products[0].name).toBe(product01.name);
        expect(result.products[0].description).toBe(product01.description);
        expect(result.products[0].salesPrice).toBe(product01.salesPrice);

        expect(result.products[1].id).toBe(product02.id.id);
        expect(result.products[1].name).toBe(product02.name);
        expect(result.products[1].description).toBe(product02.description);
        expect(result.products[1].salesPrice).toBe(product02.salesPrice);
    })
})
