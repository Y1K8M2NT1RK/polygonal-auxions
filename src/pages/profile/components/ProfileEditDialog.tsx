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
} from '@mui/material';
import DefaultUserIcon from '@/components/DefaultUserIcon';
import { useForm, Controller } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { User } from '@/generated/generated-graphql';
import { DateTime } from 'luxon';
import { DateField } from '@mui/x-date-pickers';
// import Image from 'next/image';
import { useMutation } from 'urql';
import { UpdateMyProfileDocument } from '@/generated/generated-graphql';
import { toast } from 'react-toastify';

type ProfileEditDialogProps = {
    isDialogOpen: boolean;
    onClose: () => void;
    user: User
};

export default function ProfileEditDialog({isDialogOpen, onClose, user}: ProfileEditDialogProps) {
    const {isSmallScreen} = useResponsive();

    const { register, handleSubmit, formState: { errors }, setError, reset, control } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            name: user?.name,
            name_kana: user?.name_kana,
            birthday: DateTime.fromISO(user?.birthday),
            address: user?.address,
            phone_number: user?.phone_number,
            introduction: user?.introduction,
        },
    });

    const [, updateMyProfile] = useMutation(UpdateMyProfileDocument);
    const onSubmit = handleSubmit(async (data) => {
        return updateMyProfile(data).then(result => {
            if(result.error){
                const gqlErrors:string[] = result.error?.graphQLErrors[0].extensions.messages as string[];
                for( const [key, val] of Object.entries(gqlErrors) ) setError(`root.${key}`, {type: 'server', message: val[0]});
                toast.error('更新できません。入力内容をお確かめください。');
                return;
            }
            toast.success('更新できました。');
            onClose();
            return;
        });
    });
    
    const handleClose = () => {onClose(); reset(); toast.info('編集をキャンセルしました');};

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
                            {/* <Image
                                src=""
                                width={700}
                                height={200}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'cover',
                                    opacity: 0.3,
                                }}
                                priority
                            /> */}
                            <DefaultUserIcon name={user?.handle_name} furtherProp={{ width: 60, height: 60, fontSize: 30, my: 2 }} />
                            <FormControl fullWidth sx={{my: 2}}>
                                <TextField
                                    size="small"
                                    label="ユーザーハンドル名"
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    InputProps={{ style: { fontSize: 20 } }}
                                    defaultValue={user?.handle_name}
                                    disabled
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{my: 2}}>
                                <TextField
                                    size="small"
                                    label="メールアドレス"
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    InputProps={{ style: { fontSize: 20 } }}
                                    defaultValue={user?.email}
                                    disabled
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{my: 2}}>
                                <TextField
                                    size="small"
                                    label="名前"
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    InputProps={{ style: { fontSize: 20 } }}
                                    defaultValue={user?.name}
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
                                    defaultValue={user?.name_kana}
                                    {...register("name_kana")}
                                    error={!!errors?.root?.name_kana?.message}
                                    helperText={errors?.root?.name_kana?.message ? errors?.root?.name_kana?.message : null}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{my: 2}}>
                                <Controller
                                    name="birthday"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <DateField
                                            size="small"
                                            label="生年月日"
                                            format="yyyy-MM-dd"
                                            value={field.value}
                                            onChange={field.onChange}
                                            slotProps={{
                                                textField: {
                                                    error: !!fieldState.error,
                                                    helperText: fieldState.error?.message,
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{my: 2}}>
                                <TextField
                                    size="small"
                                    label="住所"
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    InputProps={{ style: { fontSize: 20 } }}
                                    defaultValue={user?.address}
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
                                    defaultValue={user?.phone_number}
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
                                    defaultValue={user?.introduction}
                                    multiline
                                    rows={4}
                                    {...register("introduction")}
                                    error={!!errors?.root?.introduction?.message}
                                    helperText={errors?.root?.introduction?.message ? errors?.root?.introduction?.message : null}
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