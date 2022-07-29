import { ICreateCompanySubscriptionPlanDTO } from "@modules/company/dtos/ICreateCompanySubscriptionPlanDTO";
import { CompanySubscriptionPlansRepositoryInMemory } from "@modules/company/repositories/in-memory/CompanySubscriptionPlansRepositoryInMemory";
import { CreateCompanySubscriptionPlanUseCase } from "../createCompanySubscriptionPlan/CreateCompanySubscriptionPlanUseCase";
import { ListCompanySubscriptionPlanUseCase } from "./ListCompanySubscriptionPlanUseCase";

let companySubscriptionPlansRepositoryInMemory: CompanySubscriptionPlansRepositoryInMemory;
let listCompanySubscriptionPlanUseCase: ListCompanySubscriptionPlanUseCase;
let createCompanySubscriptionPlanUseCase: CreateCompanySubscriptionPlanUseCase;

describe("List Company Subscription Plans", () => {
    beforeEach(() => {
        companySubscriptionPlansRepositoryInMemory =
            new CompanySubscriptionPlansRepositoryInMemory();
        listCompanySubscriptionPlanUseCase = new ListCompanySubscriptionPlanUseCase(
            companySubscriptionPlansRepositoryInMemory
        );
        createCompanySubscriptionPlanUseCase = new CreateCompanySubscriptionPlanUseCase(
            companySubscriptionPlansRepositoryInMemory
        );
    });

    it("should be able to list company employees", async () => {
        const companySubscriptionPlan1: ICreateCompanySubscriptionPlanDTO = {
            companyId: "123",
            subscribeToken: "ABC",
            startDate: new Date("2022-01-01"),
            endDate: new Date("2022-12-31"),
            subscriptionPlanId: "123"
        };

        await createCompanySubscriptionPlanUseCase.execute(companySubscriptionPlan1);

        const companySubscriptionPlan2: ICreateCompanySubscriptionPlanDTO = {
            companyId: "123",
            subscribeToken: "ABC",
            startDate: new Date("2022-01-01"),
            endDate: new Date("2022-12-31"),
            subscriptionPlanId: "123"
        };

        await createCompanySubscriptionPlanUseCase.execute(companySubscriptionPlan2);

        const result = await listCompanySubscriptionPlanUseCase.execute({
            companyId: "",
            id: "",
            subscribeToken: "",
            subscriptionPlanId: ""
        });

        expect(result).toHaveLength(2);
    });

    it("should be able to list company subscription plan filtered by company", async () => {
        const companySubscriptionPlan1: ICreateCompanySubscriptionPlanDTO = {
            companyId: "123",
            subscribeToken: "ABC",
            startDate: new Date("2022-01-01"),
            endDate: new Date("2022-12-31"),
            subscriptionPlanId: "123"
        };

        await createCompanySubscriptionPlanUseCase.execute(companySubscriptionPlan1);

        const companySubscriptionPlan2: ICreateCompanySubscriptionPlanDTO = {
            companyId: "1234",
            subscribeToken: "ABC",
            startDate: new Date("2022-01-01"),
            endDate: new Date("2022-12-31"),
            subscriptionPlanId: "123"
        };

        await createCompanySubscriptionPlanUseCase.execute(companySubscriptionPlan2);

        const result = await listCompanySubscriptionPlanUseCase.execute({
            companyId: "1234",
            id: "",
            subscribeToken: "",
            subscriptionPlanId: ""
        });

        expect(result).toHaveLength(1);
    });

    it("should be able to list company subscription plan filtered by subscribe token", async () => {
        const companySubscriptionPlan1: ICreateCompanySubscriptionPlanDTO = {
            companyId: "123",
            subscribeToken: "ABC",
            startDate: new Date("2022-01-01"),
            endDate: new Date("2022-12-31"),
            subscriptionPlanId: "123"
        };

        await createCompanySubscriptionPlanUseCase.execute(companySubscriptionPlan1);

        const companySubscriptionPlan2: ICreateCompanySubscriptionPlanDTO = {
            companyId: "1234",
            subscribeToken: "ZXC",
            startDate: new Date("2022-01-01"),
            endDate: new Date("2022-12-31"),
            subscriptionPlanId: "123"
        };

        await createCompanySubscriptionPlanUseCase.execute(companySubscriptionPlan2);

        const result = await listCompanySubscriptionPlanUseCase.execute({
            companyId: "",
            id: "",
            subscribeToken: "ZXC",
            subscriptionPlanId: ""
        });

        expect(result).toHaveLength(1);
    });

    it("should be able to list company subscription plan filtered by subscribe subcsription plan", async () => {
        const companySubscriptionPlan1: ICreateCompanySubscriptionPlanDTO = {
            companyId: "123",
            subscribeToken: "ABC",
            startDate: new Date("2022-01-01"),
            endDate: new Date("2022-12-31"),
            subscriptionPlanId: "123"
        };

        await createCompanySubscriptionPlanUseCase.execute(companySubscriptionPlan1);

        const companySubscriptionPlan2: ICreateCompanySubscriptionPlanDTO = {
            companyId: "1234",
            subscribeToken: "ZXC",
            startDate: new Date("2022-01-01"),
            endDate: new Date("2022-12-31"),
            subscriptionPlanId: "1234"
        };

        await createCompanySubscriptionPlanUseCase.execute(companySubscriptionPlan2);

        const result = await listCompanySubscriptionPlanUseCase.execute({
            companyId: "",
            id: "",
            subscribeToken: "",
            subscriptionPlanId: "123"
        });

        expect(result).toHaveLength(1);
    });

});

