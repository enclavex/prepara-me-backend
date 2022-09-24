import { ICreateSimulatorVideosGroupDTO } from "@modules/products/dtos/ICreateSimulatorVideosGroupDTO";
import { SimulatorVideosGroup } from "@modules/products/infra/typeorm/entities/SimulatorVideosGroup";
import { ISimulatorVideosGroupsRepository } from "../ISimulatorVideosGroupsRepository";

class SimulatorVideosGroupsRepositoryInMemory implements ISimulatorVideosGroupsRepository {
    simulatorVideosGroups: SimulatorVideosGroup[] = [];

    async create({
        id,
        active,
        name,
    }: ICreateSimulatorVideosGroupDTO): Promise<SimulatorVideosGroup> {
        const simulatorVideosGroup = new SimulatorVideosGroup(name, active, id);

        this.simulatorVideosGroups.push(simulatorVideosGroup);

        return simulatorVideosGroup;
    }

    async find({ name, active, id }): Promise<SimulatorVideosGroup[]> {
        let simulatorVideosGroups = this.simulatorVideosGroups;

        if (id) {
            simulatorVideosGroups = simulatorVideosGroups.filter((simulatorVideosGroup) => {
                return simulatorVideosGroup.id === id;
            });
        } else {
            if (active) {
                simulatorVideosGroups = simulatorVideosGroups.filter((simulatorVideosGroup) => {
                    return simulatorVideosGroup.active === active;
                });
            }

            if (name) {
                simulatorVideosGroups = simulatorVideosGroups.filter((simulatorVideosGroup) => {
                    return simulatorVideosGroup.name === name;
                });
            }
        }

        return simulatorVideosGroups;
    }

    async remove(id: string): Promise<void> {
        this.simulatorVideosGroups = this.simulatorVideosGroups.filter((simulatorVideosGroup) => {
            return id !== simulatorVideosGroup.id;
        });
    }
}

export { SimulatorVideosGroupsRepositoryInMemory };