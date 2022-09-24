import { ICreateSimulatorVideosGroupDTO } from "@modules/products/dtos/ICreateSimulatorVideosGroupDTO";
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
        id,
    }: ICreateSimulatorVideosGroupDTO): Promise<SimulatorVideosGroup> {
        const simulatorVideosGroup = this.repository.create({
            name,
            active,
            id,
        });

        await this.repository.save(simulatorVideosGroup);

        return simulatorVideosGroup;
    }

    async find({ active, id, name }): Promise<SimulatorVideosGroup[]> {
        const simulatorVideosGroupQuery =
            this.repository.createQueryBuilder("svg");

        console.log(name);

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

        const simulatorVideoGroups = await simulatorVideosGroupQuery.getMany();

        return simulatorVideoGroups;
    }

    async remove(id: string): Promise<void> {
        this.repository.delete(id);
    }
}

export { SimulatorVideosGroupRepository };

