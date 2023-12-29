import UseCaseInterface from "../../../@shared/domain/entity/use-case/use-case.interface";
import {PlaceOrderInputDto, PlaceOrderOutputDto} from "./place-order.dto";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface";
import Id from "../../../@shared/domain/entity/value-object/id.value-object";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";

/* Esse caso de uso utilizará as facades de todos os outros módulos. */

export default class PlaceOrderUsecase implements UseCaseInterface {

    /* Sempre devemos depender de interfaces, pois ela pode ser substituída por
    * qualquer coisa e, sempre que possível, não devemos depender de
    * implementações concretas. */
    private _clientFacade: ClientAdmFacadeInterface
    private _productFacade: ProductAdmFacadeInterface
    private _catalogFacade: StoreCatalogFacadeInterface

    constructor(clientFacade: ClientAdmFacadeInterface,
                productFacade: ProductAdmFacadeInterface,
                catalogFacade: StoreCatalogFacadeInterface) {

        this._clientFacade = clientFacade;
        this._productFacade = productFacade;
        this._catalogFacade = catalogFacade;
    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {

        //Buscar um cliente. Caso não encontre, retornará um "client not found".

        const client = await this._clientFacade.findClient({id: input.clientId});

        if(!client){
            throw new Error("Client not found");
        }

        //Validar se todos os produtos são válidos.

        await this.validateProducts(input);

        //Recuperar os produtos

        const products: Product[] = await Promise.all(
            input.products.map(async product => await this.getProduct(product.productId))
        )

        //Criar o objeto do "Client".

        const orderClient = new Client({
            id: new Id(input.clientId),
            name: client.name,
            email: client.email,
            address: client.address
        })

        //Criar o objeto da ordem de serviço, onde utilizaremos o client e os products.

        const order = new Order({
            id: new Id(),
            client: orderClient,
            products,
        })
    }

    private async validateProducts(input: PlaceOrderInputDto): Promise<void> {

        if(input.products.length === 0){
            throw new Error("No products selected");
        }

        for (const product of input.products) {

            console.log(JSON.stringify("chamou: " + input.products))
            const productStock = await this._productFacade.checkStock({productId: product.productId});

            if(!productStock){
                throw new Error(`Product ${product.productId} is not available in stock`);
            }
        }
    }

    private async getProduct(productId: string): Promise<Product> {

        const product = await this._catalogFacade.find({id: productId});

        if(!product){
            throw new Error(`Product ${productId} not found`);
        }

        return new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        });
    }
}
