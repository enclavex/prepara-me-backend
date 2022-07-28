import { ICreateSpecialistScheduleDTO } from "@modules/specialists/dtos/ICreateSpecialistScheduleDTO"
import { SpecialistScheduleStatusEnum } from "@modules/specialists/enums/SpecialistScheduleStatusEnum"
import { SpecialistScheduleRepositoryInMemory } from "@modules/specialists/repositories/in-memory/SpecialistScheduleRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateSpecialistScheduleUseCase } from "../createSpecialistScheduleAvailable/CreateSpecialistScheduleUseCase"
import { ListSpecialistScheduleUseCase } from "./ListSpecialistScheduleUseCase"

let specialistScheduleRepositoryInMemory: SpecialistScheduleRepositoryInMemory
let createSpecialistScheduleUseCase: CreateSpecialistScheduleUseCase
let listSpecialistScheduleUseCase: ListSpecialistScheduleUseCase

describe("Create Specialist Schedule ", () => {
    beforeAll(() => {
        specialistScheduleRepositoryInMemory = new SpecialistScheduleRepositoryInMemory()
        createSpecialistScheduleUseCase    = new CreateSpecialistScheduleUseCase(specialistScheduleRepositoryInMemory)
        listSpecialistScheduleUseCase = new ListSpecialistScheduleUseCase(specialistScheduleRepositoryInMemory)
    })

    it("should be able to list a specialist schedule available", async () => {
        const specialistSchedule: ICreateSpecialistScheduleDTO = {
            dateSchedule: new Date("2021-01-01 11:15:31"),
            status: SpecialistScheduleStatusEnum.AVAILABLE,
            specialistId: "1234"
        }

        await createSpecialistScheduleUseCase.execute(specialistSchedule)

        const result = await listSpecialistScheduleUseCase.execute({
            dateBegin: new Date("2021-01-01 00:00:00"),
            dateEnd: new Date("2021-01-01 23:59:59"),
            specialistId: "1234",
            id: "",
            userId: "",
            productId: "",
            status: ""
        })

        expect(result).toHaveLength(1)
    })

    it("should not be able to create a specialist schedule available without a specialist", async () => {
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