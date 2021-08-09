import React, { useState } from 'react'
import { ICapsule } from '../../components/tsx/ICapsule'
import { observer } from 'mobx-react-lite'

import put from './style.module.less'
import store from '../store'

interface Props extends ICapsule {
  q: (name: string, value: string) => void
  check: (user: ICapsule) => void

  nameWarn: string
  emailWarn: string
  timeWarn: string
  contentWarn: string
  subContent: string
}

export default function Form(props: Props) {
  // const [time, setTime] = useState<string>('')
  const [subContent, setSubContent] = useState<string>('')

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let t = event.target
    let v = t.value
    let name = t.name
    props.q(name, v)
  }

  const handleTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.q('time', event.target.value)
  }

  const inputSubmit = () => {
    setSubContent('正在添加...')

    let user: ICapsule = {
      name: props.name,
      email: props.email,
      time: props.time,
      content: props.content,
      tips: props.tips,
    }
    props.check(user)

    console.log('Process finished')
    setSubContent('添加胶囊')
  }
  const Btn = observer(() => (
    <div
      onClick={inputSubmit}
      className={put.subBtn}
      style={{ background: store.colors[store.color] }}>
      {props.subContent}
    </div>
  ))

  return (
    <form>
      <div className={put.label}>你的名字</div>
      <input name="name" type="text" onChange={handleChange} />
      <div className={put.warning}>{props.nameWarn}</div>
      <div className={put.label}>你的邮箱</div>
      <input name="email" type="text" onChange={handleChange} />
      <div className={put.warning}>{props.emailWarn}</div>
      <div className={put.label}>打开时间</div>
      <input name="time" value={props.time} onChange={handleTime} type="text" />
      <div className={put.warning}>{props.timeWarn}</div>
      <span className={put.tips}>在打开时间之前，胶囊内容是看不到的。</span>
      <div className={put.label}>胶囊内容</div>
      <textarea
        name="content"
        cols={100}
        rows={10}
        onChange={handleChange}></textarea>
      <br />
      <span className={put.tips}>胶囊内容不能超过5000字</span>
      <div className={put.warning}>{props.contentWarn}</div>
      <div className={put.label}>未到期提示信息</div>
      <textarea
        name="tips"
        cols={100}
        rows={5}
        onChange={handleChange}></textarea>
      <br />
      <span className={put.tips}>
        在 打开时间 之前打开胶囊，会看到提示信息。
      </span>
      {/* <div
        onClick={inputSubmit}
        className={put.subBtn}
        style={{ background: store.colors[store.color] }}>
        {props.subContent}
      </div> */}
      <Btn />
    </form>
  )
}
