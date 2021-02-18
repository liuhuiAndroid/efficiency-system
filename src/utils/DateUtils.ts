export const formatDate = (time: Date) => {
  const Dates = new Date(time)
  const year: number = Dates.getFullYear()
  const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1)
  const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate()
  const week: number = Dates.getDay()
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
  return year + '年' + month + '月' + day + '日 ' + weekString
}
