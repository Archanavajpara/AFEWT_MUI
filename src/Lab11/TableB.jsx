import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, email, role) {
  return { name, email, role };
}

const rows = [
  createData('Archana Vajpara', 'archana@gmail.com', 'Admin'),
  createData('Rahul Sharma', 'rahul@gmail.com', 'User'),
  createData('Neha Patel', 'neha@gmail.com', 'Manager'),
  createData('Amit Verma', 'amit@gmail.com', 'User'),
  createData('Priya Singh', 'priya@gmail.com', 'HR'),
];

export default function TableB() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.email}//optional but useful in case of dynamic data
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
