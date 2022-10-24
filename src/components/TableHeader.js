import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

export default function TableHeader(props) {
  const { listHead } = props;
  return (
    <TableHead>
      <TableRow>
        {listHead.map((data, i) => (
          <TableCell key={i} align={data.align}>
            {data.lable}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
