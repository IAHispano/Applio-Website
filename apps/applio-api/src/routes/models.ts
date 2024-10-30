import { Hono } from 'hono';
import { getFilteredEntries, getFilteredEntriesByName } from '../services/models';
import type { StatusCode } from 'hono/utils/http-status';

const modelsRouter = new Hono();

modelsRouter.get('/', async (c) => {
    const page = Number(c.req.header('page')) || 1;
    const perPage = Number(c.req.header('perPage')) || 10;

    const algorithm = c.req.header('algorithm');
    const tags = c.req.header('tags');
    const filters = {
        algorithm,
        tags
    };

    const entries = await getFilteredEntries(page, perPage, c, filters);

    if (entries && entries.status && entries.status >= 400) {
        return c.json({
            message: entries.message,
        }, entries.status as StatusCode);
    }

    if (!entries.data) {
        return c.json({
            message: 'No results found.',
        }, 404);
    }

    return c.json(entries?.data || [], 200);
});

modelsRouter.get('/search', async (c) => {
    const name = c.req.header('name');

    const page = Number(c.req.header('page')) || 1;
    const perPage = Number(c.req.header('perPage')) || 10;

    const algorithm = c.req.header('algorithm');
    const tags = c.req.header('tags');

    const filters = {
        algorithm,
        tags
    };

    if (!name) {
        return c.json({
            message: 'Name is required.',
        }, 400);
    }

    const entries = await getFilteredEntriesByName(name, page, perPage, c, filters);

    if (entries && entries.status && entries.status >= 400) {
        return c.json({
            message: entries.message,
        }, entries.status as StatusCode);
    }

    if (!entries.data || entries.data.length === 0) {
        return c.json({
            message: 'No results found.',
        }, 404);
    }

    return c.json(entries?.data || [], 200);
});

export default modelsRouter;
