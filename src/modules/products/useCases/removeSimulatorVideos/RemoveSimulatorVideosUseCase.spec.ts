import { ICreateSimulatorVideosDTO } from "@modules/products/dtos/ICreateSimulatorVideosDTO";
import { SimulatorVideosRepositoryInMemory } from "@modules/products/repositories/in-memory/SimulatorVideosRepositoryInMemory";
import { CreateSimulatorVideosUseCase } from "../createSimulatorVideos/CreateSimulatorVideosUseCase";
import { ListSimulatorVideosUseCase } from "../listSimulatorVideos/ListSimulatorVideosUseCase";
import { RemoveSimulatorVideosUseCase } from "./RemoveSimulatorVideosUseCase";

let createSimulatorVideoUseCase: CreateSimulatorVideosUseCase;
let simulatorVideosRepositoryInMemory: SimulatorVideosRepositoryInMemory;
let removeSimulatorVideoUseCase: RemoveSimulatorVideosUseCase;
let listSimulatorVideoUseCase: ListSimulatorVideosUseCase;

describe("Remove Simulator Video ", () => {
    beforeEach(() => {
        simulatorVideosRepositoryInMemory =
            new SimulatorVideosRepositoryInMemory();
        createSimulatorVideoUseCase = new CreateSimulatorVideosUseCase(
            simulatorVideosRepositoryInMemory
        );
        removeSimulatorVideoUseCase = new RemoveSimulatorVideosUseCase(
            simulatorVideosRepositoryInMemory
        );

        listSimulatorVideoUseCase = new ListSimulatorVideosUseCase(
            simulatorVideosRepositoryInMemory
        );
    });

    it("should be able to delete a Simulator Video ", async () => {
        const simulatorVideosPlan1: ICreateSimulatorVideosDTO = {
            answerStrategy: "",
            avoid: "",
            linkVideo: "",
            necessariesSkills: "",
            objective: "",
            question: "O que é o que é?",
            simulatorVideosGroupId: "2",
            tip: "Teste",
            order: 1
        };

        await createSimulatorVideoUseCase.execute(simulatorVideosPlan1);

        const simulatorVideosPlan2: ICreateSimulatorVideosDTO = {
            answerStrategy: "",
            avoid: "",
            linkVideo: "",
            necessariesSkills: "",
            objective: "",
            question: "O que é o que é?",
            simulatorVideosGroupId: "2",
            tip: "Teste",
            order: 2
        };

        const simulatorVideosPlanCreated =
            await createSimulatorVideoUseCase.execute(simulatorVideosPlan2);

        await removeSimulatorVideoUseCase.execute(
            simulatorVideosPlanCreated.id
        );

        const result = await listSimulatorVideoUseCase.execute({
            id: "",
            simulatorVideosGroupId: "",
        });

        expect(result).toHaveLength(1);
    });
});

