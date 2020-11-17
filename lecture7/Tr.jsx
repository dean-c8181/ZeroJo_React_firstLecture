import React from 'react';
import Td from './Td';

const Tr = ({ rowData, rowIndex, dispatch, cellData }) => {
    console.log(rowData);
    return(
        <tr>
            {Array(rowData.length).fill().map((td, i) => (<Td dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} key={'td' + i} cellData={rowData[i]}>{''}</Td>))}
        </tr>
    );
}

export default Tr;