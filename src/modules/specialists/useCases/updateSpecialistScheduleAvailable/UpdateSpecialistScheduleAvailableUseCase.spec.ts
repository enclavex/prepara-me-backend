import { ICreateSpecialistScheduleAvailableDTO } from "@modules/specialists/dtos/ICreateSpecialistScheduleAvailableDTO"
import { SpecialistScheduleAvailableStatusEnum } from "@modules/specialists/enums/SpecialistScheduleAvailableStatusEnum"
import { SpecialistScheduleAvailableRepositoryInMemory } from "@modules/specialists/infra/typeorm/repositories/in-memory/SpecialistScheduleAvailableRepositoryInMemory"
import { CreateSpecialistScheduleAvailableUseCase } from "../createSpecialistScheduleAvailable/CreateSpecialistScheduleAvailableUseCase"
import { UpdateSpecialistScheduleAvailableUseCase } from "./UpdateSpecialistScheduleAvailableUseCase"

let specialistScheduleAvailableRepositoryInMemory: SpecialistScheduleAvailableRepositoryInMemory
let createSpecialistScheduleAvailableUseCase: CreateSpecialistScheduleAvailableUseCase
let updateSpecialistScheduleAvailableUseCase: UpdateSpecialistScheduleAvailableUseCase

describe("Update availability", () => {
    beforeAll(() => {
        specialistScheduleAvailableRepositoryInMemory = new SpecialistScheduleAvailableRepositoryInMemory()
        createSpecialistScheduleAvailableUseCase = new CreateSpecialistScheduleAvailableUseCase(specialistScheduleAvailableRepositoryInMemory)
        updateSpecialistScheduleAvailableUseCase = new UpdateSpecialistScheduleAvailableUseCase(specialistScheduleAvailableRepositoryInMemory)
    })

    it("should be able to schedule a schedule to a user", async () => {
        const specialistScheduleAvailable: ICreateSpecialistScheduleAvailableDTO = {
            dateSchedule: new Date("2021-01-01 11:15:31"),
            status: SpecialistScheduleAvailableStatusEnum.AVAILABLE,
            specialistId: "1234"
        }

        const newSpecialistScheduleAvailable = await createSpecialistScheduleAvailableUseCase.execute(specialistScheduleAvailable)

        const result = await updateSpecialistScheduleAvailableUseCase.execute({
            specialistScheduleAvailableId: newSpecialistScheduleAvailable.id, 
            userId: "123456"
        })

        expect(result).toHaveProperty("userId")
    })
})