import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date);
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, "hour").toDate();
    }

    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }

    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    compareInHours(start_date: Date, end_date: Date): number {
        return dayjs(this.convertToUTC(end_date)).diff(
            this.convertToUTC(start_date),
            "hours"
        );
    }

    compareInDays(start_date: Date, end_date: Date): number {
        return dayjs(this.convertToUTC(end_date)).diff(
            this.convertToUTC(start_date),
            "days"
        );
    }
}

export { DayjsDateProvider };
