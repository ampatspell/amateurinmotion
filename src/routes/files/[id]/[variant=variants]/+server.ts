import { getFiles } from '#lib/services.js';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ params }) => getFiles().handle(params);
