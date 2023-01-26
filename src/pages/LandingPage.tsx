import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
	const navigate = useNavigate();
	return (
		<div>
			<h1>LandingPage</h1>
			<button>
				<p>
					<Link to="/main"> Clique</Link>
				</p>
			</button>
		</div>
	);
};

export default LandingPage;
