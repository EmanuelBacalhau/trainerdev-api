import dayjs from 'dayjs'

export function generateMatriculationCode() {
  const prefix = dayjs().format('YYMM')
  const randomSerial = Math.random()
    .toString(36)
    .substring(2, 8)
    .toLocaleUpperCase()

  return `${prefix}${randomSerial}`
}
