"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const constants_1 = require("./constants");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: constants_1.debugLevel
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(constants_1.PORT, constants_1.HOST, () => {
        common_1.Logger.debug(`Server v${constants_1.APP_VERSION} listening at http://${constants_1.HOST}:${constants_1.PORT}/`, 'contact-management-app');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map