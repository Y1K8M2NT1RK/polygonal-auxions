import { prisma } from '../src/server/db'
import {
    deleteAllData,
    seedMasterData,
    seedUsers,
    seedFollows,
    seedArtworks,
    seedComments,
    seedArtworkRanks,
    seedNotifications
} from './seeds/index'

const main = async () => {
    if (process.env.NODE_ENV === 'production') {
        console.log('[seed] Production environment: skipping data reset & seeding');
        return;
    }

    const mode = (process.env.SEED_MODE || '').toLowerCase();
    const minimal = mode === 'minimal';

    console.log(`[seed] start (mode=${minimal ? 'minimal' : 'full'})`);
    await deleteAllData();
    await seedMasterData();

    if (minimal) {
        // 最小テスト投入: 1 ユーザ + 1 作品 (ユーザ seedUsers は多量生成なので直書き) 
        await prisma.user.create({
            data: {
                name: 'テストユーザー',
                name_kana: 'たなかたろう',
                handle_name: 'testuser',
                password: '$2b$10$0WqVKYJqbUhtq/Y5cHIzo.BneP7YrTiTGlH.tIwM/YOvDJIdRmiLC', // '0000'
                birthday: new Date('1990-01-01'),
                introduction: '最小シードモード用のアカウントです。',
                phone_number: '09000000000',
                email: 'aaa@example.jp',
                address: 'テスト住所',
                // @ts-ignore - role field may not be in types yet
                role: 'USER'
            }
        });
        await prisma.artwork.create({
            data: {
                user: { connect: { handle_name: 'testuser' } },
                title: 'シード用サンプル作品',
                feature: '最小シードで投入された作品データです。',
            }
        });
        console.log('[seed] minimal dataset inserted');
        return;
    }

    // フルシード
    await seedUsers();
    await seedFollows();
    await seedArtworks();
    await seedComments();
    await seedArtworkRanks();
    await seedNotifications();
    console.log('[seed] full dataset inserted');
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
