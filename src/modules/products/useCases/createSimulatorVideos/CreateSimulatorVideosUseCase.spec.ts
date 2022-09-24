import { ICreateSimulatorVideosDTO } from "@modules/products/dtos/ICreateSimulatorVideosDTO";
import { SimulatorVideosRepositoryInMemory } from "@modules/products/repositories/in-memory/SimulatorVideosRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateSimulatorVideosUseCase } from "./CreateSimulatorVideosUseCase";

let simulatorVideosRepositoryInMemory: SimulatorVideosRepositoryInMemory;
let createSimulatorVideosUseCase: CreateSimulatorVideosUseCase;

describe("Create Simulator Videos ", () => {
    beforeEach(() => {
        simulatorVideosRepositoryInMemory =
            new SimulatorVideosRepositoryInMemory();
        createSimulatorVideosUseCase = new CreateSimulatorVideosUseCase(
            simulatorVideosRepositoryInMemory
        );
    });

    it("shold be able to create a new Simulator Videos", async () => {
        const simulatorVideos: ICreateSimulatorVideosDTO = {
            answerStrategy: "",
            avoid: "",
            linkVideo: "",
            necessariesSkills: "",
            objective: "",
            question: "O que é o que é?",
            simulatorVideosGroupId: "1",
            tip: "Teste",
        };

        const result = await createSimulatorVideosUseCase.execute(
            simulatorVideos
        );

        expect(result).toHaveProperty("id");
    });

    it("should not be able to create a Simulator Videos without a question", async () => {
        expect(async () => {
            const simulatorVideos: ICreateSimulatorVideosDTO = {
                answerStrategy: "",
                avoid: "",
                linkVideo: "",
                necessariesSkills: "",
                objective: "",
                question: "",
                simulatorVideosGroupId: "1",
                tip: "Teste",
            };

            await createSimulatorVideosUseCase.execute(simulatorVideos);
        }).rejects.toBeInstanceOf(AppError);
    });
});

