import { ICreateSpecialistScheduleDTO } from "@modules/specialists/dtos/ICreateSpecialistScheduleDTO"
import { SpecialistScheduleStatusEnum } from "@modules/specialists/enums/SpecialistScheduleStatusEnum"
import { SpecialistScheduleRepositoryInMemory } from "@modules/specialists/repositories/in-memory/SpecialistScheduleRepositoryInMemory"
import { CreateSpecialistScheduleUseCase } from "../createSpecialistScheduleAvailable/CreateSpecialistScheduleUseCase"
import { UpdateSpecialistScheduleUseCase } from "./UpdateSpecialistScheduleUseCase"

let specialistScheduleRepositoryInMemory: SpecialistScheduleRepositoryInMemory
let createSpecialistScheduleUseCase: CreateSpecialistScheduleUseCase
let updateSpecialistScheduleUseCase: UpdateSpecialistScheduleUseCase

describe("Update availability", () => {
    beforeAll(() => {
        specialistScheduleRepositoryInMemory = new SpecialistScheduleRepositoryInMemory()
        createSpecialistScheduleUseCase = new CreateSpecialistScheduleUseCase(specialistScheduleRepositoryInMemory)
        updateSpecialistScheduleUseCase = new UpdateSpecialistScheduleUseCase(specialistScheduleRepositoryInMemory)
    })

    it("should be able to schedule a schedule to a user", async () => {
        const specialistSchedule: ICreateSpecialistScheduleDTO = {
            dateSchedule: new Date("2021-01-01 11:15:31"),
            status: SpecialistScheduleStatusEnum.AVAILABLE,
            specialistId: "1234"
        }

        const newSpecialistSchedule = await createSpecialistScheduleUseCase.execute(specialistSchedule)

        const result = await updateSpecialistScheduleUseCase.execute({
            specialistScheduleId: newSpecialistSchedule.id, 
            userId: "123456"
        })

        expect(result).toHaveProperty("userId")
    })
})