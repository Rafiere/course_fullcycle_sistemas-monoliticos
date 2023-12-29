import Order from "../domain/order.entity";

//Essa gateway será implementada pelo repositório para buscar as entidades que
//são pertencentes a esse módulo.

export default interface CheckoutGateway {

    addOrder(order: Order): Promise<void>;

    findOrder(id: string): Promise<Order | null>
}
