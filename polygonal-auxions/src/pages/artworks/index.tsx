import {
  Grid,
  Container,
  CircularProgress
} from '@mui/material';
import { useQuery } from 'urql';
import type { Artwork } from '@/pages/generated-graphql';
import { ArtworksDocument } from '@/pages/generated-graphql';
import ArtworkListUnit from './components/artwork-list-unit';

export default function Artworks() {
    const [result] = useQuery({query: ArtworksDocument,});
    const { fetching, error, data } = result;

    if (error) return `Error! ${error.message}`;

    const artworks: Artwork[] = data?.artworks;

    return (
      <Container fixed sx={{my:2}}>
        {
          fetching
          ? <CircularProgress key={0} color="inherit" />
          : (
            <Grid container key={1} sx={{ flexGrow: 1, }} spacing={2}>
              { artworks.map((artwork) => <ArtworkListUnit artwork={artwork} key={artwork.slug_id}/> )}
            </Grid>
        )}
      </Container>
    );
  }