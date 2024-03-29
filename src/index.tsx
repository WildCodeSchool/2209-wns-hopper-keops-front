import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AuthProvider from './context/AuthProvider';

const getApiUrl = () => {
  if (window.location.href.includes("hopper3.wns")) {
    if (window.location.href.includes("staging")) {
      return "https://api.staging.hopper3.wns.wilders.dev/";
    } else {
      return "https://api.hopper3.wns.wilders.dev/";
    }
  } else {
    return "http://localhost:4000/";
  }
};

// uri = api
const httpLink = createHttpLink({
  uri: getApiUrl(),
});

// give token to the request header
const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById(
	'root',
) as HTMLElement);
root.render(
	<BrowserRouter>
		<ApolloProvider client={client}>
			<AuthProvider>
				<App />
			</AuthProvider>
		</ApolloProvider>
	</BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
