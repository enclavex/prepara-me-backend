import { ICreateCompanySubscriptionPlanDTO } from "@modules/company/dtos/ICreateCompanySubscriptionPlanDTO";
import { CompanySubscriptionPlansRepositoryInMemory } from "@modules/company/repositories/in-memory/CompanySubscriptionPlansRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCompanySubscriptionPlanUseCase } from "./CreateCompanySubscriptionPlanUseCase";

let companySubscriptionPlansRepositoryInMemory: CompanySubscriptionPlansRepositoryInMemory;
let createCompanySubscriptionPlanUseCase: CreateCompanySubscriptionPlanUseCase;

describe("Create Company Subscription Plan", () => {
    beforeEach(() => {
        companySubscriptionPlansRepositoryInMemory =
            new CompanySubscriptionPlansRepositoryInMemory();
        createCompanySubscriptionPlanUseCase =
            new CreateCompanySubscriptionPlanUseCase(
                companySubscriptionPlansRepositoryInMemory
            );
    });

    it("shold be able to create a new Company Subscription Plan", async () => {
        const companySubscriptionPlan: ICreateCompanySubscriptionPlanDTO = {
            companyId: "123",
            subscriptionPlanId: "123",
            startDate: new Date("2022-01-01"),
            endDate: new Date("2022-12-31"),
            subscribeToken: "123",
        };

        const result = await createCompanySubscriptionPlanUseCase.execute(
            companySubscriptionPlan
        );

        expect(result).toHaveProperty("id");
    });

    it("should not be able to create a Company Subscription Plan without a company", async () => {
        expect(async () => {
            const companySubscriptionPlan: ICreateCompanySubscriptionPlanDTO = {
                companyId: "",
                subscriptionPlanId: "123",
                startDate: new Date("2022-01-01"),
                endDate: new Date("2022-12-31"),
                subscribeToken: "123",
            };

            await createCompanySubscriptionPlanUseCase.execute(
                companySubscriptionPlan
            );
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a Company Subscription Plan without a subscription plan", async () => {
        expect(async () => {
            const companySubscriptionPlan: ICreateCompanySubscriptionPlanDTO = {
                companyId: "123",
                subscriptionPlanId: "",
                startDate: new Date("2022-01-01"),
                endDate: new Date("2022-12-31"),
                subscribeToken: "123",
            };

            await createCompanySubscriptionPlanUseCase.execute(
                companySubscriptionPlan
            );
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a Company Subscription Plan without a start date", async () => {
        expect(async () => {
            const companySubscriptionPlan: ICreateCompanySubscriptionPlanDTO = {
                companyId: "123",
                subscriptionPlanId: "",
                startDate: new Date(null),
                endDate: new Date("2022-12-31"),
                subscribeToken: "123",
            };

            await createCompanySubscriptionPlanUseCase.execute(
                companySubscriptionPlan
            );
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a Company Subscription Plan without a end date", async () => {
        expect(async () => {
            const companySubscriptionPlan: ICreateCompanySubscriptionPlanDTO = {
                companyId: "123",
                subscriptionPlanId: "123",
                startDate: new Date("2022-01-01"),
                endDate: new Date(null),
                subscribeToken: "123",
            };

            await createCompanySubscriptionPlanUseCase.execute(
                companySubscriptionPlan
            );
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a Company Subscription Plan with a end date before start date", async () => {
        expect(async () => {
            const companySubscriptionPlan: ICreateCompanySubscriptionPlanDTO = {
                companyId: "123",
                subscriptionPlanId: "123",
                startDate: new Date("2022-01-01"),
                endDate: new Date("2021-01-01"),
                subscribeToken: "123",
            };

            await createCompanySubscriptionPlanUseCase.execute(
                companySubscriptionPlan
            );
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a Company Subscription Plan without a subscribe token", async () => {
        expect(async () => {
            const companySubscriptionPlan: ICreateCompanySubscriptionPlanDTO = {
                companyId: "123",
                subscriptionPlanId: "123",
                startDate: new Date("2022-01-01"),
                endDate: new Date("2022-12-31"),
                subscribeToken: "",
            };

            await createCompanySubscriptionPlanUseCase.execute(
                companySubscriptionPlan
            );
        }).rejects.toBeInstanceOf(AppError);
    });
});

