import { readSpreadsheet } from './model.js'

const spreadsheetId = '1wV3XvZsmk67amFtLTqUu_Qxx8DT0MfW6_PGS6s6l_a4'
const range = 'engenharia_de_software!A4:H'

function calcAverage(grades) {
  return Math.round(
    grades.reduce((sum, grade) => sum + Number(grade), 0) / grades.length / 10)
}

function checkAttendance(attendance) {
  return (attendance / 60) * 100 > 25 ? true: false
}

function checkApproval(average, attendance) {
  const hasLackOfAttendance = checkAttendance(attendance)
  const isApproved = average >= 7 ? true : false 
  const isNotApprovedYet = !isApproved
  const secondChange = average >= 5 && isNotApprovedYet ? true : false
  const gradeToBeApproved = secondChange ? 7 * 2 - average : 0

  return {
    hasLackOfAttendance,
    isApproved: false,
    secondChange,
    gradeToBeApproved
  }
}

export async function getStudents() {
  const rows = await readSpreadsheet(spreadsheetId, range)  

  const students = rows.map((row) => {
    const [id, name, attendance, ...grades] = row
    const average = calcAverage(grades)
    const status = checkApproval(average, attendance)
    
    return {
      id,
      name,
      attendance,
      grades,
      average,
      status
    }

  })

  return students
}

getStudents().then(console.log)