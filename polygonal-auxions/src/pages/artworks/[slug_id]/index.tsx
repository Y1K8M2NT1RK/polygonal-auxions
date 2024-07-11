import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'urql';
import { Artwork, ArtworkDocument } from '@/generated/graphql';
import { CircularProgress, Container, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArtworkComments from './components/artwork-comments';
import ArtworkDetail from './components/artwork-detail';

export default function Artwork(){
    const slug_id = useRouter().query.slug_id!;
    const [result] = useQuery({query: ArtworkDocument, variables: {slug_id}});
    const { fetching, error, data } = result;

    if (fetching) return (<Container><CircularProgress color="inherit" /></Container>);
    if (error) return `Error! ${error.message}`;

    const artwork: Artwork = data?.artwork;

    return (
        <Container sx={{ mt: 2, mb: 2 }}>
            <Typography variant="h4">{artwork.title}</Typography>
            <ArtworkDetail artwork={artwork}/>
            <ArtworkComments artwork={artwork}/>
        </Container>
    );
}