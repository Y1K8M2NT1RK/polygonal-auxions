import { prisma } from '../../src/pages/api/db'

export const deleteAllData = async () => {
    console.log('データの削除を開始します。');

    await prisma.artworkRanks.deleteMany(); console.log('artworkRanksの削除が完了しました。');
    await prisma.$executeRaw`ALTER SEQUENCE artwork_ranks_id_seq RESTART WITH 1;`;
    await prisma.userFiles.deleteMany(); console.log('userFilesの削除が完了しました。');
    await prisma.$executeRaw`ALTER SEQUENCE user_files_id_seq RESTART WITH 1;`;

    await prisma.ranks.deleteMany(); console.log('ranksの削除が完了しました。');
    await prisma.$executeRaw`ALTER SEQUENCE ranks_id_seq RESTART WITH 1;`;
    await prisma.rankTypes.deleteMany(); console.log('rankTypesの削除が完了しました。');
    await prisma.$executeRaw`ALTER SEQUENCE rank_types_id_seq RESTART WITH 1;`;
    
    await prisma.purpose.deleteMany(); console.log('purposesの削除が完了しました。');
    await prisma.$executeRaw`ALTER SEQUENCE purposes_id_seq RESTART WITH 1;`;

    await prisma.artworkRanks.deleteMany(); console.log('artworkRanksの削除が完了しました。');
    await prisma.$executeRaw`ALTER SEQUENCE artwork_ranks_id_seq RESTART WITH 1;`;
    await prisma.follow.deleteMany(); console.log('followsの削除が完了しました。');
    await prisma.authPayload.deleteMany(); console.log('auth_payloadの削除が完了しました。');
    await prisma.user.deleteMany(); console.log('usersの削除が完了しました。');
    await prisma.$executeRaw`ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    await prisma.artwork.deleteMany(); console.log('artworksの削除が完了しました。');
    await prisma.$executeRaw`ALTER SEQUENCE artworks_id_seq RESTART WITH 1;`;
    await prisma.comment.deleteMany(); console.log('commentsの削除が完了しました。');
    await prisma.$executeRaw`ALTER SEQUENCE comments_id_seq RESTART WITH 1;`;
};

export const seedMasterData = async () => {
    // RankTypesの作成
    await prisma.rankTypes.createMany({
        data: [{name: '評価'}, {name: '保存'}, {name: '報告'}]
    }); 
    console.log('rankTypesの作成が完了しました。');
    
    // Ranksの作成
    await prisma.ranks.createMany({
        data: [
            { name: '高評価' , rank_type_id: 1 },
            { name: '低評価' , rank_type_id: 1 },
            { name: 'お気に入り' , rank_type_id: 2 },
            { name: 'ブックマーク' , rank_type_id: 2 },
            { name: '不適切な表現（過激もしくは卑猥な表現など）' , rank_type_id: 3 },
            { name: '犯罪・テロリズムの誘発' , rank_type_id: 3 },
            { name: '虚偽のもしくは矛盾しているタイトル・サムネイル・表示内容' , rank_type_id: 3 },
            { name: 'その他' , rank_type_id: 3 },
        ]
    }); 
    console.log('ranksの作成が完了しました。');
    
    // Purposesの作成
    await prisma.purpose.createMany({
        data: [{name: 'アイコン'}, {name: '背景'},]
    }); 
    console.log('purposesの作成が完了しました。');
};
