import { ICreateSpecialistScheduleAvailableDTO } from "@modules/specialists/dtos/ICreateSpecialistScheduleAvailableDTO"
import { SpecialistScheduleAvailableStatusEnum } from "@modules/specialists/enums/SpecialistScheduleAvailableStatusEnum"
import { SpecialistScheduleAvailableRepositoryInMemory } from "@modules/specialists/infra/typeorm/repositories/in-memory/SpecialistScheduleAvailableRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateSpecialistScheduleAvailableUseCase } from "../createSpecialistScheduleAvailable/CreateSpecialistScheduleAvailableUseCase"
import { ListScheduleSpecialistByDateUseCase } from "./ListScheduleSpecialistByDateUseCase"

let specialistScheduleAvailableRepositoryInMemory: SpecialistScheduleAvailableRepositoryInMemory
let createSpecialistScheduleAvailableUseCase: CreateSpecialistScheduleAvailableUseCase
let listScheduleSpecialistByDateUseCase: ListScheduleSpecialistByDateUseCase

describe("Create Specialist Schedule Available", () => {
    beforeAll(() => {
        specialistScheduleAvailableRepositoryInMemory = new SpecialistScheduleAvailableRepositoryInMemory()
        createSpecialistScheduleAvailableUseCase    = new CreateSpecialistScheduleAvailableUseCase(specialistScheduleAvailableRepositoryInMemory)
        listScheduleSpecialistByDateUseCase = new ListScheduleSpecialistByDateUseCase(specialistScheduleAvailableRepositoryInMemory)
    })

    it("should be able to list a specialist schedule available", async () => {
        const specialistScheduleAvailable: ICreateSpecialistScheduleAvailableDTO = {
            dateSchedule: new Date("2021-01-01 11:15:31"),
            status: SpecialistScheduleAvailableStatusEnum.AVAILABLE,
            specialistId: "1234"
        }

        await createSpecialistScheduleAvailableUseCase.execute(specialistScheduleAvailable)

        const result = await listScheduleSpecialistByDateUseCase.execute({
            specialistId: "1234",
            dateBegin: new Date("2021-01-01 00:00:00"),
            dateEnd: new Date("2021-01-01 23:59:59")
        })

        expect(result).toHaveLength(1)
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