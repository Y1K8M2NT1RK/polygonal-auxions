import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import useResponsive from "../hooks/useResponsive";

interface SearchInputProps {
  inputPaddingSize?: "small" | "medium";
  labelFontSize: string;
  inputFontSize: string;
}

export default function SearchInput({inputPaddingSize, labelFontSize, inputFontSize}: SearchInputProps) {
  const { isSmallScreen } = useResponsive();
  return (
    <>
      <TextField
        type="search"
        placeholder="作品を探すなら検索しよう！"
        sx={{
          width: isSmallScreen ? '85%' : '90%',
          maxWidth: '600px',
        }}
        size={inputPaddingSize || 'medium'}
        InputLabelProps={{
          style: {
            fontSize: labelFontSize,
            width: '100%',
          },
        }}
        InputProps={{
          style: {
            borderRadius: '100px',
            fontSize: inputFontSize,
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