import useResponsive from '@/hooks/useResponsive';
import {
    Box,
    Dialog,
    DialogTitle,
    Typography,
    TextField,
    IconButton,
    Card,
    CardContent,
    FormControl,
    Button,
    Fab,
    Input,
    Paper,
} from '@mui/material';
import DefaultUserIcon from '@/components/DefaultUserIcon';
import { useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { User, UserFiles } from '@/generated/generated-graphql';
import { DateTime } from 'luxon';
import Image from 'next/image';
import { useMutation } from 'urql';
import { UpdateMyProfileDocument } from '@/generated/generated-graphql';
import { toast } from 'react-toastify';
import { useState, type ChangeEvent } from 'react';
import { upload } from "@vercel/blob/client";
import { BLOB_BASE_DIR } from '@/constants/blob';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useUserProfile } from '@/contexts/Profile/ProfileContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import gql from 'graphql-tag';

// GraphQL mutation for password update
const UpdatePasswordDocument = gql`
  mutation UpdatePassword($password: String!, $passwordConfirmation: String!) {
    updatePassword(password: $password, passwordConfirmation: $passwordConfirmation) {
      ... on MutationUpdatePasswordSuccess {
        __typename
      }
      ... on ZodError {
        __typename
        message
        fieldErrors {
          message
        }
      }
    }
  }
`;

type ProfileEditDialogProps = {
    isDialogOpen: boolean;
    onClose: () => void;
    user: User;
    userImages: {
        bg: UserFiles | null;
        icon: UserFiles | null;
    }
};

type UserImages = {
    is_image_deleted: boolean;
    current_image_url?: string;
    image_url: string;
    content_type: string;
};

type FormData = {
    name: string;
    name_kana: string;
    birthday: DateTime | null;
    address: string;
    phone_number: string;
    introduction: string;
    bg: UserImages;
    icon: UserImages;
    password: string;
    passwordConfirmation: string;
};

const getBlobDatasetUrl = async (file: File, dirname: string): Promise<{ image_url: string; content_type: string; }> => {
    const { url, contentType } = await upload(
        `/${BLOB_BASE_DIR}/users/${dirname}/${file.name}`,
        file,
        { access: 'public', handleUploadUrl: '/api/upload' }
    );
    return { image_url: url, content_type: contentType };
}

