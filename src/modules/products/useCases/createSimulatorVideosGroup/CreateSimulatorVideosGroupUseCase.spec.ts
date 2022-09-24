import { ICreateSimulatorVideosGroupDTO } from "@modules/products/dtos/ICreateSimulatorVideosGroupDTO";
import { SimulatorVideosGroupActiveEnum } from "@modules/products/enums/SimulatorVideosGroupActiveEnum";
import { SimulatorVideosGroupsRepositoryInMemory } from "@modules/products/repositories/in-memory/SimulatorVideosGroupsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateSimulatorVideosGroupUseCase } from "./CreateSimulatorVideosGroupUseCase";

let simulatorVideosGroupsRepositoryInMemory: SimulatorVideosGroupsRepositoryInMemory;
let createSimulatorVideosGroupUseCase: CreateSimulatorVideosGroupUseCase;

describe("Create Simulator Videos Group", () => {
    beforeEach(() => {
        simulatorVideosGroupsRepositoryInMemory =
            new SimulatorVideosGroupsRepositoryInMemory();
        createSimulatorVideosGroupUseCase = new CreateSimulatorVideosGroupUseCase(
            simulatorVideosGroupsRepositoryInMemory
        );
    });

    it("shold be able to create a new Simulator Videos", async () => {
        const simulatorVideosGroup: ICreateSimulatorVideosGroupDTO = {
            name: "Guilherme da Rosa Cordeiro",
            active: SimulatorVideosGroupActiveEnum.ACTIVE
        };

        const result = await createSimulatorVideosGroupUseCase.execute(
            simulatorVideosGroup
        );

        expect(result).toHaveProperty("id");
    });

    it("should not be able to create a Simulator Videos without a name", async () => {
        expect(async () => {
            const simulatorVideosGroup: ICreateSimulatorVideosGroupDTO = {
                name: "",
                active: SimulatorVideosGroupActiveEnum.ACTIVE
            };
    
            await createSimulatorVideosGroupUseCase.execute(
                simulatorVideosGroup
            );
        }).rejects.toBeInstanceOf(AppError);
    });
});
