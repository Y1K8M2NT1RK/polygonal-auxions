import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import useResponsive from "@/hooks/useResponsive";
import { useState, RefObject } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

interface SearchInputProps {
  inputPaddingSize?: "small" | "medium";
  labelFontSize: string;
  inputFontSize: string;
  onSearchIconClick?: () => void;
}

export default function SearchInput({
  inputPaddingSize,
  labelFontSize,
  inputFontSize,
  onSearchIconClick,
}: SearchInputProps) {
  const {isSmallScreen} = useResponsive();
  const router = useRouter();

  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState<string>(searchParams?.get('q') || '');

  const handleClear = () => {
    setSearchInput('');
    // Navigate to artworks page without query parameters
    router.push('/artworks');
    if (onSearchIconClick) {
      onSearchIconClick();
    }
  };

  return (
    <>
      <TextField
        type="search"
        placeholder="作品を探すなら検索しよう！"
        sx={{
          width: isSmallScreen ? '100%' : '90%',
          maxWidth: '600px',
        }}
        size={inputPaddingSize || 'medium'}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
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
              {searchInput && (
                <IconButton 
                  edge="end" 
                  onClick={handleClear}
                  size="small"
                  sx={{ mr: 0.5 }}
                  aria-label="検索をクリア"
                >
                  <ClearIcon />
                </IconButton>
              )}
              <IconButton component={Link} href={`/artworks?q=${searchInput}`} edge="end" onClick={onSearchIconClick}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
        />
    </>
  )
}