declare namespace NodeJS {
	export interface ProcessEnv {
		PRISMA_ENDPOINT: string;
		PORT: number;
		SECRET_KEY: string;
	}
}