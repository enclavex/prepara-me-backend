import { SimulatorVideosGroupActiveEnum } from "@modules/products/enums/SimulatorVideosGroupActiveEnum";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { SimulatorVideos } from "./SimulatorVideos";

@Entity("simulatorVideosGroup")
class SimulatorVideosGroup {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    order: number;

    @Column({
        type: "enum",
        enum: SimulatorVideosGroupActiveEnum,
        default: SimulatorVideosGroupActiveEnum.ACTIVE,
    })
    active: SimulatorVideosGroupActiveEnum;

    @OneToMany(
        () => SimulatorVideos,
        (simulatorVideos) => simulatorVideos.simulatorVideosGroup
    )
    public simulatorVideos!: SimulatorVideos[];

    constructor(
        name: string,
        active: SimulatorVideosGroupActiveEnum,
        id: string,
        order: number
    ) {
        if (id) {
            this.id = id;
        }

        if (!this.id) {
            this.id = uuidV4();
        }

        this.name = name;
        this.active = active;
        this.order = order;
    }
}

export { SimulatorVideosGroup };

