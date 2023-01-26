import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Main from './pages/Main';

function App() {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/main" element={<Main />} />
		</Routes>
	);
}

export default App;
