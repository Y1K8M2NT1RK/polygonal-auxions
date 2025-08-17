import React, { useState } from 'react';
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Typography,
    Tabs,
    Tab
} from '@mui/material';
import Link from 'next/link';
import type { User, Artwork, Comment } from '@/generated/generated-graphql';
import { DateTime } from 'luxon';
import Image from 'next/image';

type Props = {
    user: User
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`profile-tabpanel-${index}`}
            aria-labelledby={`profile-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ pt: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `profile-tab-${index}`,
        'aria-controls': `profile-tabpanel-${index}`,
    };
}

export default function ProfileTabs({ user }: Props) {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const renderArtworks = () => (
        <Grid container sx={{ flexGrow: 1 }} spacing={1}>
            {(!user?.artworks.length)
                ? <CardContent><Typography>作品はありません</Typography></CardContent>
                : user.artworks.map((artwork: Artwork, index: number) => (
                    <Grid key={index} size={{ xs: 12 }} sx={{ width: '100%' }}>
                        <Card sx={{ p: '10px', mb: 1 }}>
                            <Box sx={{ display: 'flex', width: '100%' }}>
                                <Link href={`/artworks/${artwork.slug_id}`} style={{ height: '100px', aspectRatio: '5 / 3', flexShrink: 0 }} passHref>
                                    <CardActionArea sx={{
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        height: '100px',
                                    }}>
                                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {
                                                !!(artwork?.artwork_file) && artwork?.artwork_file.length > 0
                                                    ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Image
                                                            fill
                                                            priority
                                                            src={`${artwork.artwork_file[0]?.file_path}`}
                                                            alt={artwork?.title}
                                                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                                                        />
                                                    </Box>
                                                    : <Typography variant="h5" sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        opacity: 0.3,
                                                    }}>NO IMAGE</Typography>
                                            }
                                        </CardContent>
                                    </CardActionArea>
                                </Link>
                                <CardContent sx={{ py: 0, flex: 1 }}>
                                    <Typography variant="subtitle1" sx={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "-webkit-box",
                                        WebkitLineClamp: "1",
                                        WebkitBoxOrient: "vertical",
                                    }}>{artwork.title}</Typography>
                                    <Typography variant="subtitle2">{DateTime.fromISO(artwork.created_at).toFormat('yyyy年MM月dd日')}にアップロード</Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    );

    const renderComments = () => (
        <Grid container sx={{ flexGrow: 1 }} spacing={1}>
            {user?.comments == undefined || (user?.comments.length == 0)
                ? <CardContent><Typography>投稿したコメントはありません</Typography></CardContent>
                : user.comments.map((comment: Comment, index: number) => (
                    <Grid key={index} size={{ xs: 12 }} sx={{ width: '100%' }}>
                        <Card sx={{ p: '10px', mb: 1 }}>
                            <Box sx={{ display: 'flex', width: '100%' }}>
                                <Link href={`/artworks/${comment.artwork.slug_id}`} style={{ height: '100px', aspectRatio: '5 / 3', flexShrink: 0 }} passHref>
                                    <CardActionArea sx={{ height: '100px' }}>
                                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {
                                                !!(comment.artwork?.artwork_file) && comment.artwork?.artwork_file.length > 0
                                                    ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Image
                                                            fill
                                                            priority
                                                            src={`${comment.artwork.artwork_file[0]?.file_path}`}
                                                            alt={comment.artwork?.title}
                                                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                                                        />
                                                    </Box>
                                                    : <Typography variant="h5" sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        opacity: 0.3,
                                                    }}>NO IMAGE</Typography>
                                            }
                                        </CardContent>
                                    </CardActionArea>
                                </Link>
                                <CardContent sx={{ py: 0, flex: 1 }}>
                                    <Typography sx={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "-webkit-box",
                                        WebkitLineClamp: "3",
                                        WebkitBoxOrient: "vertical",
                                    }}>{comment.body}</Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    );

    return (
        <Card sx={{ my: 1, py: '20px', px: '20px' }} elevation={9}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="profile tabs" variant="fullWidth">
                    <Tab label={`作品 (${user?.artworks?.length || 0})`} {...a11yProps(0)} />
                    <Tab label={`コメント (${user?.comments?.length || 0})`} {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {renderArtworks()}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {renderComments()}
            </TabPanel>
        </Card>
    );
}