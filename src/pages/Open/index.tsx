import React, { useState } from 'react'
import { ICapsule } from '../../components/tsx/ICapsule'
import moment from 'moment'

import put from '../Put/style.module.less'
import open from './style.module.less'
import Header from '../Header'
import * as api from '../../services/api'
import { observer } from 'mobx-react-lite'
import store from '../store'

export default function Open() {
  const [name, setName] = useState<string>('')
  // const [email, setEmail] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [tips, setTips] = useState<string>('')

  const [key, setKey] = useState<string>('')
  const [remain, setRemain] = useState<boolean>(false)
  const [remainContent, setRemainContent] = useState<string>('')
  const [early, setEarly] = useState<boolean>(false)
  const [valid, setValid] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value)
  }

  const checkTime = (time: string) => {
    return parseInt(moment().format('X')) > parseInt(time)
  }

  const countSecond = (time: string) => {
    let remain = parseInt(time) - parseInt(moment().format('X'))
    let before = '这颗胶囊还没到提取时间，剩余时间还有 '
    let after = '秒'
    if (remain > 0) {
      let say = before + remain.toString() + after
      setRemainContent(say)
      setTimeout(() => {
        countSecond(time)
      }, 1000)
    }
  }

  const inputSubmit = async () => {
    let passwd = key
    let res = await api.getCapsule(passwd)
    let cap: ICapsule = res

    console.log(cap)
    if (res.stat !== 'not_found') {
      if (checkTime(cap.time)) {
        setName(cap.name)
        setTime(cap.time)
        setContent(cap.content)
        setRemain(true)
      } else {
        countSecond(cap.time)
        console.log(cap.tips)

        if (cap.tips) {
          setRemain(true)
          setEarly(true)
          setName(cap.name)
          setTips(cap.tips)
        }
      }
    } else {
      setValid('请输入有效的密码')
    }
  }

  const Btn = observer(() => (
    <button
      onClick={inputSubmit}
      className={open.subBtn}
      style={{ background: store.colors[store.color] }}>
      打开胶囊
    </button>
  ))
  return (
    <React.Fragment>
      <Header />
      <div className={put.main}>
        <div className={put.title}>打开胶囊</div>
        <div className={put.label}>请输入密码</div>
        <input name="passwd" type="text" value={key} onChange={handleChange} />
        {/* <button onClick={inputSubmit} className={open.subBtn}>
          打开胶囊
        </button> */}
        <Btn />
        <div className={put.warning}>{valid}</div>
        <div>{remainContent}</div>
        <div className={remain ? open.capTips : open.capTips + ' ' + put.hide}>
          {early
            ? `${name}给你留的提示信息:`
            : `${name} 在 ${moment(parseInt(time))} 对你说：`}
        </div>
        <textarea
          className={
            remain ? open.capContent : open.capContent + ' ' + put.hide
          }
          name="cap-content"
          cols={30}
          rows={10}
          readOnly
          value={early ? tips : content}></textarea>
      </div>
    </React.Fragment>
  )
}
