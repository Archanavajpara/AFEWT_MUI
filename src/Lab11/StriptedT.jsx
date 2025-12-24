import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { blue, cyan, pink } from '@mui/material/colors';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    border: '2px solid #000',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor:pink[100],
    border: '2px solid #000',
  },
  '&:nth-of-type(even)': {
    backgroundColor:pink[50],
    border: '2px solid #000',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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

export default function StriptedT() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Role</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.email}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell>{row.email}</StyledTableCell>
              <StyledTableCell>{row.role}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
