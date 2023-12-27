import Transaction from "../../domain/transaction";
import ProcessPaymentUsecase from "./process-payment.usecase";

/* Estamos criando o mock pois esse é um teste de unidade, e não de integração. */

describe("Process payment usecase unit tests", () => {

    it("should process payment", async () => {

        const input = {
            amount: 99,
            orderId: "1"
        }

        const transactionWithExpectedValues = new Transaction({
            id: "1",
            amount: 99,
            orderId: "1",
            status: "approved"
        })

        const paymentRepository = {save: jest.fn().mockResolvedValue(transactionWithExpectedValues)};

        const usecase = new ProcessPaymentUsecase(paymentRepository);

        const output = await usecase.execute(input);

        expect(paymentRepository.save).toHaveBeenCalled();

        expect(output.transactionId).toEqual(transactionWithExpectedValues.id.id)
        expect(output.amount).toEqual(transactionWithExpectedValues.amount)
        expect(output.orderId).toEqual(transactionWithExpectedValues.orderId)
        expect(output.status).toEqual("approved")
        expect(output.createdAt).toEqual(transactionWithExpectedValues.createdAt)
        expect(output.updatedAt).toEqual(transactionWithExpectedValues.updatedAt)
    })

    it("should decline a payment", async () => {

        const input = {
            amount: 99,
            orderId: "1"
        }

        const transactionWithExpectedValues = new Transaction({
            id: "1",
            amount: 99,
            orderId: "1",
            status: "declined"
        })

        const paymentRepository = {save: jest.fn().mockResolvedValue(transactionWithExpectedValues)};
        const usecase = new ProcessPaymentUsecase(paymentRepository);

        const output = await usecase.execute(input);

        expect(paymentRepository.save).toHaveBeenCalled();

        expect(output.transactionId).toEqual(transactionWithExpectedValues.id.id)
        expect(output.amount).toEqual(99)
        expect(output.orderId).toEqual(transactionWithExpectedValues.orderId)
        expect(output.status).toEqual("declined")
        expect(output.createdAt).toEqual(transactionWithExpectedValues.createdAt)
        expect(output.updatedAt).toEqual(transactionWithExpectedValues.updatedAt)
    })
})
