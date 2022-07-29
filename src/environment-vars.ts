export type EnvironmentVars = {
	api: {
		baseUrl: string;
	};
	assetsBaseUrl: string;
};

export const environmentVars: EnvironmentVars = {
	api: {
		baseUrl: process.env.REACT_APP_API_BASE_URL ?? 'WITHOUT_BASE_URL',
	},
	assetsBaseUrl: process.env.REACT_APP_ASSETS_BASE_URL ?? 'WITHOUT_BASE_URL',
};
