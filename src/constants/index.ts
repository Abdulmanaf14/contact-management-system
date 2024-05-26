import { LogLevel } from "@nestjs/common";
import packageJson from 'package.json';


export const DEBUG_LEVEL = process.env.FEDO_ID_SERVER_LOG_LEVEL || 'debug';
export const PORT = parseInt(process.env.FEDO_ID_SERVER_PORT || '', 10) || 38000;
export const HOST = process.env.FEDO_ID_SERVER_HOST || '0.0.0.0';
export const APP_VERSION = packageJson.version;


export const debugLevel = ((): LogLevel[] => {
	if (DEBUG_LEVEL == 'debug') return ['debug', 'warn', 'error'];
	if (DEBUG_LEVEL == 'warn') return ['warn', 'error'];
	if (DEBUG_LEVEL == 'error') return ['error'];
	return ['debug'];
})();