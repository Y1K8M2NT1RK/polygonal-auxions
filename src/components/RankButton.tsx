import { FormEvent, useRef, ElementType } from 'react';
import { IconButton, SxProps, Theme } from '@mui/material';
import { toast } from 'react-toastify';
import { AnyVariables, OperationResult } from 'urql';
import { User } from '@/generated/generated-graphql';

type RankButtonProps = {
  isRanked: boolean;
  onAddRank: () => Promise<OperationResult<AnyVariables, AnyVariables>>;
  onRemoveRank: () => Promise<OperationResult<AnyVariables, AnyVariables>>;
  Icon: ElementType;
  ActiveIcon: ElementType;
  color: 'primary' | 'secondary' | 'error' | 'default';
  user: User | null;
  style: SxProps<Theme>;
};

export default function RankButton({
    isRanked,
    onAddRank,
    onRemoveRank,
    Icon,
    ActiveIcon,
    color,
    user,
    style
}: RankButtonProps){
    const processing = useRef(false);
    const handleClick = async (event: FormEvent) => {
        // クライアントサイド専用の処理
        if (typeof window !== 'undefined'){
            event.preventDefault();
            event.stopPropagation();
        }

        if(processing.current == true) return;
        processing.current = true;

        if (!user) {
            toast.error('ログインが必要です。');
            processing.current = false;
            return;
        }
        try {
            isRanked ? await onRemoveRank() : await onAddRank();
        } catch {
            toast.error('エラーが発生しました。');
        } finally {
            processing.current = false;
        }
    };

    return (
        <IconButton disabled={processing.current||false} sx={style} onClick={handleClick}>
            {isRanked ? <ActiveIcon color={color} /> : <Icon color={color} />}
        </IconButton>
    );
};