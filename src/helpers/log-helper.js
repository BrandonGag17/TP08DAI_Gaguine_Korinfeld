import 'dotenv/config';
import fs from 'fs';


class LogHelper {

    constructor() {

        this.filePath = process.env.LOG_FILE_PATH || "./logs/";
        this.fileName = process.env.LOG_FILE_NAME || "error.log";

        this.logToFileEnabled =
            (process.env.LOG_TO_FILE_ENABLED || "true").toLowerCase() === "true";

        this.logToConsoleEnabled =
            (process.env.LOG_TO_CONSOLE_ENABLED || "true").toLowerCase() === "true";
    }


    logError(errorObject) {

        const message = `
${new Date().toISOString()}: error - ${errorObject.message}

Stack Trace:

${errorObject.stack}

----------------------------------------
`;


        if (this.logToConsoleEnabled) {
            console.error(message);
        }


        if (this.logToFileEnabled) {

            if (!fs.existsSync(this.filePath)) {
                fs.mkdirSync(this.filePath, { recursive: true });
            }


            fs.appendFileSync(
                this.filePath + this.fileName,
                message
            );
        }
    }
}


export default new LogHelper();