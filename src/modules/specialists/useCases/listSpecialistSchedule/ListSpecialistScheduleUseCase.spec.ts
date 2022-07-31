import { UserProductsAvailableRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserProductsAvailableRepositoryInMemory";
import { ICreateSpecialistScheduleDTO } from "@modules/specialists/dtos/ICreateSpecialistScheduleDTO";
import { SpecialistScheduleStatusEnum } from "@modules/specialists/enums/SpecialistScheduleStatusEnum";
import { SpecialistScheduleRepositoryInMemory } from "@modules/specialists/repositories/in-memory/SpecialistScheduleRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { ScheduleGoogle } from "@shared/container/providers/ScheduleProvider/implementations/ScheduleGoogle";
import { CreateSpecialistScheduleUseCase } from "../createSpecialistScheduleAvailable/CreateSpecialistScheduleUseCase";
import { ListSpecialistScheduleUseCase } from "./ListSpecialistScheduleUseCase";

let specialistScheduleRepositoryInMemory: SpecialistScheduleRepositoryInMemory;
let createSpecialistScheduleUseCase: CreateSpecialistScheduleUseCase;
let listSpecialistScheduleUseCase: ListSpecialistScheduleUseCase;
let dateProvider: DayjsDateProvider;
let userProductsAvailableRepositoryInMemory: UserProductsAvailableRepositoryInMemory;
let scheduleGoogle: ScheduleGoogle;

describe("List Specialist Schedule ", () => {
    beforeAll(() => {
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
        listSpecialistScheduleUseCase = new ListSpecialistScheduleUseCase(
            specialistScheduleRepositoryInMemory,
            dateProvider
        );
    });

    it("should be able to list a specialist schedule available", async () => {
        const specialistSchedule: ICreateSpecialistScheduleDTO = {
            dateSchedule: dateProvider.getDate(new Date("2022-01-01 15:00:00")),
            status: SpecialistScheduleStatusEnum.AVAILABLE,
            specialistId: "1234",
        };

        await createSpecialistScheduleUseCase.execute(specialistSchedule);

        const result = await listSpecialistScheduleUseCase.execute({
            dateBegin: dateProvider.getDate(new Date("2022-01-01 15:00:00")),
            dateEnd: dateProvider.getDate(new Date("2022-01-01 15:00:00")),
            specialistId: "1234",
            id: "",
            userId: "",
            productId: "",
            status: "",
        });

        expect(result).toHaveLength(1);
    });
});

