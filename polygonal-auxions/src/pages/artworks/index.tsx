import {
  Grid,
  Container,
  CircularProgress
} from '@mui/material';
import { useQuery } from 'urql';
import { type Artwork, type ArtworkRanks } from '@/pages/generated-graphql';
import { ArtworksDocument, GetAuthArtworkRanksDocument } from '@/pages/generated-graphql';
import ArtworkListUnit from './components/artwork-list-unit';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContexts';

export default function Artworks() {
    const [resultArtworks] = useQuery({query: ArtworksDocument,});
    const { fetching, error, data: dataArtworks } = resultArtworks;

    if (error) return `Error! ${error.message}`;

    const artworks: Artwork[] = dataArtworks?.artworks;

    const { user } = useAuth();

    let artworkRanks: ArtworkRanks[]|null = null;

    const [resultArtworkRanks, reExecuteArtworkRanksQuery] = useQuery({query: GetAuthArtworkRanksDocument, pause: true,});

    useEffect(() => { reExecuteArtworkRanksQuery({ requestPolicy: 'network-only' }); }, [user]);

    const { data: dataArtworkRanks } = resultArtworkRanks;
    artworkRanks = dataArtworkRanks?.getAuthArtworkRanks as ArtworkRanks[];

    return (
      <Container fixed sx={{my:2}}>
        {
          fetching
          ? <CircularProgress key={0} color="inherit" />
          : (
            <Grid container key={1} sx={{ flexGrow: 1, }} spacing={2}>
              { artworks.map((artwork) => <ArtworkListUnit artwork={artwork} artworkRanks={artworkRanks} key={artwork.slug_id}/> )}
            </Grid>
        )}
      </Container>
    );
  }