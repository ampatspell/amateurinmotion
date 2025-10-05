import { config } from 'dotenv';
import { schemaSnapshot } from '@directus/sdk';
import { getDirectusInternal } from './base';

config();

const url = process.env.PUBLIC_DIRECTUS_URL as string;
const token = process.env.PRIVATE_DIRECTUS_ADMIN_TOKEN as string;

const directus = getDirectusInternal(fetch, url, token);
const snapshot = await directus.request(schemaSnapshot());

console.log(JSON.stringify(snapshot, null, 2));