export default function ProfileEditDialog({isDialogOpen, onClose}: ProfileEditDialogProps) {
    const {profile, reExecuteProfile} = useUserProfile();

    const userForEdit: User = profile;
    const userImages = {
        bg: userForEdit?.user_files.filter((val) => val.purpose_id=='1')[0],
        icon: userForEdit?.user_files.filter((val) => val.purpose_id=='2')[0],
    };

    const { register, handleSubmit, formState: { errors }, setError, reset, control, watch, setValue } = useForm<FormData>({
        mode: 'onSubmit',
        defaultValues: {
            bg: { is_image_deleted: false, image_url: undefined, content_type: undefined },
            icon: { is_image_deleted: false, image_url: undefined, content_type: undefined },
            password: '',
            passwordConfirmation: '',
        },
    });

    const [imageUpload, setImageUpload] = useState<{ bg: File | null; icon: File | null }>({ bg: null, icon: null });
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const isImageDeleted = {
        bg: watch('bg.is_image_deleted'),
        icon: watch('icon.is_image_deleted'),
    };

    const {isSmallScreen} = useResponsive();

    const [, updateMyProfile] = useMutation(UpdateMyProfileDocument);
    const [, updatePassword] = useMutation(UpdatePasswordDocument);

    const onSubmit = handleSubmit(async (data) => {
        try {
            // パスワード更新の処理を最初に実行
            if (data.password && data.passwordConfirmation) {
                const passwordResult = await updatePassword({
                    password: data.password,
                    passwordConfirmation: data.passwordConfirmation
                });
                
                if (passwordResult.error) {
                    const gqlErrors: string[] = passwordResult.error?.graphQLErrors[0].extensions.messages as string[];
                    for (const [key, val] of Object.entries(gqlErrors)) {
                        setError(`root.${key}`, { type: 'server', message: val[0] });
                    }
                    toast.error('パスワードを更新できません。入力内容をお確かめください。');
                    return;
                }
                toast.success('パスワードが更新されました。');
            }

            // 既存のプロフィール更新処理
            // アップロードが必要な場合のみ
            if (imageUpload.bg || imageUpload.icon) {
                const uploadDatas: Promise<{ image_url: string; content_type: string } | null>[] = [
                    imageUpload.bg ? getBlobDatasetUrl(imageUpload.bg, "bg") : Promise.resolve(null),
                    imageUpload.icon ? getBlobDatasetUrl(imageUpload.icon, "icon") : Promise.resolve(null),
                ];
                const [bgResult, iconResult] = await Promise.all(uploadDatas);
                if (bgResult) {
                    data.bg.image_url = bgResult.image_url;
                    data.bg.content_type = bgResult.content_type;
                }
                if (iconResult) {
                    data.icon.image_url = iconResult.image_url;
                    data.icon.content_type = iconResult.content_type;
                }
            }

            // パスワードフィールドを除いたプロフィール更新データを作成
            const { password, passwordConfirmation, ...profileData } = data;
            
            return updateMyProfile(profileData).then(result => {
                if(result.error){
                    const gqlErrors:string[] = result.error ?.graphQLErrors[0].extensions.messages as string[];
                    for( const [key, val] of Object.entries(gqlErrors) ) setError(`root.${key}`, {type: 'server', message: val[0]});
                    toast.error('更新できません。入力内容をお確かめください。');
                    return;
                }
                reExecuteProfile();
                setImageUpload({ bg: null, icon: null });
                reset({
                    birthday: data.birthday,
                    bg: { current_image_url: userImages?.bg?.file_path, is_image_deleted: false, image_url: undefined, content_type: undefined },
                    icon: { current_image_url: userImages?.icon?.file_path, is_image_deleted: false, image_url: undefined, content_type: undefined },
                    password: '',
                    passwordConfirmation: '',
                });
                console.log(userImages);
                toast.success('更新できました。');
                onClose();
            });
        } catch (error) {
            console.error('Update error:', error);
            toast.error('更新中にエラーが発生しました。');
        }
    });
    
    const handleClose = () => {
        onClose();
        setImageUpload({ bg: null, icon: null });
        reset({
            bg: { is_image_deleted: false, image_url: undefined, content_type: undefined },
            icon: { is_image_deleted: false, image_url: undefined, content_type: undefined },
            password: '',
            passwordConfirmation: '',
        });
        setShowPassword(false);
        setShowPasswordConfirmation(false);
        toast.info('編集をキャンセルしました');
    };

    return (
        <Box>
            <Dialog
                open={isDialogOpen}
                onClose={handleClose}
                fullScreen={isSmallScreen}
                fullWidth
            >
                <Card>
                    <DialogTitle>
                        <Box sx={{ display: 'flex', justifyContent: 'center',}}>
                            <Typography variant="h5">プロフィール編集</Typography>
                            <IconButton aria-label="close" onClick={handleClose} sx={{position: 'absolute', right: '10px', top: '10px'}} ><CloseIcon /></IconButton>
                        </Box>
                    </ DialogTitle>
                    <CardContent sx={{ height: '600px', overflowY: 'auto',}}>
                        <Box
                            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}}
                            component="form"
                            onSubmit={onSubmit}
                        >
                            <FormControl><TextField hidden {...register("bg.current_image_url")} defaultValue={userImages?.bg?.file_path} /></FormControl>
                            <FormControl><TextField hidden {...register("bg.is_image_deleted")} /></FormControl>
                            <FormControl><TextField hidden {...register("icon.current_image_url")} defaultValue={userImages?.icon?.file_path} /></FormControl>
                            <FormControl><TextField hidden {...register("icon.is_image_deleted")} /></FormControl>
                            <FormControl sx={{ my: 2 }}>
                                <Box component="label" sx={{overflow: 'hidden', cursor: 'pointer', position: 'relative',}}>
                                    {
                                        isImageDeleted.bg==false && ((!!(userImages?.bg?.file_path) && userImages?.bg?.file_path.length > 0) || !!imageUpload.bg)
                                        ?   <Image
                                            src={imageUpload?.bg ? URL.createObjectURL(imageUpload?.bg as Blob) : `${userImages?.bg?.file_path}`}
                                            alt="背景"
                                            width={800}
                                            height={200}
                                            style={{maxWidth: '100%', maxHeight: '150px', objectFit: 'cover', opacity: 0.3,}}
                                            priority
                                        />
                                        :   <Paper sx={{ height: '150px', width: `${isSmallScreen==true ? '90vw': '500px'}`, objectFit: 'cover'}}>
                                            <Typography variant="h3" sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: '100%',
                                                opacity: 0.3,
                                            }}>NO IMAGE</Typography>
                                        </ Paper>
                                    }
                                    <Input
                                        type="file"
                                        inputProps={{ multiple: false, }}
                                        sx={{ display: 'none' }}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            setValue("bg.is_image_deleted", false);
                                            setImageUpload(prev => ({
                                                bg: e.target.files ? e.target.files[0] : null,
                                                icon: prev.icon
                                            }));
                                        }}
                                    />
                                    <Box sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}>
                                        <Box sx={{width: 'max-content', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                                            <Typography>クリックして背景画像を変更</Typography>
                                            {
                                                ((
                                                        isImageDeleted.bg==false
                                                    &&  (!!(userImages?.bg?.file_path) && userImages?.bg?.file_path.length > 0)
                                                )   ||  !!imageUpload.bg
                                                ) && <Button onClick={(e) => {
                                                    e.preventDefault();
                                                    setValue("bg.is_image_deleted", true);
                                                    setImageUpload(prev => ({bg: null, icon: prev.icon}));
                                                }}>背景画像を削除</Button>
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </FormControl>
                            <Box sx={{ my: 2,}}>
                                <FormControl sx={{ display: 'flex', alignItems: 'center',}}>
                                    <Box component="label" sx={{ borderRadius: '50%', overflow: 'hidden', cursor: 'pointer'}}>
                                        <DefaultUserIcon
                                            name={userForEdit?.handle_name}
                                            furtherProp={{ width: 60, height: 60, fontSize: 30}}
                                            isImageDeleted={isImageDeleted.icon==true && !(!!(userImages?.icon?.file_path) && userImages?.icon?.file_path.length <= 0) && !imageUpload.icon}
                                            imagePath={imageUpload?.icon ? URL.createObjectURL(imageUpload?.icon as Blob) : `${userImages?.icon?.file_path}`}
                                        />
                                    </Box>
                                </FormControl>
                                <Box sx={{ width: '300px' }}>
                                    {
                                       (isImageDeleted.icon==false && ((!!(userImages?.icon?.file_path) && userImages?.icon?.file_path.length > 0) || !!imageUpload.icon)) && (
                                            <Fab
                                                color="error"
                                                variant="extended"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setValue("icon.is_image_deleted", true);
                                                    setImageUpload(prev => ({bg: prev.bg, icon: null}));
                                                }}
                                                sx={{mt: 2, width: '100%'}}
                                            >
                                                <HighlightOffIcon />
                                                アイコン画像を削除
                                            </Fab>
                                        )
                                    }
                                    <Fab
                                        component="label"
                                        color="inherit"
                                        variant="extended"
                                        sx={{ mt: 2, backgroundColor: '#444444', width: '100%'}}
                                    >
                                        アイコン画像を{(
                                            isImageDeleted.icon==false
                                            && (
                                                (!!(userImages?.icon?.file_path) && userImages?.icon?.file_path.length > 0)
                                                || !!imageUpload.icon
                                            )) ? '変更' : 'アップロード'}
                                        <Input
                                            type="file"
                                            inputProps={{ multiple: false, }}
                                            sx={{ display: 'none' }}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                setValue("icon.is_image_deleted", false);
                                                setImageUpload((prev => ({bg: prev.bg, icon: e.target.files ? e.target.files[0] : null})));
                                            }}
                                        />
                                    </Fab>
                                </Box>
                            </Box>
                            <FormControl fullWidth sx={{my: 2}}>
                                <TextField
                                    size="small"
                                    label="ユーザーハンドル名"
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    InputProps={{ style: { fontSize: 20 } }}
                                    defaultValue={userForEdit?.handle_name}
                                    disabled
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{my: 2}}>
                                <TextField
                                    size="small"
                                    label="メールアドレス"
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    InputProps={{ style: { fontSize: 20 } }}
                                    defaultValue={userForEdit?.email}
                                    disabled
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{my: 2}}>
                                <TextField
                                    size="small"
                                    label="名前"
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    InputProps={{ style: { fontSize: 20 } }}
                                    defaultValue={userForEdit?.name}
                                    {...register("name")}
                                    error={!!errors?.root?.name?.message}
                                    helperText={errors?.root?.name?.message ? errors?.root?.name?.message : null}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{my: 2}}>
                                <TextField
                                    size="small"
                                    label="名前（かな）"
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    InputProps={{ style: { fontSize: 20 } }}
                                    defaultValue={userForEdit?.name_kana}
                                    {...register("name_kana")}
                                    error={!!errors?.root?.name_kana?.message}
                                    helperText={errors?.root?.name_kana?.message ? errors?.root?.name_kana?.message : null}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{my: 2}}>
                                <TextField
                                    size="small"
                                    type="date"
                                    label="生年月日"
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    InputProps={{ style: { fontSize: 20 } }}
                                    defaultValue={DateTime.fromISO(userForEdit?.birthday).toFormat('yyyy-MM-dd')}
                                    {...register("birthday")}
                                    error={!!errors?.root?.birthday?.message}
                                    helperText={errors?.root?.birthday?.message ? errors?.root?.birthday?.message : null}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{my: 2}}>
                                <TextField
                                    size="small"
                                    label="住所"
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    InputProps={{ style: { fontSize: 20 } }}
                                    defaultValue={userForEdit?.address}
                                    {...register("address")}
                                    error={!!errors?.root?.address?.message}
                                    helperText={errors?.root?.address?.message ? errors?.root?.address?.message : null}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{my: 2}}>
                                <TextField
                                    size="small"
                                    label="電話番号"
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    InputProps={{ style: { fontSize: 20 } }}
                                    defaultValue={userForEdit?.phone_number}
                                    {...register("phone_number")}
                                    error={!!errors?.root?.phone_number?.message}
                                    helperText={errors?.root?.phone_number?.message ? errors?.root?.phone_number?.message : null}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{my: 2}}>
                                <TextField
                                    size="small"
                                    label="自己紹介"
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    InputProps={{ style: { fontSize: 20 } }}
                                    defaultValue={userForEdit?.introduction}
                                    multiline
                                    rows={4}
                                    {...register("introduction")}
                                    error={!!errors?.root?.introduction?.message}
                                    helperText={errors?.root?.introduction?.message ? errors?.root?.introduction?.message : null}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{my: 2}}>
                                <TextField
                                    size="small"
                                    type={showPassword ? 'text' : 'password'}
                                    label="新しいパスワード"
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    InputProps={{ 
                                        style: { fontSize: 20 },
                                        endAdornment: (
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        ),
                                    }}
                                    {...register("password")}
                                    error={!!errors?.root?.password?.message}
                                    helperText={errors?.root?.password?.message ? errors?.root?.password?.message : null}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{my: 2}}>
                                <TextField
                                    size="small"
                                    type={showPasswordConfirmation ? 'text' : 'password'}
                                    label="新しいパスワード（確認用）"
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    InputProps={{ 
                                        style: { fontSize: 20 },
                                        endAdornment: (
                                            <IconButton
                                                aria-label="toggle password confirmation visibility"
                                                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                                edge="end"
                                            >
                                                {showPasswordConfirmation ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        ),
                                    }}
                                    {...register("passwordConfirmation")}
                                    error={!!errors?.root?.passwordConfirmation?.message}
                                    helperText={errors?.root?.passwordConfirmation?.message ? errors?.root?.passwordConfirmation?.message : null}
                                />
                            </FormControl>
                            <Box sx={{display:'flex', flexDirection:'column', width: isSmallScreen ? '100%' : '70%'}}>
                                <Fab
                                    component={Button}
                                    type="submit"
                                    color="inherit"
                                    variant="extended"
                                    sx={{mt: 2, backgroundColor: '#444444',}}
                                >更新</Fab>
                                <Fab
                                    component={Button}
                                    variant="extended"
                                    onClick={handleClose}
                                    sx={{mt: 2,}}
                                >更新しないで閉じる</Fab>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Dialog>
        </Box>
    )
}