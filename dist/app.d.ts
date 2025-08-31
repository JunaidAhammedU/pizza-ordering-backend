import express from 'express';
export declare class App {
    app: express.Application;
    constructor();
    private initializeMiddleware;
    private initializeRoutes;
    private initializeErrorHandling;
    start(): Promise<void>;
}
//# sourceMappingURL=app.d.ts.map