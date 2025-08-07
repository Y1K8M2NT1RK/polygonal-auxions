import { prisma } from '../src/pages/api/db'
import {
    deleteAllData,
    seedMasterData,
    seedUsers,
    seedFollows,
    seedArtworks,
    seedComments,
    seedArtworkRanks
} from './seeds/index'

const main = async () => {
    // 途中で止まった場合に備えて、その時点まで作成したデータを全て削除
    await prisma.$transaction(async (prisma) => {
        if( process.env.NODE_ENV === 'production' ) return;

        // データの削除
        await deleteAllData();
        
        // マスターデータの作成
        await seedMasterData();
        
        // ダミーデータの生成（40-50件）
        await seedUsers();
        await seedFollows();
        await seedArtworks();
        await seedComments();
        await seedArtworkRanks();
    });
};

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally( async () => {
        await prisma.$disconnect()
    })
;
