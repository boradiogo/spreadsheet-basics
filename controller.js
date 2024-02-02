import { readSpreadsheet } from './model.js'

const spreadsheetId = '1wV3XvZsmk67amFtLTqUu_Qxx8DT0MfW6_PGS6s6l_a4'
const range = 'engenharia_de_software!A4:H'

export async function getStudents() {
  const rows = await readSpreadsheet(spreadsheetId, range)  

  const students = rows.map((row) => {
    const [id, name, attendance, ...grades] = row
    
    return {
      id,
      name,
      attendance,
      grades,
    }

  })

  return students
}

getStudents().then(console.log)