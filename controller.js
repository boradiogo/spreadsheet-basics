import { readSpreadsheet } from './model.js'

const spreadsheetId = '1wV3XvZsmk67amFtLTqUu_Qxx8DT0MfW6_PGS6s6l_a4'
const range = 'engenharia_de_software!A4:H'

function calcAverage(grades) {
  return Math.round(
    grades.reduce((sum, grade) => sum + Number(grade), 0) / grades.length)
}

export async function getStudents() {
  const rows = await readSpreadsheet(spreadsheetId, range)  

  const students = rows.map((row) => {
    const [id, name, attendance, ...grades] = row
    const average = calcAverage(grades)
    
    return {
      id,
      name,
      attendance,
      grades,
      average,
    }

  })

  return students
}

getStudents().then(console.log)