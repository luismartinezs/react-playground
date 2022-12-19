import React from 'react'

const Table = () => {
  return (
    <div>
      <h2>Table</h2>
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Normal cell</td>
            <td>
              <div>
                <span>cell with div and span</span>
              </div>
            </td>
            <td>Cell 3</td>
          </tr>
          <tr>
            <td>Cell 1</td>
            <td>Cell 2</td>
            <td>Cell 3</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Table
