import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
    getDateTimeZone(date: Date): Date {
        const timeZone = parseInt(process.env.TIMEZONE)

        return this.addHours(timeZone, this.getDate(date))
    }

    getDate(date: Date): Date {
        return dayjs(date).toDate()
    }

    isBetween(dateVerified: Date, dateStart: Date, dateEnd: Date): Boolean {
        return dateVerified >= dateStart && dateVerified <= dateEnd
    }

    getSunday(date: Date): Date {
        if (!date) {
            date = new Date()
        }

        const todayWeekDay = date.getDay()
        const actualWeekSundayMonthDay = date.getDate() - todayWeekDay

        date.setDate(actualWeekSundayMonthDay)

        return new Date(date)
    }

    getSaturday(date: Date): Date {
        if (!date) {
            date = new Date()
        }

        const todayWeekDay = date.getDay()

        date = this.addDays((7 - todayWeekDay), date)

        return date
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date);
    }

    addHours(hours: number, date?: Date): Date {
        return dayjs(date).add(hours, "hour").toDate();
    }

    addDays(days: number, date?: Date): Date {
        if (!date) {
            date = dayjs().toDate()
        }

        return dayjs(date).add(days, "days").toDate();
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
