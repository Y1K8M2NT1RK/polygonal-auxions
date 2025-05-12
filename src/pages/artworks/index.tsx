import {
  Grid,
  Container,
  CircularProgress,
} from '@mui/material';
import { useQuery } from 'urql';
import { type Artwork, type ArtworkRanks } from '@/generated/generated-graphql';
import { ArtworksDocument, GetAuthArtworkRanksDocument } from '@/generated/generated-graphql';
import ArtworkListUnit from './components/artwork-list-unit';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContexts';
import { usePause } from '@/contexts/PauseContexts';
import Head from 'next/head';
import ArtworkPopover from './components/artwork-popover';

export default function Artworks() {
  const { isPaused, setPaused } = usePause();

  const [resultArtworks] = useQuery({
    query: ArtworksDocument,
    pause: isPaused,
    requestPolicy: 'network-only'
  });
  const { fetching, error, data: dataArtworks } = resultArtworks;

  const [deletedArtworksInFront, setDeletedArtworksInFront] = useState<{
    artwork_id: number,
    deleted: boolean,
  }[]>([]);

  const artworks: (Artwork & {deletedInFront: boolean;})[] = dataArtworks?.artworks;

  useEffect(() => { 
    if( deletedArtworksInFront.length > 0 ) setPaused(true);
  }, [deletedArtworksInFront, artworks, setPaused]);

  let artworkRanks: ArtworkRanks[]|null = null;

  const [resultArtworkRanks] = useQuery({query: GetAuthArtworkRanksDocument});

  const { data: dataArtworkRanks } = resultArtworkRanks;
  artworkRanks = dataArtworkRanks?.getAuthArtworkRanks as ArtworkRanks[];

  const hasError = !!error;

  return (
    <Container fixed sx={{my:2}}>
      <Head><title>作品一覧</title></Head>
      {
        hasError ? (
          <div>Error! {error.message}</div>
        ) : fetching ? (
          <CircularProgress key={0} color="inherit" />
        ) : (
          <Grid container key={1} sx={{flexGrow: 1,}} spacing={2}>
              { artworks?.map((artwork) => 
                (
                  <ArtworkListUnit
                    artwork={artwork}
                    key={artwork.slug_id}
                    deletedArtworksInFront={deletedArtworksInFront}
                  >
                    <ArtworkPopover
                      key={artwork.slug_id}
                      artwork={artwork}
                      artworkRanks={artworkRanks}
                      setDeletedArtworksInFront={setDeletedArtworksInFront}
                    />
                  </ArtworkListUnit>
                )
              )}
          </Grid>
      )}
    </Container>
  );
}