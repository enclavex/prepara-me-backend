import { ICreateRequestScheduleDTO } from "@modules/products/dtos/ICreateRequestScheduleDTO";
import { RequestScheduleRepositoryInMemory } from "@modules/products/repositories/in-memory/RequestScheduleRepositoryInMemory";
import { CreateRequestScheduleUseCase } from "../createRequestSchedule/CreateRequestScheduleUseCase";
import { ListRequestScheduleUseCase } from "./ListRequestScheduleUseCase";

let requestScheduleRepositoryInMemory: RequestScheduleRepositoryInMemory;
let createRequestScheduleUseCase: CreateRequestScheduleUseCase;
let listRequestScheduleUseCase: ListRequestScheduleUseCase;

describe("List Request Schedule", () => {
    beforeEach(() => {
        requestScheduleRepositoryInMemory =
            new RequestScheduleRepositoryInMemory();
        listRequestScheduleUseCase = new ListRequestScheduleUseCase(
            requestScheduleRepositoryInMemory
        );
        createRequestScheduleUseCase = new CreateRequestScheduleUseCase(
            requestScheduleRepositoryInMemory
        );
    });

    it("should be able to list request schedules", async () => {
        const requestSchedule1: ICreateRequestScheduleDTO = {
            email: "guilherme.r.cordeiro93@gmail.com",
            name: "Guilherme Cordeiro",
            obs: "teste",
        };

        await createRequestScheduleUseCase.execute(requestSchedule1);

        const requestSchedule2: ICreateRequestScheduleDTO = {
            email: "guilherme.r.cordeiro93@gmail.com",
            name: "Guilherme Cordeiro",
            obs: "teste",
        };

        await createRequestScheduleUseCase.execute(requestSchedule2);

        const result = await listRequestScheduleUseCase.execute({
            id: "",
        });

        expect(result).toHaveLength(2);
    });

    it("should be able to list request schedule filtered by id", async () => {
        const requestSchedule1: ICreateRequestScheduleDTO = {
            email: "guilherme.r.cordeiro93@gmail.com",
            name: "Guilherme Cordeiro",
            obs: "teste",
        };

        await createRequestScheduleUseCase.execute(requestSchedule1);

        const requestSchedule2: ICreateRequestScheduleDTO = {
            email: "guilherme.r.cordeiro93@gmail.com",
            name: "Guilherme Cordeiro",
            obs: "teste",
        };

        const requestScheduleCreated =
            await createRequestScheduleUseCase.execute(requestSchedule2);

        const result = await listRequestScheduleUseCase.execute({
            id: requestScheduleCreated.id,
        });

        expect(result).toHaveLength(1);
    });
});

