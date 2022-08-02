import { app } from "./app";
import { spawn } from "child_process";

app.listen(3334, () => console.log("Server is running!"));

process.on("uncaughtException", function (err) {
    console.error('Restarting node', err)
    if (process.env.process_restarting) {
        delete process.env.process_restarting;
        return;
    }

    spawn(process.argv[0], process.argv.slice(1), {
        env: { process_restarting: "1" },
        stdio: 'ignore',
      }).unref();
});