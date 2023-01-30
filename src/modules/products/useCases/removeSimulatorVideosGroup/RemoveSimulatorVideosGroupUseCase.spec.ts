import { ICreateSimulatorVideosGroupDTO } from "@modules/products/dtos/ICreateSimulatorVideosGroupDTO";
import { SimulatorVideosGroupActiveEnum } from "@modules/products/enums/SimulatorVideosGroupActiveEnum";
import { SimulatorVideosGroupsRepositoryInMemory } from "@modules/products/repositories/in-memory/SimulatorVideosGroupsRepositoryInMemory";
import { CreateSimulatorVideosGroupUseCase } from "../createSimulatorVideosGroup/CreateSimulatorVideosGroupUseCase";
import { ListSimulatorVideosGroupUseCase } from "../listSimulatorVideosGroup/ListSimulatorVideosGroupUseCase";
import { RemoveSimulatorVideosGroupUseCase } from "./RemoveSimulatorVideosGroupUseCase";

let createSimulatorVideoGroupUseCase: CreateSimulatorVideosGroupUseCase;
let simulatorVideosGroupRepositoryInMemory: SimulatorVideosGroupsRepositoryInMemory;
let removeSimulatorVideoUseGroupCase: RemoveSimulatorVideosGroupUseCase;
let listSimulatorVideoGroupUseCase: ListSimulatorVideosGroupUseCase;

describe("Remove Simulator Video Group", () => {
    beforeEach(() => {
        simulatorVideosGroupRepositoryInMemory =
            new SimulatorVideosGroupsRepositoryInMemory();
        createSimulatorVideoGroupUseCase =
            new CreateSimulatorVideosGroupUseCase(
                simulatorVideosGroupRepositoryInMemory
            );
        removeSimulatorVideoUseGroupCase =
            new RemoveSimulatorVideosGroupUseCase(
                simulatorVideosGroupRepositoryInMemory
            );

        listSimulatorVideoGroupUseCase = new ListSimulatorVideosGroupUseCase(
            simulatorVideosGroupRepositoryInMemory
        );
    });

    it("should be able to delete a Simulator Video Group", async () => {
        const simulatorVideosGroupPlan1: ICreateSimulatorVideosGroupDTO = {
            active: SimulatorVideosGroupActiveEnum.ACTIVE,
            name: "teste",
            order: 0
        };

        await createSimulatorVideoGroupUseCase.execute(
            simulatorVideosGroupPlan1
        );

        const simulatorVideosGroupPlan2: ICreateSimulatorVideosGroupDTO = {
            active: SimulatorVideosGroupActiveEnum.ACTIVE,
            name: "teste",
            order: 1
        };

        const simulatorVideosGroupPlanCreated =
            await createSimulatorVideoGroupUseCase.execute(
                simulatorVideosGroupPlan2
            );

        await removeSimulatorVideoUseGroupCase.execute(
            simulatorVideosGroupPlanCreated.id
        );

        const result = await listSimulatorVideoGroupUseCase.execute({
            active: SimulatorVideosGroupActiveEnum.ACTIVE,
            id: null,
            name: null,
        });

        expect(result).toHaveLength(1);
    });
});

