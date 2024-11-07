import type { Context } from "hono";
import { initializeSupabase } from "../database";

interface TokenData {
	usage: number;
	used_at: string; 
}

const RATE_LIMITS: Record<string, number> = {
	user: 100,      
	premium: 500,     
	commercial: 1000,  
};

export const rateLimit = async (c: Context, next: () => Promise<void>) => {
	const userKey = c.req.header('Authorization');

	if (!userKey) {
		return c.json({ error: 'Unauthorized: No token provided' }, 401);
	}

	const today = new Date().toISOString().split('T')[0]; 
	const supabase = initializeSupabase(c);

	const { data, error } = await supabase
		.from('tokens')
		.select('usage, used_at, role')
		.eq('token', userKey)
		.single();

	if (error) {
		return c.json({ error: 'Internal server error' }, 500);
	}

	const tokenData = data as TokenData;

	let usageCount = 0;

	if (tokenData && tokenData.used_at) {
		const lastUsedDate = tokenData.used_at.split('T')[0];

		if (lastUsedDate !== today) {
			usageCount = 0;
		} else {
			usageCount = tokenData.usage || 0; 
		}
	}

	const rateLimit = RATE_LIMITS[data.role as string] || 100;

	if (usageCount >= rateLimit) {
		return c.json({ error: 'Too many requests today, please try again tomorrow.' }, 429);
	}

	const { error: updateError } = await supabase
		.from('tokens')
		.update({
			usage: usageCount + 1,
			used_at: new Date().toISOString()
		})
		.eq('token', userKey);

	if (updateError) {
		console.log(updateError);
		return c.json({ error: 'Internal server error' }, 500);
	}

	await next();
};
