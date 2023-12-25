import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import Id from "../../@shared/domain/entity/value-object/id.value-object";

type ProductProps = {
    id: Id //Nesse módulo, o ID será sempre obrigatório, pois não criaremos nenhum ID.
    name: string;
    description: string;
    salesPrice: number;
}

export default class Product extends BaseEntity implements AggregateRoot {

    private _name: string;
    private _description: string;
    private _salesPrice: number; //O produto será o mesmo, mas o produto terá um preço de venda e de compra.

    constructor(props: ProductProps) {
        super(props.id);
        this._name = props.name;
        this._description = props.description;
        this._salesPrice = props.salesPrice;
    }

    /* Não teremos um "setter", pois não alteraremos nada do produto nesse contexto. */
    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get salesPrice(): number {
        return this._salesPrice;
    }
}
