import { useState } from 'react'

import { check_content, check_email, check_null, check_time } from './textCheck'
import { ICapsule, Upload } from '../../components/tsx/ICapsule'
import moment from 'moment'
import * as api from '../../services/api'

import put from './style.module.less'
import Header from '../Header'
import Form from './Form'

interface State extends ICapsule {
  value: string
  submit: boolean
  key: string
  subContent: string

  nameWarn: string
  emailWarn: string
  timeWarn: string
  contentWarn: string
}

export default function Put() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [time, setTime] = useState<string>(
    moment().format('YYYY-MM-DD HH:mm:ss'),
  )
  const [content, setContent] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [tips, setTips] = useState<string>('')
  const [submit, setSubmit] = useState<boolean>(true)
  const [key, setKey] = useState<string>('')
  const [subContent, setSubContent] = useState<string>('添加胶囊')
  const [nameWarn, setNameW] = useState<string>('')
  const [emailWarn, setEmailW] = useState<string>('')
  const [timeWarn, setTimeW] = useState<string>('')
  const [contentWarn, setContentW] = useState<string>('')

  let state: State = {
    name,
    email,
    time,
    content,
    value,
    tips,
    submit,
    key,
    subContent,
    nameWarn,
    emailWarn,
    timeWarn,
    contentWarn,
  }

  const check_info = async (user: ICapsule) => {
    if (
      !check_null(user.name) &&
      check_email(user.email) &&
      check_content(user.content) &&
      check_time(user.time)
    ) {
      user.time = moment(user.time).format('X')
      let res = await api.saveCapsule(user)
      let result: Upload = res
      console.log(result)
      if (result.stat === 'ok' && result.id !== '') {
        setKey(result.id)
        setSubmit(false)
        console.log('提交成功', result.id)
      } else {
        console.log('提交失败')
      }
    } else {
      if (check_null(user.name)) {
        setNameW('名字不能为空')
      } else {
        setNameW('')
      }
      if (!check_email(user.email)) {
        setEmailW('请设置合法内容')
      } else {
        setEmailW('')
      }
      if (!check_content(user.content)) {
        setContentW('请设置合法内容')
      } else {
        setContentW('')
      }
      if (!check_time(user.time)) {
        setTimeW('请设置合理时间')
      } else {
        setTimeW('')
      }
    }
  }

  const changeChild = (prop: string, content: string) => {
    if (prop === 'name') setName(content)
    else if (prop === 'email') setEmail(content)
    else if (prop === 'time') setTime(content)
    else if (prop === 'content') setContent(content)
    else if (prop === 'tips') setTips(content)
    else {
      console.log('prop, content', prop, content)
      throw new Error('The parameters are wrong')
    }
  }

  return (
    <div className={put.content}>
      <Header />
      <div className={submit ? put.main : put.main + ' ' + put.hide}>
        <div className={put.title}>添加胶囊</div>
        <Form {...state} q={changeChild} check={check_info} />
      </div>
      <div className={submit ? put.keys + ' ' + put.hide : put.keys}>
        <div className={put.title}>保存胶囊</div>
        <div className={put.label}>时间胶囊的密码为</div>
        <input name="keys" type="text" defaultValue={key} />
      </div>
    </div>
  )
}
