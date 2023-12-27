import UseCaseInterface from "../../../@shared/domain/entity/use-case/use-case.interface";
import {ProcessPaymentInputDto, ProcessPaymentOutputDto} from "./process-payment.dto";
import PaymentGateway from "../../gateway/payment.gateway";
import Transaction from "../../domain/transaction";

export default class ProcessPaymentUsecase implements UseCaseInterface {

    private transactionRepository: PaymentGateway

    constructor(transactionRepository: PaymentGateway) {
        this.transactionRepository = transactionRepository;
    }

    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {

        const transaction = new Transaction({
            amount: input.amount,
            orderId: input.orderId
        })

        transaction.process();

        console.log(JSON.stringify(transaction))

        const persistTransaction = await this.transactionRepository.save(transaction);

        console.log(JSON.stringify(transaction))

        return {
            transactionId: persistTransaction.id.id,
            amount: persistTransaction.amount,
            orderId: persistTransaction.orderId,
            status: persistTransaction.status,
            createdAt: persistTransaction.createdAt,
            updatedAt: persistTransaction.updatedAt
        }
    }
}
