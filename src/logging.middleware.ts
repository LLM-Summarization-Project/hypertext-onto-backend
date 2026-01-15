import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(req: Request, res: Response, next: NextFunction): void {
        const { method, originalUrl, body } = req;
        const startTime = Date.now();

        // Log incoming request
        console.log(`\n========== API CALL ==========`);
        console.log(`[${new Date().toISOString()}] ${method} ${originalUrl}`);

        // Highlight hypertext-related calls
        if (originalUrl.includes('hypertext') || originalUrl.includes('hyperlink') || originalUrl.includes('click')) {
            console.log(`🔗 HYPERTEXT API DETECTED!`);
        }

        if (Object.keys(body || {}).length > 0) {
            console.log(`Body:`, JSON.stringify(body, null, 2));
        }

        // Log response when finished
        res.on('finish', () => {
            const duration = Date.now() - startTime;
            console.log(`[${new Date().toISOString()}] ${method} ${originalUrl} - ${res.statusCode} (${duration}ms)`);
            console.log(`==============================\n`);
        });

        next();
    }
}
