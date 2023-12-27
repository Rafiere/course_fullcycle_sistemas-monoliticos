import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./facade.interface";
import ProcessPaymentUsecase from "../usecase/process-payment/process-payment.usecase";
import UseCaseInterface from "../../@shared/domain/entity/use-case/use-case.interface";

export default class PaymentFacade implements PaymentFacadeInterface {

    private processPaymentUsecase: UseCaseInterface;

    constructor(processPaymentUsecase: ProcessPaymentUsecase) {
        this.processPaymentUsecase = processPaymentUsecase;
    }

    processPayment(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {

        return this.processPaymentUsecase.execute(input);
    }
}
