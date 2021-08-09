import { NavLink, Link } from 'react-router-dom'
import logoIcon from '../../assets/imgs/logo.gif'
import head from './style.module.less'
import store from '../store'

const changeColor = () => {
  store.setColor()
}

export default function Header() {
  return (
    <div className={head.header}>
      <div className={head.logo}>
        <img src={logoIcon} alt="" />
      </div>
      <div className={head.topTitle}>时间胶囊</div>
      <div className={head.title}>
        <Link to="/">首页</Link>
        <NavLink to="/put" activeClassName={head.active}>
          添加
        </NavLink>
        <NavLink to="/open" activeClassName={head.active}>
          打开
        </NavLink>
      </div>
      <div className={head.theme}>
        <div className={head.themeBody} onClick={changeColor}>
          主题
        </div>
      </div>
    </div>
  )
}
