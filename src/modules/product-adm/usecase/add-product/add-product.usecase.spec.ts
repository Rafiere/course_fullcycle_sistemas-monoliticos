/* Um teste unitário nunca pensará em integrações externas. */

/* Estamos criando um mock do repositório com o Jest. */
import {AddProductInputDto} from "./add-product.dto";
import AddProductUsecase from "./add-product.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

describe("Add product usecase unit test", () => {

    it("should add a product", async () => {
        const productRepository = MockRepository();

        const input: AddProductInputDto = {
            name: "Product 01",
            description: "Product 01 description",
            purchasePrice: 100,
            stock: 10
        }

        const usecase = new AddProductUsecase(productRepository);
        const result = await usecase.execute(input);

        expect(productRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.description).toBe(input.description);
        expect(result.purchasePrice).toBe(input.purchasePrice);
        expect(result.stock).toBe(input.stock);
    });
})
