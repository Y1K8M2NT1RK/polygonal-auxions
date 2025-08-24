import {
  Grid,
  Container,
  CircularProgress,
  Button,
  Box,
  Typography
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
  const [isInitialLoad, setIsInitialLoad] = useState(true);
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
    setIsInitialLoad(true);
  }, [searchQuery]);

  // Add new artworks to the list when data is fetched
  useEffect(() => {
    if (dataArtworks?.artworks) {
      const newArtworks = dataArtworks.artworks.map((artwork: Artwork) => ({
        ...artwork,
        deletedInFront: false
      }));

      if (isInitialLoad) {
        // First load - replace all artworks
        setAllArtworks(newArtworks);
        setIsInitialLoad(false);
      } else {
        // Load more - append new artworks
        setAllArtworks(prev => [...prev, ...newArtworks]);
      }
      setIsLoadingMore(false);
    }
  }, [dataArtworks, isInitialLoad]);

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
        ) : fetching && isInitialLoad ? (
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
                        artwork={artwork}
                        setDeletedArtworksInFront={setDeletedArtworksInFront}
                      />
                    </ArtworkListUnit>
                  )
                )}
            </Grid>
            
            {/* Load More Button */}
            {shouldShowLoadMore && (
              <Box sx={{ mt: 4, mb: 2 }}>
                <Button 
                  variant="text"
                  size="large"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  sx={{
                    width: '100%',
                    py: 2,
                    borderRadius: 1,
                    backgroundColor: 'transparent',
                    '&:hover': {
                      backgroundColor: (theme) => 
                        theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.08)' 
                          : 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
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

            {/* No more results message */}
            {!hasMore && !fetching && !isLoadingMore && !countFetching && allArtworks.length > 0 && (
              <Box sx={{ textAlign: 'center', mt: 4, mb: 2 }}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontStyle: 'italic' }}
                >
                  これ以上検索結果はありません。
                </Typography>
              </Box>
            )}
          </>
      )}
    </Container>
  );
}