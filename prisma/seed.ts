import { prisma } from '../src/pages/api/db'

const main = async () => {
    // 途中で止まった場合に備えて、その時点まで作成したデータを全て削除
    await prisma.$transaction(async (prisma) => {
        if( process.env.NODE_ENV === 'production' ) return;

        console.log('データの削除を開始します。');

        await prisma.artworkRanks.deleteMany(); console.log('artworkRanksの削除が完了しました。');
        await prisma.$executeRaw`ALTER SEQUENCE artwork_ranks_id_seq RESTART WITH 1;`;
        await prisma.userFiles.deleteMany(); console.log('userFilesの削除が完了しました。');
        await prisma.$executeRaw`ALTER SEQUENCE user_files_id_seq RESTART WITH 1;`;

        await prisma.ranks.deleteMany(); console.log('ranksの削除が完了しました。');
        await prisma.$executeRaw`ALTER SEQUENCE ranks_id_seq RESTART WITH 1;`;
        await prisma.rankTypes.deleteMany(); console.log('rankTypesの削除が完了しました。');
        await prisma.$executeRaw`ALTER SEQUENCE rank_types_id_seq RESTART WITH 1;`;
        await prisma.rankTypes.createMany({
            data: [{name: '評価'}, {name: '保存'}, {name: '報告'}]
        }); console.log('rankTypesの作成が完了しました。');
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
        }); console.log('ranksの作成が完了しました。');
        await prisma.purpose.deleteMany(); console.log('purposesの削除が完了しました。');
        await prisma.$executeRaw`ALTER SEQUENCE purposes_id_seq RESTART WITH 1;`;
        await prisma.purpose.createMany({
            data: [{name: 'アイコン'}, {name: '背景'},]
        }); console.log('purposesの作成が完了しました。');

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
        // 初期データ群
        await prisma.user.createMany({
            data: [
                { 
                    name: '田中太郎', name_kana: 'たなかたろう', handle_name: 'tanaka_dee', password: '0000',
                    birthday: new Date(1980, 6, 1).toISOString(), introduction: '悔しいです！',
                    phone_number: '00000000000', email: 'nnnn@nnnn.jp', address: '住所1-住所2-住所3'
                },
                { 
                    name: '砂野花子', name_kana: 'すなのはなこ', handle_name: 'sand_hanako', password: '0000',
                    birthday: new Date(1992, 11, 14).toISOString(), introduction: '砂砂',
                    phone_number: '10000000001', email: 'abcd@efgh.jp', address: '住所4-住所5-住所6'
                },
                { 
                    name: '園部孝仁', name_kana: 'そのべたかひと', handle_name: 'sonobe_maxo', password: '0000',
                    birthday: new Date(2001, 5, 3).toISOString(), introduction: '園部の園部だじょ',
                    phone_number: '20000200002', email: 'sonobett@fefe.jp', address: '住所A-住所B-住所C'
                },
                { 
                    name: 'BobLandy', name_kana: 'ぼぶらんでぃ', handle_name: 'bob_bob_l', password: '0000',
                    birthday: new Date(1997, 8, 29).toISOString(), introduction: 'Hi guys, Its bob',
                    phone_number: '30100300103', email: 'bob_l_bob@bbbbbb.us', address: 'addressD-addressE-addressF'
                },
                { 
                    name: 'MichaelChrischof', name_kana: 'みかえるくりすちょふ', handle_name: 'chris_00', password: '0000',
                    birthday: new Date(2003, 10, 7).toISOString(), introduction: '',
                    phone_number: '444444444444', email: 'chris-mich@ccccccc.ru', address: 'addressG-addressH-addressI'
                },
                { 
                    name: '升野招聘', name_kana: 'ますのしょうへい', handle_name: 'masno_max', password: '0000',
                    birthday: new Date(1984, 6, 1).toISOString(), introduction: '',
                    phone_number: '21321321321', email: 'masno@maxmaxmax.jp', address: '住所7-住所8-住所9'
                },
                { 
                    name: '神田尚成', name_kana: 'かんだひさのり', handle_name: 'yellow_man', password: '0000',
                    birthday: new Date(1984, 12, 3).toISOString(), introduction: '神田です。神戸市在住です。',
                    phone_number: '909090909090', email: 'hisanohisa@jujuju.jp', address: '住所10-住所11-住所12'
                },
                { 
                    name: 'JoePepper', name_kana: 'ジョーペッパー', handle_name: 'joe_pepper', password: '0000',
                    birthday: new Date(2001, 4, 12).toISOString(), introduction: '',
                    phone_number: '888888888888', email: 'peppjoe@robrob.us', address: 'addressJ-addressK-addressL'
                },
            ]
        }); console.log('userの作成が完了しました。');
        await prisma.follow.createMany({
            data: [
                { following_id: 1, followed_by_id: 2, }, { following_id: 1, followed_by_id: 5, }, { following_id: 1, followed_by_id: 8, },
                { following_id: 2, followed_by_id: 1, }, { following_id: 2, followed_by_id: 7, },
                { following_id: 3, followed_by_id: 5, },
                { following_id: 5, followed_by_id: 2, }, { following_id: 5, followed_by_id: 3, }, { following_id: 5, followed_by_id: 7, }, { following_id: 5, followed_by_id: 8, },
                { following_id: 7, followed_by_id: 2, }, { following_id: 7, followed_by_id: 5, },
                { following_id: 8, followed_by_id: 2, }, { following_id: 8, followed_by_id: 7, },
            ]
        }); console.log('followsの作成が完了しました。');
        await prisma.artwork.createMany({
            data: [
                { title: '作品A作品A', likes: 30, bads: 5, feature: '作品Aの特徴', user_id: 2, created_at: new Date(2024, 1, 3).toISOString()},
                { title: '作品B', likes: 12, bads: 8, feature: '作品Bの特徴作品Bの特徴', user_id: 2, created_at: new Date(2024, 1, 19).toISOString()},
                { title: '作品C作品C作品C', likes: 130, bads: 45, feature: '作品Cの特徴作品Cの特徴作品Cの特徴作品Cの特徴作品Cの特徴作品Cの特徴作品Cの特徴', user_id: 1, created_at: new Date(2024, 4, 15).toISOString()},
                { title: '作品D', likes: 39, bads: 15, feature: '作品Dの特徴', user_id: 3, created_at: new Date(2024, 3, 8).toISOString()},
                { title: '作品E作品E作品E作品E作品E作品E作品E作品E作品E作品E', likes: 220, bads: 13, feature: '作品Eの特徴作品Eの特徴作品Eの特徴作品Eの特徴作品Eの特徴作品Eの特徴作品Eの特徴作品Eの特徴作品Eの特徴作品Eの特徴', user_id: 3, created_at: new Date(2024, 3, 19).toISOString()},
                { title: '作品F作品F作品F', likes: 9, bads: 0, feature: '作品Fの特徴', user_id: 3, created_at: new Date(2024, 4, 8).toISOString()},
                { title: '作品G', likes: 189, bads: 48, feature: '作品Gの特徴作品Gの特徴作品Gの特徴作品Gの特徴作品Gの特徴作品Gの特徴', user_id: 4, created_at: new Date(2024, 4, 1).toISOString()},
                { title: '作品HHHH', likes: 23, bads: 9, feature: '作品HHHHの特徴作品HHHHの特徴作品HHHHの特徴作品HHHHの特徴', user_id: 3, created_at: new Date(2024, 2, 17).toISOString()},
                { title: 'I作品II作品II作品II作品II作品II作品II作品II作品I', likes: 0, bads: 0, feature: 'I作品II作品II作品II作品II作品II作品II作品II作品Iの特徴I作品II作品II作品II作品II作品II作品II作品II作品Iの特徴', user_id: 3, created_at: new Date(2024, 1, 8).toISOString()},
                { title: 'JJJJ作品JJJJ', likes: 7, bads: 1, feature: 'JJJJ作品JJJJの特徴', user_id: 3, created_at: new Date(2024, 2, 8).toISOString()},
                { title: '作品K作品K作品K作品K作品K', likes: 51, bads: 12, feature: '作品K作品K作品K作品K作品Kの特徴作品K作品K作品K作品K作品Kの特徴作品K作品K作品K作品K作品Kの特徴', user_id: 3, created_at: new Date(2024, 3, 28).toISOString()},
                { title: 'L作品LL', likes: 91, bads: 31, feature: 'L作品LLL作品LLL作品LLL作品LLの特徴', user_id: 1, created_at: new Date(2024, 2, 21).toISOString()},
            ]
        }); console.log('artworkの作成が完了しました。');
        await prisma.comment.createMany({
            data: [
                { user_id: 1, artwork_id: 3, body: 'Wow, this is good', created_at: new Date(2024, 4, 15).toISOString()},
                { user_id: 1, artwork_id: 2, body: 'Great works!', created_at: new Date(2024, 1, 19).toISOString()},
                { user_id: 5, artwork_id: 6, body: 'ナニコレスゴイ1ナニコレスゴイ1ナニコレスゴイ1ナニコレスゴイ1ナニコレスゴイ1ナニコレスゴイ1', created_at: new Date(2024, 4, 8).toISOString()},
                { user_id: 5, artwork_id: 2, body: 'ナニコレスゴイ2', created_at: new Date(2024, 1, 31).toISOString()},
                { user_id: 5, artwork_id: 3, body: 'ナニコレスゴイ3ナニコレスゴイ3ナニコレスゴイ3ナニコレスゴイ3ナニコレスゴイ3ナニコレスゴイ3ナニコレスゴイ3ナニコレスゴイ3ナニコレスゴイ3ナニコレスゴイ3', created_at: new Date(2024, 4, 15).toISOString()},
                { user_id: 5, artwork_id: 4, body: 'ナニコレスゴイ4ナニコレスゴイ4ナニコレスゴイ4ナニコレスゴイ4ナニコレスゴイ4', created_at: new Date(2024, 3, 10).toISOString()},
                { user_id: 3, artwork_id: 1, body: 'Oh crap, this is unbelievable', created_at: new Date(2024, 1, 4).toISOString()},
                { user_id: 3, artwork_id: 2, body: 'Good!', created_at: new Date(2024, 1, 21).toISOString()},
                { user_id: 1, artwork_id: 6, body: 'Hmm, not good...', created_at: new Date(2024, 4, 8).toISOString()},
                { user_id: 5, artwork_id: 6, body: 'スゴスゴスゴスゴスゴスゴスゴスゴスゴスゴスゴスゴスゴ1111100000', created_at: new Date(2024, 4, 9).toISOString()},
                { user_id: 4, artwork_id: 6, body: 'This is good one! How long did you creat that?', created_at: new Date(2024, 4, 10).toISOString()},
                { user_id: 8, artwork_id: 3, body: '=)', created_at: new Date(2024, 4, 16).toISOString()},
                { user_id: 8, artwork_id: 3, body: '👍👍👍👍', created_at: new Date(2024, 4, 16).toISOString()},
                { user_id: 7, artwork_id: 3, body: 'どうしたらこんなクオリティまで仕上がるんだ…。', created_at: new Date(2024, 4, 17).toISOString()},
                { user_id: 7, artwork_id: 3, body: '信じられん…。', created_at: new Date(2024, 4, 17).toISOString()},
            ]
        }); console.log('commentの作成が完了しました。');
        await prisma.artworkRanks.createMany({
            data: [
                { artwork_id: 10, rank_id: 1, user_id: 5 },
                { artwork_id: 10, rank_id: 1, user_id: 4 },
                { artwork_id: 10, rank_id: 1, user_id: 7 },
                { artwork_id: 9, rank_id: 1, user_id: 5 },
                { artwork_id: 9, rank_id: 1, user_id: 7 },
                { artwork_id: 5, rank_id: 1, user_id: 5 },
                { artwork_id: 1, rank_id: 1, user_id: 5 },
                { artwork_id: 4, rank_id: 2, user_id: 5 },
                { artwork_id: 8, rank_id: 3, user_id: 5 },
                { artwork_id: 5, rank_id: 3, user_id: 5 },
                { artwork_id: 3, rank_id: 5, user_id: 5 },
                { artwork_id: 2, rank_id: 7, user_id: 5 },
                { artwork_id: 8, rank_id: 1, user_id: 7 },
                { artwork_id: 7, rank_id: 1, user_id: 7 },
                { artwork_id: 3, rank_id: 1, user_id: 7 },
                { artwork_id: 4, rank_id: 3, user_id: 7 },
            ]
        }); console.log('artworkRanksの作成が完了しました。');
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