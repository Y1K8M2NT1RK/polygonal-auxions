import React, { useState } from 'react';
import { IconButton, SxProps, Theme } from '@mui/material';
import { toast } from 'react-toastify';
import { AnyVariables, OperationResult } from 'urql';
import { User } from '../generated-graphql';

type RankButtonProps = {
  isRanked: boolean;
  onAddRank: () => Promise<OperationResult<AnyVariables, AnyVariables>>;
  onRemoveRank: () => Promise<OperationResult<AnyVariables, AnyVariables>>;
  Icon: React.ElementType;
  ActiveIcon: React.ElementType;
  color: 'primary' | 'secondary' | 'error' | 'default';
  user: User | null;
  style: SxProps<Theme>;
};

const RankButton: React.FC<RankButtonProps> = ({
    isRanked,
    onAddRank,
    onRemoveRank,
    Icon,
    ActiveIcon,
    color,
    user,
    style
}) => {
    const handleClick = async () => {
        if (!user) { return toast.error('ログインが必要です。'); }
        try {
            isRanked ? await onRemoveRank() : await onAddRank();
        } catch {
            toast.error('エラーが発生しました。');
        }
    };

    return (
        <IconButton sx={style} onClick={handleClick}>
            {isRanked ? <ActiveIcon color={color} /> : <Icon color={color} />}
        </IconButton>
    );
};

export default RankButton;