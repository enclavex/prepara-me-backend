import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { SimulatorVideosGroup } from "./SimulatorVideosGroup";

@Entity("simulatorVideo")
class SimulatorVideos {
    @PrimaryColumn()
    id: string;

    @Column()
    question: string;

    @Column()
    linkVideo: string;

    @Column()
    tip: string;

    @Column()
    answerStrategy: string;

    @Column()
    avoid: string;

    @Column()
    objective: string;

    @Column()
    necessariesSkills: string;

    @Column()
    simulatorVideosGroupId: string;

    @ManyToOne(
        () => SimulatorVideosGroup,
        (simulatorVideosGroup) => simulatorVideosGroup.simulatorVideos
    )
    simulatorVideosGroup: SimulatorVideosGroup;

    constructor(
        question: string,
        linkVideo: string,
        tip: string,
        answerStrategy: string,
        avoid: string,
        objective: string,
        necessariesSkills: string,
        id: string,
        simulatorVideosGroupId: string
    ) {
        if (id) {
            this.id = id;
        }

        if (!this.id) {
            this.id = uuidV4();
        }

        this.question = question;
        this.linkVideo = linkVideo;
        this.tip = tip;
        this.answerStrategy = answerStrategy;
        this.avoid = avoid;
        this.objective = objective;
        this.necessariesSkills = necessariesSkills;
        this.simulatorVideosGroupId = simulatorVideosGroupId;
    }
}

export { SimulatorVideos };

