import { UserStatusEnum } from "@modules/accounts/enums/UserStatusEnum";
import { UserTypeEnum } from "@modules/accounts/enums/UserTypeEnum";
import { SpecialistSchedule } from "@modules/specialists/infra/typeorm/entities/SpecialistSchedule";
import { Expose } from "class-transformer";
import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    documentId: string;

    @Column({
        type: "enum",
        enum: UserTypeEnum,
        default: UserTypeEnum.USER,
    })
    type: UserTypeEnum;
    
    @Column({
        type: "enum",
        enum: UserStatusEnum,
        default: UserStatusEnum.ACTIVE,
    })
    active: UserStatusEnum;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => SpecialistSchedule, specialistSchedule => specialistSchedule.specialist)
    specialistSchedule: SpecialistSchedule[];

    @Expose({ name: "avatarUrl" })
    avatarUrl(): string {
        switch (process.env.disk) {
            case "local":
                return `${process.env.APP_API_URL_PLATFORM}/avatar/${this.avatar}`;
            case "s3":
                return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
            default:
                return null;
        }
    }

    constructor(
        name: string,
        username: string,
        email: string,
        password: string,
        documentId: string,
        type: UserTypeEnum,
        active: UserStatusEnum,
        id: string
    ) {
        if (id) {
            this.id = id
        }

        if (!this.id) {
            this.id = uuidV4();
        }
        
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.documentId = documentId;
        this.type = type;
        this.active = active;
    }
}

export { User };
