import { container } from "tsyringe";
import { ScheduleGoogle } from "./implementations/ScheduleGoogle";

import { IScheduleProvider } from "./IScheduleProvider";

container.registerSingleton<IScheduleProvider>(
    "ScheduleGoogle",
    ScheduleGoogle
);
