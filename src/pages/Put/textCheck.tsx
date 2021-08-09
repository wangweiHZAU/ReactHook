import moment from 'moment'

function check_null(str: string) {
  if (str.length === 0 || str.trim().length === 0) {
    return true
  } else {
    return false
  }
  // return !str && str.trim();
}

function check_email(str: string) {
  let reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/
  return reg.test(str)
}

function check_time(time: string) {
  return moment(time).format('X') !== 'Invalid date'
}

function check_content(content: string) {
  return 0 < content.length && content.length < 5000
}

export { check_content, check_email, check_null, check_time }
