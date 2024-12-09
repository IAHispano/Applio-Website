import type { Context } from 'hono';
import { initializeSupabase } from '../database';

export const authenticate = async (c: Context, next: () => Promise<void>) => {
    const supabase = initializeSupabase(c);

	const token = c.req.header('Authorization');

	if (!token) {
		return c.json({ error: 'Unauthorized: No token provided.' }, 401);
	}

	const { data, error } = await supabase
		.from('tokens')
		.select('*')
		.eq('token', token)
		.single();

	if (error || !data) {
		return c.json({ error: 'Unauthorized: Invalid token' }, 401);
	}	

	if (data.role !== 'commercial') {
		return c.json({ error: 'Unauthorized: Invalid token' }, 401);
	}

	await next();
};
