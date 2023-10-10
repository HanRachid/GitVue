import type {ViteClient} from 'vite/client';

declare global {
	interface ImportMeta {
		env: ViteClient.Env & Record<string, unknown>;
	}
}
