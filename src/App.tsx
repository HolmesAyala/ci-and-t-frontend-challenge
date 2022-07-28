import { GlobalStyles } from '@mui/material';

import { global as globalStyles } from './styles/global';

import Home from './pages/Home';

function App() {
	return (
		<>
			<GlobalStyles styles={globalStyles} />

			<Home />
		</>
	);
}

export default App;
