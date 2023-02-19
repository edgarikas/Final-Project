import logger from './logger';
import storage from './storage';

const middleware = [logger, storage];

export default middleware;
