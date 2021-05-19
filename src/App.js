import "./App.css";
import Login from "./pages/login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <Login />
      </Provider>
    </div>
  );
}

export default App;
