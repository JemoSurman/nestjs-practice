import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';


@Injectable()
export class MyLoggerService extends ConsoleLogger {
    async logToFile(entry) {
    const logsDir = path.join(process.cwd(), 'logs');
    const logFile = path.join(logsDir, 'myLogFile.log');

    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
        dateStyle: 'short',
        timeStyle: 'short',
        timeZone: 'Asia/Tbilisi',
    }).format(new Date())}\t${entry}\n`;

    try {
        if (!fs.existsSync(logsDir)) {
            await fsPromises.mkdir(logsDir, { recursive: true });
        }
        await fsPromises.appendFile(logFile, formattedEntry);
    } catch (e) {
        if (e instanceof Error) console.error(e.message);
    }
}

    log(message: any, context?: string){
        const entry = `${context}\t${message}`;
        this.logToFile(entry);
        super.log(message, context);
    }

    error(message: any, stackOrContext?: string){
        const entry = `${stackOrContext}\t${message}`;
        this.logToFile(entry);
        super.error(message, stackOrContext)
    }
}
