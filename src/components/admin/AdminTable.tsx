import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  IconButton,
  Box,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

export interface TableColumn {
  id: string;
  label: string;
  align?: 'left' | 'right' | 'center';
  minWidth?: number;
  format?: (value: any) => string;
}

export interface TableRow {
  [key: string]: any;
}

interface AdminTableProps {
  title: string;
  columns: TableColumn[];
  rows: TableRow[];
  onEdit?: (row: TableRow) => void;
  onDelete?: (row: TableRow) => void;
  onView?: (row: TableRow) => void;
}

export default function AdminTable({
  title,
  columns,
  rows,
  onEdit,
  onDelete,
  onView,
}: AdminTableProps) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="center">
                アクション
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow hover key={index}>
                {columns.map((column) => {
                  const value = row[column.id];
                  const displayValue = column.format && value != null 
                    ? column.format(value) 
                    : value;
                  
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {typeof displayValue === 'boolean' ? (
                        <Chip
                          label={displayValue ? '有効' : '無効'}
                          color={displayValue ? 'success' : 'default'}
                          size="small"
                        />
                      ) : (
                        displayValue
                      )}
                    </TableCell>
                  );
                })}
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                    {onView && (
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onView(row)}
                      >
                        <ViewIcon />
                      </IconButton>
                    )}
                    {onEdit && (
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onEdit(row)}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    {onDelete && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete(row)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}