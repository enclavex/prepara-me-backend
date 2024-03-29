import { ICreateSpecialistDTO } from "@modules/specialists/dtos/ICreateSpecialistDTO"
import { SpecialistStatusEnum } from "@modules/specialists/enums/SpecialistStatusEnum"
import { SpecialistsRepositoryInMemory } from "@modules/specialists/repositories/in-memory/SpecialistsRepositoryInMemory"
import { CreateSpecialistUseCase } from "../createSpecialist/CreateSpecialistUseCase"
import { ListSpecialistAvailableUseCase } from "./ListSpecialistAvailableUseCase"

let specialistsRepositoryInMemory: SpecialistsRepositoryInMemory
let listSpecialistAvailableUseCase: ListSpecialistAvailableUseCase
let createSpecialistUseCase: CreateSpecialistUseCase

describe("List Specialists", () => {
    beforeAll(() => {
        specialistsRepositoryInMemory = new SpecialistsRepositoryInMemory()
        createSpecialistUseCase = new CreateSpecialistUseCase(specialistsRepositoryInMemory)
        listSpecialistAvailableUseCase = new ListSpecialistAvailableUseCase(
            specialistsRepositoryInMemory        )
    })

    it("should be able to list specialists", async () => {
        const specialist: ICreateSpecialistDTO = {
            name: "Specialist Test",
            bio: "Biography",
            status: SpecialistStatusEnum.ACTIVE,
            linkedinUrl: "www.linkedin.com/test",
            userId: "1234"
        }

        await createSpecialistUseCase.execute(specialist)

        const specialist2: ICreateSpecialistDTO = {
            name: "Specialist Test",
            bio: "Biography",
            status: SpecialistStatusEnum.ACTIVE,
            linkedinUrl: "www.linkedin.com/test",
            userId: "1234"
        }

        await createSpecialistUseCase.execute(specialist2)

        const result = await listSpecialistAvailableUseCase.execute()

        expect(result).toHaveLength(2)
    })
})