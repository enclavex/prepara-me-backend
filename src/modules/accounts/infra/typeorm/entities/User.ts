import { Expose } from "class-transformer";
import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";
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

    @Column()
    type: string;

    @Column()
    active: boolean;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @Expose({ name: "avatarUrl" })
    avatarUrl(): string {
        switch (process.env.disk) {
            case "local":
                return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
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
        type: string,
        active: boolean
    ) {
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
