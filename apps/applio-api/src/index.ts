import { Hono } from 'hono';
import modelsRouter from './routes/models';
import { authenticate } from './utils/middleware/middleware';
import { rateLimit } from './utils/middleware/rate_limit';

type Bindings = {
	SUPABASE_URL: string;
	SUPABASE_ANON_KEY: string;
};

const app = new Hono<{Bindings: Bindings}>();
app.use('*', authenticate, rateLimit);

app.route('/models', modelsRouter);

app.get('/', (c) => c.json('Welcome to Applio API!'));

app.get('*', (c) => c.json({ error: 'Not found' }, 404));

export default app;
