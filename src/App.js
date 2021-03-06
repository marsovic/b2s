import { Route } from 'react-router-dom';

import './App.css';
import Layout from "./hoc/Layout/Layout"
import Connection from "./containers/Connection/Connection";
import Account from "./containers/Account/Admin/Account";
import Customer from "./containers/Account/Admin/Actions/ListCustomers/Customer/Customer"

function App() {
  return (
    <div className="App">
      <Layout>
        <Route path="/internal" exact render={() => <Connection />} />
        <Route path="/internal/users" exact render={() => <Account />} />

        <Route path="/internal/customers/list" exact render={() => <Connection spec1="customer" spec2="list" />} />
        <Route path="/internal/customers/edit" exact render={() => <Connection spec1="customer" spec2="edit" />} />
        <Route path="/internal/users/edit" exact render={() => <Connection spec1="users" spec2="edit" />} />
        <Route path="/internal/customers/list/:username" render={() => <Customer />} />
      </Layout>
    </div>
  );
}

export default App;
