import { ICreateSimulatorVideosGroupDTO } from "@modules/products/dtos/ICreateSimulatorVideosGroupDTO";
import { SimulatorVideosGroupActiveEnum } from "@modules/products/enums/SimulatorVideosGroupActiveEnum";
import { SimulatorVideosGroupsRepositoryInMemory } from "@modules/products/repositories/in-memory/SimulatorVideosGroupsRepositoryInMemory";
import { CreateSimulatorVideosGroupUseCase } from "../createSimulatorVideosGroup/CreateSimulatorVideosGroupUseCase";
import { ListSimulatorVideosGroupUseCase } from "./ListSimulatorVideosGroupUseCase";

let simulatorVideosGroupsRepositoryInMemory: SimulatorVideosGroupsRepositoryInMemory;
let createSimulatorVideosGroupUseCase: CreateSimulatorVideosGroupUseCase;
let listSimulatorVideosGroupUseCase: ListSimulatorVideosGroupUseCase;

describe("List Simulator Videos Groups", () => {
    beforeEach(() => {
        simulatorVideosGroupsRepositoryInMemory =
            new SimulatorVideosGroupsRepositoryInMemory();
        listSimulatorVideosGroupUseCase = new ListSimulatorVideosGroupUseCase(
            simulatorVideosGroupsRepositoryInMemory
        );
        createSimulatorVideosGroupUseCase = new CreateSimulatorVideosGroupUseCase(
            simulatorVideosGroupsRepositoryInMemory
        );
    });

    it("should be able to list Simulator Videos", async () => {
        const simulatorVideosGroup1: ICreateSimulatorVideosGroupDTO = {
            name: "Guilherme Cordeiro",
            order: 1,
            active: SimulatorVideosGroupActiveEnum.ACTIVE,
        };

        await createSimulatorVideosGroupUseCase.execute(simulatorVideosGroup1);

        const simulatorVideosGroup2: ICreateSimulatorVideosGroupDTO = {
            name: "Guilherme Cordeiro",
            order: 1,
            active: SimulatorVideosGroupActiveEnum.ACTIVE,
        };

        await createSimulatorVideosGroupUseCase.execute(simulatorVideosGroup2);

        const result = await listSimulatorVideosGroupUseCase.execute({
            id: "",
            active: "",
            name: "",
        });

        expect(result).toHaveLength(2);
    });

    it("should be able to list Simulator Videos filtered by id", async () => {
        const simulatorVideosGroup1: ICreateSimulatorVideosGroupDTO = {
            name: "Guilherme Cordeiro",
            order: 1,
            active: SimulatorVideosGroupActiveEnum.ACTIVE,
        };

        await createSimulatorVideosGroupUseCase.execute(simulatorVideosGroup1);

        const simulatorVideosGroup2: ICreateSimulatorVideosGroupDTO = {
            name: "Guilherme Cordeiro",
            order: 1,
            active: SimulatorVideosGroupActiveEnum.ACTIVE,
        };

        const simulatorVideosGroupCreated = await createSimulatorVideosGroupUseCase.execute(
            simulatorVideosGroup2
        );

        const result = await listSimulatorVideosGroupUseCase.execute({
            id: simulatorVideosGroupCreated.id,
            active: "",
            name: "",
        });

        expect(result).toHaveLength(1);
    });

    it("should be able to list Simulator Videos filtered by active", async () => {
        const simulatorVideosGroup1: ICreateSimulatorVideosGroupDTO = {
            name: "Guilherme Cordeiro",
            order: 1,
            active: SimulatorVideosGroupActiveEnum.ACTIVE,
        };

        await createSimulatorVideosGroupUseCase.execute(simulatorVideosGroup1);

        const simulatorVideosGroup2: ICreateSimulatorVideosGroupDTO = {
            name: "Guilherme Cordeiro",
            order: 1,
            active: SimulatorVideosGroupActiveEnum.INACTIVE,
        };

        await createSimulatorVideosGroupUseCase.execute(
            simulatorVideosGroup2
        );

        const result = await listSimulatorVideosGroupUseCase.execute({
            id: "",
            active: SimulatorVideosGroupActiveEnum.INACTIVE,
            name: "",
        });

        expect(result).toHaveLength(1);
    });
});

