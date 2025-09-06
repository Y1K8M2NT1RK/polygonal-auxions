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
  TextField,
  Button,
  TablePagination,
  InputAdornment,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  Add as AddIcon,
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
  onAdd?: () => void;
  // Pagination props
  page?: number;
  rowsPerPage?: number;
  totalCount?: number;
  onPageChange?: (event: unknown, newPage: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // Search props
  searchValue?: string;
  onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit?: () => void;
  // Loading state
  loading?: boolean;
}

export default function AdminTable({
  title,
  columns,
  rows,
  onEdit,
  onDelete,
  onView,
  onAdd,
  page = 0,
  rowsPerPage = 10,
  totalCount = 0,
  onPageChange,
  onRowsPerPageChange,
  searchValue = '',
  onSearchChange,
  onSearchSubmit,
  loading = false,
}: AdminTableProps) {
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        {onAdd && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAdd}
            color="primary"
          >
            ユーザー追加
          </Button>
        )}
      </Box>

      {/* Search Bar */}
      {onSearchChange && (
        <Box sx={{ mb: 2 }}>
          <form onSubmit={handleSearchSubmit}>
            <TextField
              fullWidth
              placeholder="ハンドルネーム、名前、メールアドレスで検索"
              value={searchValue}
              onChange={onSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button type="submit" variant="contained" size="small">
                      検索
                    </Button>
                  </InputAdornment>
                ),
              }}
              sx={{ maxWidth: 600 }}
            />
          </form>
        </Box>
      )}
      
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  読み込み中...
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  データがありません
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow hover key={row.id || row.slug_id || row.handle_name || JSON.stringify(row)}>
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
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {onPageChange && onRowsPerPageChange && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          labelRowsPerPage="1ページあたりの行数:"
          labelDisplayedRows={({ from, to, count }) => 
            `${from}-${to} / ${count !== -1 ? count : `${to}以上`}`
          }
        />
      )}
    </Box>
  );
}