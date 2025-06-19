import {
    Card,
    CardContent,
    CardActionArea,
    Grid,
    Paper,
    Typography,
    Box,
} from '@mui/material';
import Link from 'next/link';
import { type Artwork } from '@/generated/generated-graphql';
import { DateTime } from 'luxon';
import DefaultUserIcon from '@/components/DefaultUserIcon';
import { ReactNode } from 'react';
import Image from 'next/image';

interface ArtworkListUnitProps {
    artwork: Artwork & { deletedInFront: boolean };
    deletedArtworksInFront: { artwork_id: number; deleted: boolean }[];
    children: ReactNode;
}

export default function ArtworkListUnit({ artwork, deletedArtworksInFront, children }: ArtworkListUnitProps) {
    return (
        <Grid size={{xs: 12, md: 6, lg: 4}} sx={{ height: '25em', }}>
            {
                !!deletedArtworksInFront?.some(val => val.artwork_id == parseInt(artwork.id))
                ? <Paper sx={{
                    p: '10px',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 1.0)',
                    border: '1px #ffffff solid',
                }} elevation={9}>
                    <Typography>この作品は削除されました</Typography>
                </Paper>
                : <Paper sx={{p: '10px', width: '100%', height: '100%',}} elevation={9}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Link href={`/profile/${artwork?.user.handle_name}`} style={{display: 'flex', alignItems: 'center'}} passHref>
                            <DefaultUserIcon name={artwork?.user.handle_name} furtherProp={{ mr: '10px', mt: '10px', mb: '10px' }} />
                            <Typography>{artwork?.user.handle_name}</Typography>
                        </Link>
                        {children}
                    </Box>
                    <Card sx={{display: 'flex', flexDirection: 'column',}}>
                        <Link href={`/artworks/${artwork?.slug_id}`} passHref>
                            <CardActionArea sx={{height: "15em"}}>
                                <CardContent>
                                    {
                                        !!(artwork?.artwork_file) && artwork?.artwork_file.length > 0
                                        ? <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <Image
                                                src={`${artwork.artwork_file[0]?.file_path}`}
                                                alt={artwork?.title}
                                                fill
                                                style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'cover'}}
                                            />
                                          </Box>
                                        : <Typography variant="h3" sx={{display: 'flex', justifyContent: 'center', opacity: 0.3}}>NO IMAGE</Typography>
                                    }
                                </CardContent>
                            </CardActionArea>
                        </Link>
                    </Card>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            width: {
                                xs: '80vw',
                                md: '100%',
                            }
                        }}
                    >{artwork?.title}</Typography>
                    <Typography variant="subtitle2">{DateTime.fromISO(artwork?.created_at).toFormat('yyyy年MM月dd日')}にアップロード</Typography>
                </Paper>
            }
        </Grid>
    )
}