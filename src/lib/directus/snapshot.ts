import { config } from 'dotenv';
import { schemaSnapshot } from '@directus/sdk';
import { getDirectusInternal } from './base';
import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

config();

const root = dirname(fileURLToPath(import.meta.url));
const url = process.env.PUBLIC_DIRECTUS_URL as string;
const token = process.env.PRIVATE_DIRECTUS_ADMIN_TOKEN as string;

const directus = getDirectusInternal(fetch, url, token);
const snapshot = await directus.request(schemaSnapshot());

await writeFile(join(root, 'snapshot.json'), JSON.stringify(snapshot, null, 2));
