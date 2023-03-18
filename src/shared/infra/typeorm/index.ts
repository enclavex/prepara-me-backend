import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    console.log(defaultOptions)
    console.log(process.env)

    return createConnection(
        Object.assign(defaultOptions, {
            database:
                process.env.NODE_ENV === "test"
                    ? "preparame_test"
                    : defaultOptions.database, 
        })
    );
};
