import { ICreateResumeDTO } from "@modules/resume/dtos/ICreateResumeDTO";
import { IResumeRepository } from "@modules/resume/repositories/IResumeRepository";
import { getRepository, Repository } from "typeorm";
import { Resume } from "../entities/Resume";
import { ResumeAddings } from "../entities/ResumeAddings";

class ResumeRepository implements IResumeRepository {
    private resumeRepository: Repository<Resume>;
    private resumeAddingsRepository: Repository<ResumeAddings>;

    constructor() {
        this.resumeRepository = getRepository(Resume);
        this.resumeAddingsRepository = getRepository(ResumeAddings);
    }

    async create({
        city,
        email,
        extraInfo, 
        linkedinURL,
        name,
        objectives,
        phone,
        portfolioURL,
        professionalResume,
        state,
        userId,
        resumeAddings,
        id,
    }: ICreateResumeDTO): Promise<Resume> {
        const resumeCreated = this.resumeRepository.create({
            city,
            email,
            extraInfo,
            linkedinURL,
            name,
            objectives,
            phone,
            portfolioURL,
            professionalResume,
            state,
            userId,
            id,
        });

        await Promise.all(
            resumeAddings.map(async (resumeAdding) => {
                resumeCreated.resumeAddings.push(
                    this.resumeAddingsRepository.create({
                        ...resumeAdding,
                    })
                );
            })
        );

        await this.resumeRepository.save(resumeCreated);

        return resumeCreated;
    }

    async find({ userId, id }): Promise<Resume[]> {
        const resumeQuery = this.resumeRepository
            .createQueryBuilder("r")
            .leftJoinAndSelect("r.user", "u")
            .leftJoinAndSelect("r.resumeAddings", "ra");

        if (id) {
            resumeQuery.andWhere("r.id = :id", {
                id: id,
            });
        } else {
            if (userId) {
                resumeQuery.andWhere("r.userId = :userId", {
                    userId: userId,
                });
            }
        }

        const resumes = await resumeQuery.getMany();

        return resumes;
    }

    async remove(id: string): Promise<void> {
        this.resumeRepository.delete(id);
    }
}

export { ResumeRepository };

