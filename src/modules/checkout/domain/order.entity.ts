import Id from "../../@shared/domain/entity/value-object/id.value-object";
import Client from "./client.entity";
import Product from "./product.entity";
import BaseEntity from "../../@shared/domain/entity/base.entity";

type OrderProps = {
    id: Id
    client: Client
    products: Product[];
    status?: string
}

export default class Order extends BaseEntity {
    private readonly _client: Client;
    private readonly _products: Product[];
    private _status: string;

    constructor(props: OrderProps) {
        super(props.id)
        this._client = props.client;
        this._products = props.products;
        this._status = props.status ?? 'pending';
    }

    approved(): void {
        this._status = "approved";
    }

    getTotal(): number {
        return this._products
            .reduce((total, product) => total + product.salesPrice, 0);
    }

    get client(): Client {
        return this._client;
    }

    get products(): Product[] {
        return this._products;
    }

    get status(): string {
        return this._status;
    }
}