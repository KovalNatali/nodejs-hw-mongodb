import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createFolderIfNotExist } from './utils/createFolderIfNotExist.js';

const bootstrap = async () => {
  await initMongoConnection();
  await createFolderIfNotExist(TEMP_UPLOAD_DIR);
  await createFolderIfNotExist(UPLOAD_DIR);
  setupServer();
};
bootstrap();
