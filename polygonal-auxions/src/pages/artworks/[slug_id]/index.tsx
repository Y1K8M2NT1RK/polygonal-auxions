import { useRouter } from 'next/router';
import { useQuery } from 'urql';
import type { Artwork } from '@/pages/generated-graphql';
import { ArtworkDocument } from '@/pages/generated-graphql';
import { CircularProgress, Container, Typography } from '@mui/material';
import ArtworkComments from './components/artwork-comments';
import ArtworkDetail from './components/artwork-detail';
import Head from 'next/head';

export default function Artwork(){
    const slug_id = useRouter().query.slug_id!;
    const [result] = useQuery({query: ArtworkDocument, variables: {slug_id}});
    const { fetching, error, data } = result;

    if (fetching) return (<Container><CircularProgress color="inherit" /></Container>);
    if (error) return `Error! ${error.message}`;

    const artwork: Artwork = data?.artwork;

    return (
        <Container sx={{ mt: 2, mb: 2 }}>
            <Head><title>{`作品「${artwork.title}」の詳細`}</title></Head>
            <Typography variant="h4">{artwork.title}</Typography>
            <ArtworkDetail artwork={artwork}/>
            <ArtworkComments artwork={artwork}/>
        </Container>
    );
}