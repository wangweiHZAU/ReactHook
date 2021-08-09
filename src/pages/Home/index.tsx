import { NavLink } from 'react-router-dom'
import { useState } from 'react'

import Logo from '../../assets/imgs/logo_big.png'

import sty from './style.module.less'
import store from '../store'

export default function Home() {
  const [flagOpen, setFlagOpen] = useState<boolean>(false)
  const [flagPut, setFlagPut] = useState<boolean>(false)

  return (
    <div className={sty.main}>
      <div className={sty.mainLogo}>
        <img src={Logo} alt="" />
        <div className={sty.logoText}>时间胶囊</div>
      </div>
      <div className={sty.btn}>
        <div className={sty.put}>
          <NavLink to="/put" activeClassName="active">
            <button
              className={sty.putBtn}
              onMouseEnter={() => {
                setFlagPut(true)
              }}
              onMouseLeave={() => {
                setFlagPut(false)
              }}
              style={
                flagPut
                  ? { color: store.colors[store.color] }
                  : { color: 'black' }
              }>
              <p className={sty.big}>Put</p>
              <p className={sty.normal}>添加</p>
            </button>
          </NavLink>
        </div>
        <div className={sty.open}>
          <NavLink to="/open" activeClassName="active">
            <button
              className={sty.openBtn}
              onMouseEnter={() => {
                setFlagOpen(true)
              }}
              onMouseLeave={() => {
                setFlagOpen(false)
              }}
              style={
                flagOpen
                  ? { color: store.colors[store.color] }
                  : { color: 'black' }
              }>
              <div className={sty.big}>Open</div>
              <p className={sty.normal}>打开</p>
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
