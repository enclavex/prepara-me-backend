import { ICreateCompanySubscriptionPlanDTO } from "@modules/company/dtos/ICreateCompanySubscriptionPlanDTO";
import { CompanySubscriptionPlansRepositoryInMemory } from "@modules/company/repositories/in-memory/CompanySubscriptionPlansRepositoryInMemory";
import { CreateCompanySubscriptionPlanUseCase } from "../createCompanySubscriptionPlan/CreateCompanySubscriptionPlanUseCase";
import { RemoveCompanySubscriptionPlanUseCase } from "./RemoveCompanySubscriptionPlanUseCase";

let createCompanySubscriptionPlanUseCase: CreateCompanySubscriptionPlanUseCase;
let companySubscriptionPlansRepositoryInMemory: CompanySubscriptionPlansRepositoryInMemory;
let removeCompanySubscriptionPlanUseCase: RemoveCompanySubscriptionPlanUseCase;

describe("Remove Company Subscription Plan", () => {
    beforeEach(() => {
        companySubscriptionPlansRepositoryInMemory =
            new CompanySubscriptionPlansRepositoryInMemory();
        createCompanySubscriptionPlanUseCase =
            new CreateCompanySubscriptionPlanUseCase(
                companySubscriptionPlansRepositoryInMemory
            );
        removeCompanySubscriptionPlanUseCase =
            new RemoveCompanySubscriptionPlanUseCase(
                companySubscriptionPlansRepositoryInMemory
            );
    });

    it("should be able to delete a company subscription plan", async () => {
        const companySubscriptionPlan1: ICreateCompanySubscriptionPlanDTO = {
            companyId: "123",
            subscriptionPlanId: "123",
            startDate: new Date("2021-01-01"),
            endDate: new Date("2021-01-02"),
            subscribeToken: "X",
        };

        await createCompanySubscriptionPlanUseCase.execute(
            companySubscriptionPlan1
        );

        const companySubscriptionPlan2: ICreateCompanySubscriptionPlanDTO = {
            companyId: "1233",
            subscriptionPlanId: "1233",
            startDate: new Date("2021-01-01"),
            endDate: new Date("2021-01-02"),
            subscribeToken: "Y",
        };

        const companySubscriptionPlanCreated =
            await createCompanySubscriptionPlanUseCase.execute(
                companySubscriptionPlan2
            );

        const idRemoved = await removeCompanySubscriptionPlanUseCase.execute(
            companySubscriptionPlanCreated.id
        );

        expect(idRemoved).toBe(companySubscriptionPlanCreated.id)
    });
});
