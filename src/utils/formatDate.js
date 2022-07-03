export default function formatDate(date) {
    const d = new Date(date)
    let month = d.getMonth() + 1
    let day = d.getDate()
    const year = d.getFullYear()
    if (month < 10) {
      month = '0' + month
    }
    if (day.length < 10) {
      day = '0' + day
    }
    return [ day, month, year ].join('/')
}
