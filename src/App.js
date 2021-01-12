import {Route} from 'react-router-dom';

import './App.css';
import Layout from "./hoc/Layout/Layout"
import Connection from "./containers/Connection/Connection";

function App() {
  return (
    <div className="App">
      <Layout>
        <Route path="/" exact component={Connection} />
      </Layout>
    </div>
  );
}

export default App;
