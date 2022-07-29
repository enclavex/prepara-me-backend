import { ICreateCompanySubscriptionPlanDTO } from "@modules/company/dtos/ICreateCompanySubscriptionPlanDTO";
import { ICompanySubscriptionPlansRepository } from "@modules/company/repositories/ICompanySubscriptionPlansRepository";
import { getRepository, Repository } from "typeorm";
import { CompanySubscriptionPlan } from "../entities/CompanySubscriptionPlan";

class CompanySubscriptionPlansRepository
    implements ICompanySubscriptionPlansRepository
{
    private repository: Repository<CompanySubscriptionPlan>;

    constructor() {
        this.repository = getRepository(CompanySubscriptionPlan);
    }

    async create({
        companyId,
        subscriptionPlanId,
        startDate,
        endDate,
        subscribeToken,
        id,
    }: ICreateCompanySubscriptionPlanDTO): Promise<CompanySubscriptionPlan> {
        const companySubscriptionPlan = this.repository.create({
            companyId,
            subscriptionPlanId,
            startDate,
            endDate,
            subscribeToken,
            id,
        });

        await this.repository.save(companySubscriptionPlan);

        return companySubscriptionPlan;
    }

    async find({
        companyId,
        subscriptionPlanId,
        subscribeToken,
        id,
    }): Promise<CompanySubscriptionPlan[]> {
        const companySubcsriptionPlansQuery = this.repository
            .createQueryBuilder("sp")

        if (id) {
            companySubcsriptionPlansQuery.andWhere("sp.id = :id", {
                id: id,
            });
        } else {
            if (companyId) {
                companySubcsriptionPlansQuery.andWhere("sp.companyId = :companyId", {
                    companyId: companyId,
                });
            }

            if (subscriptionPlanId) {
                companySubcsriptionPlansQuery.andWhere("sp.subscriptionPlanId = :subscriptionPlanId", {
                    subscriptionPlanId: subscriptionPlanId,
                });
            }

            if (subscribeToken) {
                companySubcsriptionPlansQuery.andWhere("sp.subscribeToken = :subscribeToken", {
                    subscribeToken: subscribeToken,
                });
            }
        }
        
        const companySubcsriptionPlans = await companySubcsriptionPlansQuery.getMany();


        return companySubcsriptionPlans;
    }

    async remove(id: string): Promise<string> {
        this.repository.delete(id);

        return id
    }
}

export { CompanySubscriptionPlansRepository };

