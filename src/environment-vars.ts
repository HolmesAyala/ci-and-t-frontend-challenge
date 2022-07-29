export type EnvironmentVars = {
	api: {
		baseUrl: string;
	};
	assetsBaseUrl: string;
};

export const environmentVars: EnvironmentVars = {
	api: {
		baseUrl: process.env.API_BASE_URL ?? 'WITHOUT_BASE_URL',
	},
	assetsBaseUrl: process.env.ASSETS_BASE_URL ?? 'WITHOUT_BASE_URL',
};
