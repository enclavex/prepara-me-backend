import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { NPSSurveyAnswers } from "../entities/NPSSurveyAnswers";

@injectable()
class NPSSurveyAnswersUseCase {
    async execute({
        companyId
    }) {
        const npsSurveyAnswers = new NPSSurveyAnswers()

        const result = await npsSurveyAnswers.report(companyId)

        console.log(result)

        return result;
    }
}

export { NPSSurveyAnswersUseCase };
