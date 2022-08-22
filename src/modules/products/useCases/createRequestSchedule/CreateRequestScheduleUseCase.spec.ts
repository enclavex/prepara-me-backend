import { ICreateRequestScheduleDTO } from "@modules/products/dtos/ICreateRequestScheduleDTO";
import { RequestScheduleRepositoryInMemory } from "@modules/products/repositories/in-memory/RequestScheduleRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRequestScheduleUseCase } from "./CreateRequestScheduleUseCase";

let requestScheduleRepositoryInMemory: RequestScheduleRepositoryInMemory;
let createRequestScheduleUseCase: CreateRequestScheduleUseCase;

describe("Create Request Schedule", () => {
    beforeEach(() => {
        requestScheduleRepositoryInMemory =
            new RequestScheduleRepositoryInMemory();
        createRequestScheduleUseCase = new CreateRequestScheduleUseCase(
            requestScheduleRepositoryInMemory
        );
    });

    it("shold be able to create a new request schedule", async () => {
        const requestSchedule: ICreateRequestScheduleDTO = {
            email: "guilherme.r.cordeiro93@gmail.com",
            name: "Guilherme da Rosa Cordeiro",
            obs: "Teste",
        };

        const result = await createRequestScheduleUseCase.execute(
            requestSchedule
        );

        expect(result).toHaveProperty("id");
    });

    it("should not be able to create a request schedule without a email", async () => {
        expect(async () => {
            const requestSchedule: ICreateRequestScheduleDTO = {
                email: "",
                name: "Guilherme da Rosa Cordeiro",
                obs: "Teste",
            };
    
            await createRequestScheduleUseCase.execute(
                requestSchedule
            );
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a request schedule without a name", async () => {
        expect(async () => {
            const requestSchedule: ICreateRequestScheduleDTO = {
                email: "guilherme.r.cordeiro93@gmail.com",
                name: "",
                obs: "Teste",
            };
    
            await createRequestScheduleUseCase.execute(
                requestSchedule
            );
        }).rejects.toBeInstanceOf(AppError);
    });
});
