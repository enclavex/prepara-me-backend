import { ICreateSimulatorVideosGroupDTO } from "@modules/products/dtos/ICreateSimulatorVideosGroupDTO";
import { IResponseSimulatorVideosGroupDTO } from "@modules/products/dtos/IResponseSimulatorVideosGroupDTO";
import { SimulatorVideosGroup } from "@modules/products/infra/typeorm/entities/SimulatorVideosGroup";
import { SimulatorVideosGroupMap } from "@modules/products/mapper/SimulatorVideosGroupMap";
import { ISimulatorVideosGroupsRepository } from "../ISimulatorVideosGroupsRepository";

class SimulatorVideosGroupsRepositoryInMemory
    implements ISimulatorVideosGroupsRepository
{
    simulatorVideosGroups: SimulatorVideosGroup[] = [];

    async create({
        id,
        active,
        name,
        order,
    }: ICreateSimulatorVideosGroupDTO): Promise<SimulatorVideosGroup> {
        const simulatorVideosGroup = new SimulatorVideosGroup(name, active, id, order);

        this.simulatorVideosGroups.push(simulatorVideosGroup);

        return simulatorVideosGroup;
    }

    async find({
        name,
        active,
        id,
    }): Promise<IResponseSimulatorVideosGroupDTO[]> {
        let simulatorVideosGroups = this.simulatorVideosGroups;

        if (id) {
            simulatorVideosGroups = simulatorVideosGroups.filter(
                (simulatorVideosGroup) => {
                    return simulatorVideosGroup.id === id;
                }
            );
        } else {
            if (active) {
                simulatorVideosGroups = simulatorVideosGroups.filter(
                    (simulatorVideosGroup) => {
                        return simulatorVideosGroup.active === active;
                    }
                );
            }

            if (name) {
                simulatorVideosGroups = simulatorVideosGroups.filter(
                    (simulatorVideosGroup) => {
                        return simulatorVideosGroup.name === name;
                    }
                );
            }
        }

        const simulatorVideoGroupsMaped = simulatorVideosGroups.map(
            (simulatorVideosGroup) => {
                return SimulatorVideosGroupMap.toDTO(simulatorVideosGroup);
            }
        );

        return simulatorVideoGroupsMaped;
    }

    async remove(id: string): Promise<void> {
        this.simulatorVideosGroups = this.simulatorVideosGroups.filter(
            (simulatorVideosGroup) => {
                return id !== simulatorVideosGroup.id;
            }
        );
    }
}

export { SimulatorVideosGroupsRepositoryInMemory };

