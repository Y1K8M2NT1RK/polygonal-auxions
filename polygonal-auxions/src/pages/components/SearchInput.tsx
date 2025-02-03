import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import useResponsive from "../hooks/useResponsive";

export default function SearchInput() {
  const { isSmallScreen } = useResponsive();
  return (
    <>
      <TextField
        type="search"
        label="作品を探すなら検索しよう！"
        sx={{
          width: isSmallScreen ? '85%' : '90%',
          maxWidth: '600px',
        }}
        InputLabelProps={{
          style: {
            fontSize: isSmallScreen ? '1rem' : '1.25rem',
            width: '100%',
          },
        }}
        InputProps={{
          style: {
            borderRadius: '100px',
            fontSize: isSmallScreen ? '1rem' : '1.25rem',
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
        />
    </>
  )
}