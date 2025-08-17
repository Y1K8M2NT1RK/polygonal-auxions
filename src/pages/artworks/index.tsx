import {
  Grid,
  Container,
  CircularProgress,
  Button,
  Box,
} from '@mui/material';
import { useQuery } from 'urql';
import { type Artwork } from '@/generated/generated-graphql';
import { ArtworksDocument, ArtworksCountDocument } from '@/generated/generated-graphql';
import ArtworkListUnit from './components/artwork-list-unit';
import { useEffect, useState } from 'react';
import { usePause } from '@/contexts/PauseContexts';
import Head from 'next/head';
import ArtworkPopover from './components/artwork-popover';
import { useSearchParams } from 'next/navigation';

export default function Artworks() {
  const { isPaused, setPaused } = usePause();

  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get('q') || '';

  // Pagination state
  const [offset, setOffset] = useState(0);
  const [allArtworks, setAllArtworks] = useState<(Artwork & {deletedInFront: boolean;})[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const limit = 18; // 18件ずつ表示

  // Current page query
  const [resultArtworks] = useQuery({
    query: ArtworksDocument,
    pause: isPaused,
    requestPolicy: 'network-only',
    variables: {
      q: searchQuery,
      offset: offset,
      limit: limit,
    },
  });
  const { fetching, error, data: dataArtworks } = resultArtworks;

  // Total count query
  const [resultCount] = useQuery({
    query: ArtworksCountDocument,
    pause: isPaused,
    requestPolicy: 'cache-first',
    variables: {
      q: searchQuery,
    },
  });
  const { data: countData, fetching: countFetching } = resultCount;

  const [deletedArtworksInFront, setDeletedArtworksInFront] = useState<{
    artwork_id: number,
    deleted: boolean,
  }[]>([]);

  // Reset pagination when search query changes
  useEffect(() => {
    setOffset(0);
    setAllArtworks([]);
  }, [searchQuery]);

  // Add new artworks to the list when data is fetched
  useEffect(() => {
    if (dataArtworks?.artworks) {
      const newArtworks = dataArtworks.artworks.map(artwork => ({
        ...artwork,
        deletedInFront: false
      }));

      if (offset === 0) {
        // First load - replace all artworks
        setAllArtworks(newArtworks);
      } else {
        // Load more - append new artworks
        setAllArtworks(prev => [...prev, ...newArtworks]);
      }
      setIsLoadingMore(false);
    }
  }, [dataArtworks, offset]);

  useEffect(() => { 
    if( deletedArtworksInFront.length > 0 ) setPaused(true);
  }, [deletedArtworksInFront, setPaused]);

  // Handle load more
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setOffset(prev => prev + limit);
  };

  // Calculate if there are more items to load
  const totalCount = countData?.artworksCount || 0;
  const hasMore = allArtworks.length < totalCount;
  const shouldShowLoadMore = hasMore && !fetching && !isLoadingMore && !countFetching;

  const hasError = !!error;

  return (
    <Container fixed sx={{my:2}}>
      <Head><title>作品一覧</title></Head>
      {
        hasError ? (
          <div>Error! {error.message}</div>
        ) : fetching && offset === 0 ? (
          <CircularProgress key={0} color="inherit" />
        ) : (
          <>
            <Grid container key={1} sx={{flexGrow: 1,}} spacing={2}>
                { allArtworks?.map((artwork) => 
                  (
                    <ArtworkListUnit
                      artwork={artwork}
                      key={artwork.slug_id}
                      deletedArtworksInFront={deletedArtworksInFront}
                    >
                      <ArtworkPopover
                        key={artwork.slug_id}
                        artwork={artwork}
                        setDeletedArtworksInFront={setDeletedArtworksInFront}
                      />
                    </ArtworkListUnit>
                  )
                )}
            </Grid>
            
            {/* Load More Button */}
            {shouldShowLoadMore && (
              <Box sx={{ textAlign: 'center', mt: 4, mb: 2 }}>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                >
                  もっと見る
                </Button>
              </Box>
            )}
            
            {/* Loading indicator for "Load More" */}
            {isLoadingMore && (
              <Box sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
                <CircularProgress color="inherit" />
              </Box>
            )}
          </>
      )}
    </Container>
  );
}