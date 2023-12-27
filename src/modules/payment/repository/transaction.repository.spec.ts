import {Sequelize} from "sequelize-typescript";
import TransactionModel from "./transaction.model";
import Transaction from "../domain/transaction";
import TransactionRepository from "./transaction.repository";

describe("Client repository tests", () => {

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

    it("should save a transaction", async () => {

        const transaction = new Transaction({
            id: "1",
            amount: 99,
            orderId: "1",
            status: "pending"
        })

        transaction.approve();

        const transactionRepository = new TransactionRepository();

        const result = await transactionRepository.save(transaction);

        expect(result.id.id).toEqual(transaction.id.id)
        expect(result.amount).toEqual(transaction.amount)
        expect(result.orderId).toEqual(transaction.orderId)
        expect(result.status).toEqual("approved")
        expect(result.createdAt).toEqual(transaction.createdAt)
        expect(result.updatedAt).toEqual(transaction.updatedAt)
    })
})
