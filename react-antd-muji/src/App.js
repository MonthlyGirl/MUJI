import { HashRouter } from 'react-router-dom'

import { Provider } from 'mobx-react';
import { Layout } from '@/components'

import store from './store'

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div className="app">
          <Layout/>
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
