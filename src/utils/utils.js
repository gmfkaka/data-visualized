export const getProportion = (id) => {
  let dom = document.getElementById(id)
  if (dom) {
    return dom.clientWidth / 1920
  } else {
    return 1
  }
}

// 高德坐标转百度
const gaodeTobaidu = (gglng, gglat) => {
  let X_PI = Math.PI * 3000.0 / 180.0
  let x = gglng
  let y = gglat
  let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI)
  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI)
  let bdlng = z * Math.cos(theta) + 0.0065
  let bdlat = z * Math.sin(theta) + 0.006
  return {
    latitude: bdlat,
    longitude: bdlng
  }
}

// url拼接
const getImageUrl = (file, width, height) => {
  let filename = file.filename
  let filepath = file.filepath
  let src
  if (filename.indexOf('{$hgPicSizeStart}') > 0) {
    filename = filename.replace('{$hgPicSizeStart}', '')
    filename = filename.replace('{$hgPicSizeEnd}', '')
    filename = filename.replace('{$hgPicSizeWidth}', width)
    filename = filename.replace('{$hgPicSizeHeight}', height)
    src = [file.host, file.dir, filepath, filename].join('')
  } else {
    if (width && height) {
      src = file.host + file.dir + width + 'x' + height + '/' + filepath + filename
    } else {
      if (file.imgwidth && file.imgheight) {
        src = file.host + file.dir + file.imgwidth + 'x' + file.imgheight + '/' + filepath + filename
      } else {
        src = file.host + file.dir + filepath + filename
      }
    }
  }
  return src
}

// 获取当前时间
const getcurrentDateTime = () => {
  let date = new Date()
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  let min = date.getMinutes()
  let hour = date.getHours()
  let sec = date.getSeconds()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (min >= 1 && min <= 9) {
    min = '0' + min
  }
  if (sec >= 1 && sec <= 9) {
    sec = '0' + sec
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  if (hour >= 0 && hour <= 9) {
    hour = '0' + hour
  }
  let currentdate = date.getFullYear() + '-' + month + '-' + strDate + ' ' + hour + ':' + min + ':' + sec
  return currentdate
}

// 时间格式化
const timeFormat = (inputTime) => {
  inputTime = parseInt(inputTime) * 1000
  var date = new Date(inputTime)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  var h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  var minute = date.getMinutes()
  var second = date.getSeconds()
  minute = minute < 10 ? ('0' + minute) : minute
  second = second < 10 ? ('0' + second) : second
  var time = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
  return time.slice(5, 10)
}

/**
 * [字符串时间转换兼容]
 * @param  {[string]} utcstr [时间 "2019-08-23 09:58:22.392397+08"]
 */
const formatTimeStr = (utcstr) => {
  let equipmentVersion = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod|safari/.test(equipmentVersion) && !/chrome/.test(equipmentVersion) && utcstr.indexOf('T') === -1) {
    utcstr = utcstr.replace(/-/g, '/')
    utcstr = utcstr.split('.')[0]
  }
  return utcstr
}

/**
 * [格式化时间戳]
 * @param  {[number]} utcstr [时间戳]
 * @param  {[string]} format [时间格式，支持的格式自定义，需在该方法中配置]
 * @return {[string]}        [转化后的时间格式]
 */
const formatDate = (utcstr, format = 'YYYY-MM-DD hh:mm:ss') => {
  let _format = function (num) {
    if (num < 10) {
      num = '0' + num
    } else {
      num = num + ''
    }
    return num
  }
  if (typeof utcstr === 'number') {
    utcstr = utcstr * 1000
  }
  if (typeof utcstr === 'string') {
    utcstr = formatTimeStr(utcstr)
  }
  let newDate = ''
  newDate = new Date(utcstr)
  let year = newDate.getFullYear()
  let month = newDate.getMonth() + 1
  let dd = newDate.getDate()
  let hour = newDate.getHours()
  let min = newDate.getMinutes()
  let sec = newDate.getSeconds()
  return format
    .replace('YYYY', _format(year))
    .replace('MM', _format(month))
    .replace('DD', _format(dd))
    .replace('hh', _format(hour))
    .replace('mm', _format(min))
    .replace('ss', _format(sec))
}

// 把数字转化成数组
const preFixInterge = (num, n) => {
  return (Array(n).join(0) + num).slice(-n).split('')
}

export {
  gaodeTobaidu, getImageUrl, getcurrentDateTime, preFixInterge, timeFormat, formatDate
}
