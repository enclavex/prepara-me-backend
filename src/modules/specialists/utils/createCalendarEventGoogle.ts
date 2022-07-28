import { AppError } from "@shared/errors/AppError";
import { google } from "googleapis";

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
    "1090966813319-q0rnl8r830s2dnc9ctugjst4mkidb96c.apps.googleusercontent.com",
    "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"
);

oAuth2Client.setCredentials({
    refresh_token:
        "1//04k7ClMITEJHqCgYIARAAGAQSNwF-L9IrxqYK9CHki-vFGa2voasJjCLUYyTFyX8wkz_Oahz67ky82ISWbN-jQlPDWuiuqg1b9jA",
});

const calendar = google.calendar({
    version: "v3",
    auth: oAuth2Client,
});

function createCalendarEventGoogle(
    summary,
    location,
    description,
    eventStartTime,
    eventEndTime,
    timeZone,
    attendees,
    conferenceData
) {
    const event = {
        summary,
        location,
        description,
        start: {
            dateTime: eventStartTime,
            timeZone: timeZone,
        },
        end: {
            dateTime: eventEndTime,
            timeZone: timeZone,
        },
        attendees,
        colorId: "1",
        conferenceData,
    };

    calendar.events.insert(
        {
            calendarId: "primary",
            requestBody: event,
            sendNotifications: true,
            conferenceDataVersion: 1,
        },
        (err) => {
            if (err) {
                throw new AppError(
                    "Can't insert new event on Google calendar. ",
                    err
                );
            }

            return console.log("Calendar Event Created.");
        }
    );
}

export { createCalendarEventGoogle };

