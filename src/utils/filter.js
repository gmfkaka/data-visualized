const dateFormat = (inputTime, start = 5, end = 16) => {
  inputTime = parseInt(inputTime) * 1000
  let date = new Date(inputTime)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? '0' + d : d
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let minute = date.getMinutes()
  let second = date.getSeconds()
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  let time = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
  return time.slice(start, end)
}

// 补全位数并三位补逗号
const numberFormat = (number = 0, length = 8) => {
  return number.toString().padStart(length, '0').replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

export default {
  dateFormat, numberFormat
}
