import { ICreateSimulatorVideosGroupDTO } from "@modules/products/dtos/ICreateSimulatorVideosGroupDTO";
import { IResponseSimulatorVideosGroupDTO } from "@modules/products/dtos/IResponseSimulatorVideosGroupDTO";
import { SimulatorVideosGroupMap } from "@modules/products/mapper/SimulatorVideosGroupMap";
import { ISimulatorVideosGroupsRepository } from "@modules/products/repositories/ISimulatorVideosGroupsRepository";
import { getRepository, Repository } from "typeorm";
import { SimulatorVideosGroup } from "../entities/SimulatorVideosGroup";

class SimulatorVideosGroupRepository
    implements ISimulatorVideosGroupsRepository
{
    private repository: Repository<SimulatorVideosGroup>;

    constructor() {
        this.repository = getRepository(SimulatorVideosGroup);
    }

    async create({
        active,
        name,
        order,
        id,
    }: ICreateSimulatorVideosGroupDTO): Promise<SimulatorVideosGroup> {
        const simulatorVideosGroup = this.repository.create({
            name,
            active,
            order,
            id,
        });

        await this.repository.save(simulatorVideosGroup);

        return simulatorVideosGroup;
    }

    async find({
        active,
        id,
        name,
    }): Promise<IResponseSimulatorVideosGroupDTO[]> {
        const simulatorVideosGroupQuery =
            this.repository.createQueryBuilder("svg");

        if (id) {
            simulatorVideosGroupQuery.andWhere("svg.id = :id", {
                id: id,
            });
        } else {
            if (active) {
                simulatorVideosGroupQuery.andWhere("svg.active = :active", {
                    active: active,
                });
            }

            if (name) {
                name = `%${name}%`;

                simulatorVideosGroupQuery.andWhere("svg.name like :name", {
                    name: name,
                });
            }
        }

        simulatorVideosGroupQuery.orderBy("svg.order", "ASC");

        const simulatorVideosGroups = await simulatorVideosGroupQuery.getMany();

        const simulatorVideosGroupsMaped = simulatorVideosGroups.map(
            (simulatorVideosGroup) => {
                return SimulatorVideosGroupMap.toDTO(simulatorVideosGroup);
            }
        );

        return simulatorVideosGroupsMaped;
    }

    async remove(id: string): Promise<void> {
        this.repository.delete(id);
    }
}

export { SimulatorVideosGroupRepository };

