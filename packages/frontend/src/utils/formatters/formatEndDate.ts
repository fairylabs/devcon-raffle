import moment from 'moment-timezone'

export function formatEndDate(timestamp: bigint | undefined, timeZone: string = moment.tz.guess()) {
  if (!timestamp) {
    return '-'
  }

  return moment.unix(Number(timestamp)).tz(timeZone).format('DD.MM, HH:mm zz')
}
