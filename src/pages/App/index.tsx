import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import Home from '../Home'
import Put from '../Put'
import Open from '../Open'
import NotFound from '../NotFound'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/put" component={Put} />
          <Route path="/open" component={Open} />
          <Redirect from="/" to="/home" exact />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
  )
}
export default App
