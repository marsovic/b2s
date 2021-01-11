import {Route} from 'react-router-dom';

import './App.css';
import Layout from "./hoc/Layout/Layout"
import Connection from "./containers/Connection/Connection";
import MyAccount from "./components/MyAccount/myAccount";

function App() {
  return (
    <div className="App">
      <Layout>
        <Route path="/auth" exact component={Connection} />
      </Layout>
    </div>
  );
}

export default App;
