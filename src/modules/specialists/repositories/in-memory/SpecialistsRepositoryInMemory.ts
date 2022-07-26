import { ICreateSpecialistDTO } from "@modules/specialists/dtos/ICreateSpecialistDTO";
import { ISpecialistResponseDTO } from "@modules/specialists/dtos/ISpecialistResponseDTO";
import { SpecialistMap } from "@modules/specialists/mapper/SpecialistMap";
import { ISpecialistsRepository } from "@modules/specialists/repositories/ISpecialistsRepository";
import { Specialist } from "../../infra/typeorm/entities/Specialist";

class SpecialistsRepositoryInMemory implements ISpecialistsRepository {
    specialists: Specialist[] = [];

    async create({
        name,
        bio,
        status,
        linkedinUrl,
        userId,
        id,
    }: ICreateSpecialistDTO): Promise<Specialist> {
        const specialist = new Specialist(
            name,
            bio,
            status,
            userId,
            linkedinUrl,
            id
        );

        this.specialists.push(specialist);

        return specialist;
    }

    async findById(id: string): Promise<Specialist> {
        return this.specialists.find((specialist) => specialist.id === id);
    }

    async findByIds(ids: string[]): Promise<ISpecialistResponseDTO[]> {
        return this.specialists
            .filter((specialist) => {
                return ids.includes(specialist.id);
            })
            .map((specialist) => {
                return SpecialistMap.toDTO(specialist);
            });
    }

    async find({
        name,
        status,
        userId,
        id,
    }): Promise<ISpecialistResponseDTO[]> {
        let specialists = this.specialists;

        if (id) {
            specialists = specialists.filter((specialist) => {
                return specialist.id === id;
            });
        } else {
            if (status) {
                specialists = specialists.filter((specialist) => {
                    return specialist.status === status;
                });
            }

            if (userId) {
                specialists = specialists.filter((specialist) => {
                    return specialist.userId === userId;
                });
            }

            if (name) {
                specialists = specialists.filter((specialist) => {
                    return specialist.name.includes(name);
                });
            }
        }

        return specialists.map((specialist) => {
            return SpecialistMap.toDTO(specialist);
        });
    }

    async remove(id: string) {
        this.specialists = this.specialists.filter((specialist) => {
            return id !== specialist.id;
        });
    }
}

export { SpecialistsRepositoryInMemory };

