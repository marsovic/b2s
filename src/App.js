import {Route} from 'react-router-dom';

import './App.css';
import Layout from "./hoc/Layout/Layout"
import Connection from "./containers/Connection/Connection";
import Account from "./containers/Account/Admin/Account";

function App() {
  return (
    <div className="App">
      <Layout>
        <Route path="/home" exact render={() =>  <Connection />} />
        <Route path="/internal" exact render={() => <Connection />} />
        <Route path="/internal/users" exact render={() => <Account />} />

        <Route path="/internal/customers/list" exact render={() => <Account />} />
        <Route path="/internal/customers/edit" exact render={() => <Account />} />
        <Route path="/internal/users/edit" exact render={() => <Account />} />
      </Layout>
    </div>
  );
}

export default App;
