import { GlobalStyles, StyledEngineProvider } from '@mui/material';

import { GLOBAL_STYLES } from './styles/global';

import Home from './pages/Home';

const globalStyles = <GlobalStyles styles={GLOBAL_STYLES} />;

function App() {
	return (
		<>
			<StyledEngineProvider injectFirst>
				{globalStyles}

				<Home />
			</StyledEngineProvider>
		</>
	);
}

export default App;
