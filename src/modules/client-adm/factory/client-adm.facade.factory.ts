import ClientRepository from "../repository/client-repository";
import AddClientUsecase from "../usecase/add-client/add-client.usecase";
import FindClientUsecase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacade from "../facade/client-adm.facade";

export default class ClientAdmFacadeFactory {

    static create() {
        const repository = new ClientRepository();

        const findClientUsecase = new FindClientUsecase(repository);
        const addClientUsecase = new AddClientUsecase(repository);

        return new ClientAdmFacade({
            findClientUseCase: findClientUsecase,
            addClientUseCase: addClientUsecase
        })
    }
}
