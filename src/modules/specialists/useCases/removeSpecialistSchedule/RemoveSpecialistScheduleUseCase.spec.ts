import { UserProductsAvailableRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserProductsAvailableRepositoryInMemory";
import { ICreateSpecialistScheduleDTO } from "@modules/specialists/dtos/ICreateSpecialistScheduleDTO";
import { SpecialistScheduleStatusEnum } from "@modules/specialists/enums/SpecialistScheduleStatusEnum";
import { SpecialistScheduleRepositoryInMemory } from "@modules/specialists/repositories/in-memory/SpecialistScheduleRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { ScheduleGoogle } from "@shared/container/providers/ScheduleProvider/implementations/ScheduleGoogle";
import { CreateSpecialistScheduleUseCase } from "../createSpecialistScheduleAvailable/CreateSpecialistScheduleUseCase";
import { RemoveSpecialistScheduleUseCase } from "./RemoveSpecialistScheduleUseCase";

let createSpecialistScheduleUseCase: CreateSpecialistScheduleUseCase;
let specialistScheduleRepositoryInMemory: SpecialistScheduleRepositoryInMemory;
let removeSpecialistScheduleUseCase: RemoveSpecialistScheduleUseCase;
let dateProvider: DayjsDateProvider;
let userProductsAvailableRepositoryInMemory: UserProductsAvailableRepositoryInMemory;
let scheduleGoogle: ScheduleGoogle;

describe("Remove Specialist Schedule", () => {
    beforeEach(() => {
        specialistScheduleRepositoryInMemory =
            new SpecialistScheduleRepositoryInMemory();
        userProductsAvailableRepositoryInMemory =
            new UserProductsAvailableRepositoryInMemory();
        scheduleGoogle = new ScheduleGoogle();
        dateProvider = new DayjsDateProvider();
        createSpecialistScheduleUseCase = new CreateSpecialistScheduleUseCase(
            specialistScheduleRepositoryInMemory,
            userProductsAvailableRepositoryInMemory,
            scheduleGoogle,
            dateProvider
        );
        removeSpecialistScheduleUseCase = new RemoveSpecialistScheduleUseCase(
            specialistScheduleRepositoryInMemory
        );
    });

    it("should be able to delete a specialist schedule", async () => {
        const specialistSchedulePlan1: ICreateSpecialistScheduleDTO = {
            dateSchedule: new Date("2022-01-01 7:00"),
            status: SpecialistScheduleStatusEnum.AVAILABLE,
            specialistId: "123",
        };

        await createSpecialistScheduleUseCase.execute(specialistSchedulePlan1);

        const specialistSchedulePlan2: ICreateSpecialistScheduleDTO = {
            dateSchedule: new Date("2022-01-01 8:00"),
            status: SpecialistScheduleStatusEnum.AVAILABLE,
            specialistId: "123",
        };

        const specialistScheduleCreated =
            await createSpecialistScheduleUseCase.execute(
                specialistSchedulePlan2
            );

        const idRemoved = await removeSpecialistScheduleUseCase.execute(
            specialistScheduleCreated.id
        );

        expect(idRemoved).toBe(specialistScheduleCreated.id);
    });
});

