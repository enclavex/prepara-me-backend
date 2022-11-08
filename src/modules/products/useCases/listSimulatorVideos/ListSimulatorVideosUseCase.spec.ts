import { ICreateSimulatorVideosDTO } from "@modules/products/dtos/ICreateSimulatorVideosDTO";
import { SimulatorVideosRepositoryInMemory } from "@modules/products/repositories/in-memory/SimulatorVideosRepositoryInMemory";
import { CreateSimulatorVideosUseCase } from "../createSimulatorVideos/CreateSimulatorVideosUseCase";
import { ListSimulatorVideosUseCase } from "./ListSimulatorVideosUseCase";

let simulatorVideosRepositoryInMemory: SimulatorVideosRepositoryInMemory;
let createSimulatorVideosUseCase: CreateSimulatorVideosUseCase;
let listSimulatorVideosUseCase: ListSimulatorVideosUseCase;

describe("List Simulator Videos ", () => {
    beforeEach(() => {
        simulatorVideosRepositoryInMemory =
            new SimulatorVideosRepositoryInMemory();
        listSimulatorVideosUseCase = new ListSimulatorVideosUseCase(
            simulatorVideosRepositoryInMemory
        );
        createSimulatorVideosUseCase = new CreateSimulatorVideosUseCase(
            simulatorVideosRepositoryInMemory
        );
    });

    it("should be able to list Simulator Videos", async () => {
        const simulatorVideos1: ICreateSimulatorVideosDTO = {
            answerStrategy: "",
            avoid: "",
            linkVideo: "",
            necessariesSkills: "",
            objective: "",
            question: "O que é o que é?",
            simulatorVideosGroupId: "1",
            tip: "Teste",
            order: 1,
        };

        await createSimulatorVideosUseCase.execute(simulatorVideos1);

        const simulatorVideos2: ICreateSimulatorVideosDTO = {
            answerStrategy: "",
            avoid: "",
            linkVideo: "",
            necessariesSkills: "",
            objective: "",
            question: "O que é o que é?",
            simulatorVideosGroupId: "1",
            tip: "Teste",
            order: 1,
        };

        await createSimulatorVideosUseCase.execute(simulatorVideos2);

        const result = await listSimulatorVideosUseCase.execute({
            id: "",
            simulatorVideosGroupId: "",
        });

        expect(result).toHaveLength(2);
    });

    it("should be able to list Simulator Videos filtered by id", async () => {
        const simulatorVideos1: ICreateSimulatorVideosDTO = {
            answerStrategy: "",
            avoid: "",
            linkVideo: "",
            necessariesSkills: "",
            objective: "",
            question: "O que é o que é?",
            simulatorVideosGroupId: "1",
            tip: "Teste",
            order: 1,
        };

        await createSimulatorVideosUseCase.execute(simulatorVideos1);

        const simulatorVideos2: ICreateSimulatorVideosDTO = {
            answerStrategy: "",
            avoid: "",
            linkVideo: "",
            necessariesSkills: "",
            objective: "",
            question: "O que é o que é?",
            simulatorVideosGroupId: "1",
            tip: "Teste",
            order: 1,
        };

        const simulatorVideosCreated =
            await createSimulatorVideosUseCase.execute(simulatorVideos2);

        const result = await listSimulatorVideosUseCase.execute({
            id: simulatorVideosCreated.id,
            simulatorVideosGroupId: "",
        });

        expect(result).toHaveLength(1);
    });

    it("should be able to list Simulator Videos filtered by group", async () => {
        const simulatorVideos1: ICreateSimulatorVideosDTO = {
            answerStrategy: "",
            avoid: "",
            linkVideo: "",
            necessariesSkills: "",
            objective: "",
            question: "O que é o que é?",
            simulatorVideosGroupId: "1",
            tip: "Teste",
            order: 1,
        };

        await createSimulatorVideosUseCase.execute(simulatorVideos1);

        const simulatorVideos2: ICreateSimulatorVideosDTO = {
            answerStrategy: "",
            avoid: "",
            linkVideo: "",
            necessariesSkills: "",
            objective: "",
            question: "O que é o que é?",
            simulatorVideosGroupId: "2",
            tip: "Teste",
            order: 1,
        };

        await createSimulatorVideosUseCase.execute(simulatorVideos2);

        const result = await listSimulatorVideosUseCase.execute({
            id: "",
            simulatorVideosGroupId: "2",
        });

        expect(result).toHaveLength(1);
    });
});

