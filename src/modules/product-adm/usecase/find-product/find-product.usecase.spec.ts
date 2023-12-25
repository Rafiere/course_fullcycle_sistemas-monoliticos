import {FindProductInputDto} from "./find-product.dto";
import FindProductUsecase from "./find-product.usecase";
import Id from "../../../@shared/domain/entity/value-object/id.value-object";

const product = {
        id: new Id("1"),
        name: "Product 01",
        description: "Product 01 description",
        purchasePrice: 100,
        stock: 10,
}

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockResolvedValue(product)
    }
}

describe("Find product usecase unit test", () => {

    it("should find a product", async () => {
        const productRepository = MockRepository();

        const input: FindProductInputDto = {
            id: "1"
        }

        const usecase = new FindProductUsecase(productRepository);
        const result = await usecase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(result.id).toBe(product.id.id);
        expect(result.name).toBe(product.name);
        expect(result.description).toBe(product.description);
        expect(result.purchasePrice).toBe(product.purchasePrice);
        expect(result.stock).toBe(product.stock);
    });
})
