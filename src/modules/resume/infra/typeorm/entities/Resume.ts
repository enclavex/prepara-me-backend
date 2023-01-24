import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { ResumeAddings } from "./ResumeAddings";

@Entity("resume")
class Resume {
    @PrimaryColumn()
    id: string;

    @Column()
    userId: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    linkedinURL: string;

    @Column()
    portfolioURL: string;

    @Column()
    objectives: string;

    @Column()
    professionalResume: string;

    @Column()
    extraInfo: string;

    @OneToMany(() => ResumeAddings, (resumeAdding) => resumeAdding.resume)
    resumeAddings: ResumeAddings[];

    constructor(
        id: string,
        userId: string,
        name: string,
        email: string,
        phone: string,
        city: string,
        state: string,
        linkedinURL: string,
        portfolioURL: string,
        objectives: string,
        professionalResume: string,
        extraInfo: string
    ) {
        if (id) {
            this.id = id;
        }

        if (!this.id) {
            this.id = uuidV4();
        }

        this.name = name;
        this.userId = userId;
        this.email = email;
        this.phone = phone;
        this.city = city;
        this.state = state;
        this.linkedinURL = linkedinURL;
        this.portfolioURL = portfolioURL;
        this.objectives = objectives;
        this.professionalResume = professionalResume;
        this.extraInfo = extraInfo;
    }
}

export { Resume };
