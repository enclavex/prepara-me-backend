import { ICreateSpecialistScheduleAvailableDTO } from "@modules/specialists/dtos/ICreateSpecialistScheduleAvailableDTO"
import { SpecialistScheduleAvailableStatusEnum } from "@modules/specialists/enums/SpecialistScheduleAvailableStatusEnum"
import { SpecialistScheduleAvailable } from "@modules/specialists/infra/typeorm/entities/SpecialistScheduleAvailable"
import { SpecialistScheduleAvailableRepositoryInMemory } from "@modules/specialists/infra/typeorm/repositories/in-memory/SpecialistScheduleAvailableRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { AppError } from "@shared/errors/AppError"
import { CreateSpecialistScheduleAvailableUseCase } from "./CreateSpecialistScheduleAvailableUseCase"

let specialistScheduleAvailableRepositoryInMemory: SpecialistScheduleAvailableRepositoryInMemory
let createSpecialistScheduleAvailableUseCase: CreateSpecialistScheduleAvailableUseCase

describe("Create Specialist Schedule Available", () => {
    beforeAll(() => {
        specialistScheduleAvailableRepositoryInMemory = new SpecialistScheduleAvailableRepositoryInMemory()
        createSpecialistScheduleAvailableUseCase    = new CreateSpecialistScheduleAvailableUseCase(specialistScheduleAvailableRepositoryInMemory)
    })

    it("should be able to create a new specialist schedule available", async () => {
        const specialistScheduleAvailable: ICreateSpecialistScheduleAvailableDTO = {
            dateSchedule: new Date("2021-01-01 11:15:31"),
            status: SpecialistScheduleAvailableStatusEnum.AVAILABLE,
            specialistId: "1234"
        }

        const result = await createSpecialistScheduleAvailableUseCase.execute(specialistScheduleAvailable)

        expect(result).toHaveProperty("id")
    })

    it("should not be able to create a specialist schedule available without a specialist", async () => {
        expect(async () => {
            const specialistScheduleAvailable: ICreateSpecialistScheduleAvailableDTO = {
                dateSchedule: new Date("2021-01-01 11:15:31"),
                status: SpecialistScheduleAvailableStatusEnum.AVAILABLE,
                specialistId: ""
            }
    
            await createSpecialistScheduleAvailableUseCase.execute(specialistScheduleAvailable)
    
        }).rejects.toBeInstanceOf(AppError);
    });
})