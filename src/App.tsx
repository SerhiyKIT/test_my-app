import React from 'react';
import './App.css';
import Page from './components/Page';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import SearchCity from './components/SearchCity';

const AppReact = React.createElement;

export const App = () => {
	return (
		<div className="App">
			<Provider store={store}>
				<SearchCity/>
				<Page/>
			</Provider>
		</div>
	);
};

export default App;
