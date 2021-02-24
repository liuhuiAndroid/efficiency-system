export const formatDate = (time: Date) => {
  const dateTime = new Date(time)
  const year: number = dateTime.getFullYear()
  const month: any = (dateTime.getMonth() + 1) < 10 ? '0' + (dateTime.getMonth() + 1) : (dateTime.getMonth() + 1)
  const day: any = dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate()
  const hours: any = dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours()
  const minutes: any = dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes()
  const seconds: any = dateTime.getSeconds() < 10 ? '0' + dateTime.getSeconds() : dateTime.getSeconds()
  const week: number = dateTime.getDay()
  let weekString = ''
  if (week === 0) {
    weekString = '星期天'
  } else if (week === 1) {
    weekString = '星期一'
  } else if (week === 2) {
    weekString = '星期二'
  } else if (week === 3) {
    weekString = '星期三'
  } else if (week === 4) {
    weekString = '星期四'
  } else if (week === 5) {
    weekString = '星期五'
  } else if (week === 6) {
    weekString = '星期六'
  }
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds + '  ' + weekString
}

export const currentTime = () => {
  const Dates = new Date()
  const Year : number = Dates.getFullYear()
  const Months : any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1)
  const Day : any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate()
  return Year + '-' + Months + '-' + Day
}
