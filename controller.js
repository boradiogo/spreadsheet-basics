import { readSpreadsheet } from './model.js'

const spreadsheetId = '1wV3XvZsmk67amFtLTqUu_Qxx8DT0MfW6_PGS6s6l_a4'
const range = 'engenharia_de_software!A4:H'

function calcAverage(grades) {
  return Math.round(
    grades.reduce((sum, grade) => sum + Number(grade), 0) / grades.length / 10)
}

function checkAttendance(absence) {
  const numberOfClasses = 60
  const absenceThresholdPercentage = 25
  return (absence / numberOfClasses) * 100 > absenceThresholdPercentage ? true: false
}

function checkApproval(average, absence) {
  const hasLackOfAttendance = checkAttendance(absence)
  const regularAttendee = !hasLackOfAttendance
  const isApproved = average >= 7 && regularAttendee ? true : false 
  const isNotApprovedYet = !isApproved
  const secondChance = average >= 5 && isNotApprovedYet && regularAttendee ? true : false
  const gradeToBeApproved = secondChance ? 7 * 2 - average : 0

  return {
    hasLackOfAttendance,
    isApproved,
    secondChance,
    gradeToBeApproved
  }
}

export async function getStudents() {
  const rows = await readSpreadsheet(spreadsheetId, range)  

  const students = rows.map((row) => {
    const [id, name, absence, ...grades] = row
    const average = calcAverage(grades)
    const status = checkApproval(average, absence)
    
    return {
      id,
      name,
      absence,
      grades,
      average,
      status
    }

  })

  return students
}

getStudents().then(console.log)