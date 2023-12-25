import Product from "../../domain/product.entity";
import Id from "../../../@shared/domain/entity/value-object/id.value-object";
import FindProductUsecase from "./find-product-usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product 01",
    description: "Product 01 description",
    salesPrice: 100,
})

const MockRepository = () => {
    return {
        find: jest.fn().mockResolvedValue(Promise.resolve(product)),
        findAll: jest.fn(),
    };
}

describe("Find product usecase unit tests", () => {

    it("should find product", async () => {

        const productRepository = MockRepository();

        const usecase = new FindProductUsecase(productRepository);

        const result = await usecase.execute({id: "1"});

        expect(productRepository.find).toHaveBeenCalled();

        expect(result.id).toBe(product.id.id);
        expect(result.name).toBe(product.name);
        expect(result.description).toBe(product.description);
        expect(result.salesPrice).toBe(product.salesPrice);
    })
})
