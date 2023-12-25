import Product from "../../domain/product.entity";
import Id from "../../../@shared/domain/entity/value-object/id.value-object";
import CheckStockUsecase from "./check-stock.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product 01",
    description: "Product 01 description",
    purchasePrice: 100,
    stock: 10,
})

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockResolvedValue(Promise.resolve(product))
    }
}

describe("Check stock usecase unit test", () => {

    it("should get stock of a product", async () => {

        const productRepository = MockRepository();

        const checkStockUsecase = new CheckStockUsecase(productRepository);

        const input = {
            productId: "1"
        }

        const result = await checkStockUsecase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(result.productId).toBe("1");
        expect(result.stock).toBe(product.stock);
    })
});
