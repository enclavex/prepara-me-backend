import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        name,
        type,
        status,
        email,
        documentId,
        id,
        realocated
    }): Promise<IUserResponseDTO[]> {
        const users = await this.usersRepository.find({
            name,
            type,
            status,
            email,
            documentId,
            id,
            realocated
        });
        
        return users
    }
}

export { ListUserUseCase };
