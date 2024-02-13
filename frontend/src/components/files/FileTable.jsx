import Table from 'react-bootstrap/Table';
import { TableRow } from './TableRow';

export const FileTable = ({ data }) => {
  return (
    <Table striped responsive bordered >
      <thead className='tableHead'>
        <tr>
          <th>File Name</th>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ file, lines }) => {
          if (!lines.length) return <tr className='emptyFileTr'><td colSpan={4} className='text-center'>Empty file</td></tr>

          return lines.map((lineData) => {
            return <TableRow key={`${file}-${lineData.hex}-${lineData.number}`} file={file} {...lineData} />
          })

        })}
      </tbody>
    </Table>
  )
}
