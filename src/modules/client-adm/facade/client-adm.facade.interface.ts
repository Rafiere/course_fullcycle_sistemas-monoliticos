export interface FindClientFacadeInputDto {
    id: string;
}

export interface FindClientFacadeOutputDto {
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AddClientFacadeInputDto {

    id?: string;
    name: string;
    email: string;
    address: string;
}

export interface AddClientFacadeOutputDto {
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

/* Essa interface definirá a forma de comunicação com esse módulo. */

export default interface ClientAdmFacadeInterface {
    addClient(addClientFacadeInputDto: AddClientFacadeInputDto): Promise<AddClientFacadeOutputDto>;
    findClient(findClientFacadeInputDto: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}
