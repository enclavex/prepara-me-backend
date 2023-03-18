import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    console.log(process.cwd()); 
    
    return createConnection(
        Object.assign(defaultOptions, {
            database:
                process.env.NODE_ENV === "test"
                    ? "preparame_test"
                    : defaultOptions.database, 
        })
    );
};
