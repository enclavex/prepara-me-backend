import { instanceToInstance } from "class-transformer";
import { IResponseSimulatorVideosGroupDTO } from "../dtos/IResponseSimulatorVideosGroupDTO";
import { SimulatorVideosGroup } from "../infra/typeorm/entities/SimulatorVideosGroup";

class SimulatorVideosGroupMap {
    static toDTO({
        id,
        name,
        order,
        active,
    }: SimulatorVideosGroup): IResponseSimulatorVideosGroupDTO {
        const activeMapped = active === "ACTIVE" ? "Ativo" : "Inativo";

        const simulatorVideosGroup = instanceToInstance({
            id,
            name,
            active: { label: activeMapped, value: active },
            order
        });

        return simulatorVideosGroup;
    }
}

export { SimulatorVideosGroupMap };
