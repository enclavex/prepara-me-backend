import { ICreateSpecialistDTO } from "@modules/specialists/dtos/ICreateSpecialistDTO";
import { SpecialistStatusEnum } from "@modules/specialists/enums/SpecialistStatusEnum";
import { SpecialistRepositoryInMemory } from "@modules/specialists/infra/typeorm/repositories/in-memory/SpecialistsRepositoryInMemory";
import { CreateSpecialistUseCase } from "../createSpecialist/CreateSpecialistUseCase";
import { ListSpecialistUseCase } from "../listSpecialist/ListSpecialistUseCase";
import { RemoveSpecialistUseCase } from "./RemoveSpecialistUseCase";

let specialistsRepositoryInMemory: SpecialistRepositoryInMemory;
let listSpecialistUseCase: ListSpecialistUseCase;
let createSpecialistUseCase: CreateSpecialistUseCase;
let removeSpecialistUseCase: RemoveSpecialistUseCase;

describe("Remove Specialists", () => {
    beforeEach(() => {
        specialistsRepositoryInMemory = new SpecialistRepositoryInMemory();
        listSpecialistUseCase = new ListSpecialistUseCase(
            specialistsRepositoryInMemory
        );
        createSpecialistUseCase = new CreateSpecialistUseCase(
            specialistsRepositoryInMemory
        );
        removeSpecialistUseCase = new RemoveSpecialistUseCase(
            specialistsRepositoryInMemory
        );
    });

    it("should be able to delete a specialist", async () => {
        const specialist1: ICreateSpecialistDTO = {
            name: "Specialist One",
            bio: "Bio",
            linkedinUrl: "www.linkedin.com.br",
            status: SpecialistStatusEnum.ACTIVE,
            userId: "123",
        };

        await createSpecialistUseCase.execute(specialist1);

        const specialist2: ICreateSpecialistDTO = {
            name: "Specialist Two",
            bio: "Bio",
            linkedinUrl: "www.linkedin.com.br",
            status: SpecialistStatusEnum.ACTIVE,
            userId: "123",
        };

        const specialistCreated = await createSpecialistUseCase.execute(
            specialist2
        );

        await removeSpecialistUseCase.execute(specialistCreated.id);

        const result = await listSpecialistUseCase.execute({
            id: "",
            name: "",
            status: "",
            userId: "",
        });

        expect(result).toHaveLength(1);
    });
});

