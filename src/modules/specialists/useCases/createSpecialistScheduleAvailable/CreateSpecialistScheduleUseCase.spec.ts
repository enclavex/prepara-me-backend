import { ICreateSpecialistScheduleDTO } from "@modules/specialists/dtos/ICreateSpecialistScheduleDTO"
import { SpecialistScheduleStatusEnum } from "@modules/specialists/enums/SpecialistScheduleStatusEnum"
import { SpecialistScheduleRepositoryInMemory } from "@modules/specialists/repositories/in-memory/SpecialistScheduleRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateSpecialistScheduleUseCase } from "./CreateSpecialistScheduleUseCase"

let specialistScheduleRepositoryInMemory: SpecialistScheduleRepositoryInMemory
let createSpecialistScheduleUseCase: CreateSpecialistScheduleUseCase

describe("Create Specialist Schedule ", () => {
    beforeAll(() => {
        specialistScheduleRepositoryInMemory = new SpecialistScheduleRepositoryInMemory()
        createSpecialistScheduleUseCase    = new CreateSpecialistScheduleUseCase(specialistScheduleRepositoryInMemory)
    })

    it("should be able to create a new specialist schedule", async () => {
        const specialistSchedule: ICreateSpecialistScheduleDTO = {
            dateSchedule: new Date("2021-01-01 11:15:31"),
            status: SpecialistScheduleStatusEnum.AVAILABLE,
            specialistId: "1234"
        }

        const result = await createSpecialistScheduleUseCase.execute(specialistSchedule)

        expect(result).toHaveProperty("id")
    })

    it("should not be able to create a specialist schedule without a specialist", async () => {
        expect(async () => {
            const specialistSchedule: ICreateSpecialistScheduleDTO = {
                dateSchedule: new Date("2021-01-01 11:15:31"),
                status: SpecialistScheduleStatusEnum.AVAILABLE,
                specialistId: ""
            }
    
            await createSpecialistScheduleUseCase.execute(specialistSchedule)
    
        }).rejects.toBeInstanceOf(AppError);
    });
})