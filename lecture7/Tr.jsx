import React from 'react';
import Td from './Td';

const Tr = ({ rowData }) => {
    console.log(rowData);
    return(
        <tr>
            {Array(rowData.length).fill().map((td, i) => (<Td key={'td' + i}>{''}</Td>))}
        </tr>
    );
}

export default Tr;