import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const dist = 'dist';
const src = join(dist, 'index.html');

const routes = ['tools', 'gpt', 'soon'];

routes.forEach(route => {
  const dir = join(dist, route);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  copyFileSync(src, join(dir, 'index.html'));
});

copyFileSync(src, join(dist, '404.html'));

console.log('Done: /tools, /gpt, /soon, 404.html');
