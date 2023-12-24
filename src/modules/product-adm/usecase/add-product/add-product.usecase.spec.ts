/* Um teste unitário nunca pensará em integrações externas. */

/* Estamos criando um mock do repositório com o Jest. */
import {AddProductInputDto} from "./add-product.dto";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

describe("Add product usecase unit test", () => {

    it("should add a product", async () => {
        const productRepository = new ProductRepository();

        const input: AddProductInputDto = {
            name: "Product 01",
            description: "Product 01 description",
            purchasePrice: 100,
            stock: 10
        }

        const usecase = new AddProductUseCase();
        usecase.execute(input);
    });
})
