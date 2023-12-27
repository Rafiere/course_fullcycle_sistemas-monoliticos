import {Sequelize} from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";
import PaymentFacadeFactory from "../factory/payment.facade.factory";

describe("Payment facade unit tests", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        })

        sequelize.addModels([TransactionModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a transaction", async () => {

        const facade = PaymentFacadeFactory.create();

        const input = {
            amount: 102,
            orderId: "1"
        }

        const output = await facade.processPayment(input);

        expect(output.transactionId).toBeDefined()
        expect(output.amount).toEqual(input.amount)
        expect(output.orderId).toEqual(input.orderId)
        expect(output.status).toEqual("approved")
    })
})
