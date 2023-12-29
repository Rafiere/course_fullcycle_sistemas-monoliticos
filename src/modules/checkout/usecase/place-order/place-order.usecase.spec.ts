import PlaceOrderUsecase from "./place-order.usecase";
import {PlaceOrderInputDto} from "./place-order.dto";
import Product from "../../domain/product.entity";
import Id from "../../../@shared/domain/entity/value-object/id.value-object";

const mockedDate = new Date(2000, 1, 1)

describe("Unit tests for place order usecase unit tests", () => {

    describe("validateProducts methods", () => {

        const placeOrderUseCase = new PlaceOrderUsecase();

        it("should throw error if no products are selected", async () => {

            const input: PlaceOrderInputDto = {
                clientId: "0",
                products: []
            }

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(
                new Error("No products selected")
            );
        })

        it("should throw an error when product is out of stock", async () => {

            //Todas as vezes que utilizarmos a facade de produto, a implementação abaixo será retornada.

            const mockProductFacade = {
                checkStock: jest.fn(({productId}: { productId: string }) => {
                    Promise.resolve({
                        productId,
                        stock: productId === "1" ? 0 : 1
                    })
                })
            }

            placeOrderUseCase["_productFacade"] = mockProductFacade;

            let input: PlaceOrderInputDto = {
                clientId: "0",
                products: [
                    { productId: "1" }
                ]
            }

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(
                new Error("Product 1 is not available in stock")
            )

            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(1);

            input = {
                clientId: "0",
                products: [
                    { productId: "0" },
                    { productId: "1" },
                ]
            }

            console.log(JSON.stringify(input))

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(
                new Error("Product 0 is not available in stock")
            )
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(2);

            input = {
                clientId: "0",
                products: [
                    { productId: "0" },
                    { productId: "1" },
                    { productId: "2" },
                ]
            }

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(
                new Error("Product 0 is not available in stock")
            )
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);
        })
    })

    describe("getProducts methods", () => {

        beforeAll(() => {
            jest.useFakeTimers("modern")
            jest.setSystemTime(mockedDate)
        })

        afterAll(() => {
            jest.useRealTimers()
        })

        const placeOrderUseCase = new PlaceOrderUsecase()

        it("should throw an error when product not found", async () => {

            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue(null)
            }

            placeOrderUseCase["_catalogFacade"] = mockCatalogFacade

            await expect(placeOrderUseCase["getProduct"]("0")).rejects.toThrow(
                new Error("Product 0 not found")
            );
        })

        it("should return a product", async () => {

            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue({
                    id: "0",
                    name: "Product 0",
                    description: "Product 0 description",
                    salesPrice: 10,
                })
            }

            placeOrderUseCase["_catalogFacade"] = mockCatalogFacade

            await expect(placeOrderUseCase["getProduct"]("0")).resolves.toEqual(
                new Product({
                    id: new Id("0"),
                    name: "Product 0",
                    description: "Product 0 description",
                    salesPrice: 10,
                })
            );

            expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);
        })
    })

    describe("execute method", () => {

        it("should throw an error when client not found", async () => {

            const clientFacadeMock = {
                findClient: jest.fn().mockResolvedValue(null)
            }

            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUsecase();

            placeOrderUseCase["_clientFacade"] = clientFacadeMock;

            const input: PlaceOrderInputDto = {
                clientId: "0",
                products: []
            }

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
                new Error("Client not found")
            )
        })

    })

    it("should throw an error when products are not valid", async () => {

        const clientFacadeMock = {
            findClient: jest.fn().mockResolvedValue(true)
        }

        //@ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUsecase();

        //O "spy" servirá para verificarmos se o método externo foi chamado e o resultado dele.

        const validatedProductsSpy = jest.spyOn(placeOrderUseCase, "validateProducts")
            .mockRejectedValue(new Error("No products selected"))

        placeOrderUseCase["_clientFacade"] = clientFacadeMock;

        const input: PlaceOrderInputDto = {clientId: "1", products: []}

        await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
            new Error("No products selected")
        )

        expect(validatedProductsSpy).toHaveBeenCalledTimes(1);
    })
})
