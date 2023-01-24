import { ResumeAddingsTypeEnum } from "@modules/resume/enums/ResumeAddingsTypeEnum";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Resume } from "./Resume";
import { v4 as uuidV4 } from "uuid";

@Entity("resumeAddings")
class ResumeAddings {
    @PrimaryColumn()
    id: string;

    @Column()
    resumeId: string;

    @Column()
    name: string;

    @Column()
    initialYear: number;

    @Column()
    finalYear: number;

    @Column()
    instituition: string;

    @Column()
    extraInfo: string;

    @Column({
        type: "enum",
        enum: ResumeAddingsTypeEnum,
    })
    type: ResumeAddingsTypeEnum;

    @ManyToOne(() => Resume, (resume) => resume.resumeAddings)
    resume: Resume;

    constructor(
        resumeId: string,
        name: string,
        initialYear: number,
        finalYear: number,
        instituition: string,
        extraInfo: string,
        type: ResumeAddingsTypeEnum,
        id: string
    ) {
        if (id) {
            this.id = id;
        }

        if (!this.id) {
            this.id = uuidV4();
        }

        this.resumeId = resumeId;
        this.name = name;
        this.initialYear = initialYear;
        this.finalYear = finalYear;
        this.instituition = instituition;
        this.type = type;
        this.extraInfo = extraInfo;
    }
}

export {ResumeAddings}