import { faker } from '@faker-js/faker'
import { hashSync, genSaltSync } from 'bcrypt'
import { prisma } from '../../src/server/db'
// import { Prisma } from '@prisma/client'

export const createUsersData = (): any[] => {
    const usersData: any[] = [];
    for (let i = 0; i < 50; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const name = `${lastName} ${firstName}`.substring(0, 25); // VarChar(25)制限
        const nameKana = faker.helpers.arrayElement<string>([
            'たなかたろう', 'すずきはなこ', 'さとうけんじ', 'わたなべゆうこ', 'いとうみのる',
            'やまもとあきら', 'たかはしなおみ', 'ももたまゆみ', 'いしかわしんじ', 'おおたにえみ',
            'あべゆうすけ', 'かとうりえ', 'きむらとしお', 'こばやしちえ', 'やまだひろし',
            'ささきまり', 'いのうえかずお', 'むらかみあい', 'くどうたけし', 'ふじわらさき'
        ] as string[]);
        const handleName = faker.internet.username().toLowerCase().substring(0, 60); // VarChar(60)制限
        
        // 日本語の自己紹介文候補
        const introductions = [
            'アートを愛するクリエイターです。よろしくお願いします！',
            'デジタルアートを中心に制作活動をしています。',
            '美しいものを表現することに情熱を注いでいます。',
            '日々の暮らしからインスピレーションを得て作品作りをしています。',
            '色彩豊かな世界観を大切にしています。',
            '見る人の心に響く作品を目指しています。',
            '自然の美しさを作品に込めるのが好きです。',
            'アートを通じて多くの人とつながりたいと思っています。',
            '創作活動を通して自分自身を表現しています。',
            '伝統的な技法と現代的な感性の融合を探求しています。',
            'まだまだ勉強中ですが、がんばって作品を作っています！',
            'みなさまからのコメントがとても励みになります。',
            'アートの世界は無限の可能性があると信じています。',
            '毎日少しずつでも成長していきたいです。',
            '作品を通じて感動を届けられるよう努力しています。',
            '',
            '趣味でイラストを描いています。',
            '週末アーティストです。',
            'コメントお待ちしています！'
        ];
        
        usersData.push({
            name,
            name_kana: nameKana,
            handle_name: handleName,
            password: hashSync('0000', genSaltSync(10)), // ハッシュ化
            birthday: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString(),
            introduction: faker.helpers.arrayElement(introductions).substring(0, 500), // VarChar(500)制限
            phone_number: faker.string.numeric(11), // VarChar(15)制限で11桁の数字
            email: faker.internet.email().substring(0, 150), // VarChar(150)制限
            address: `${faker.location.city()}-${faker.location.streetAddress()}`.substring(0, 150), // VarChar(150)制限
            role: 'USER' as const,
        });
    }
    return usersData;
};

export const seedUsers = async () => {
    const usersData = createUsersData();
    // 固定テストユーザ (README 記載)
    usersData[0] = {
        name: 'テストユーザー',
        name_kana: 'たなかたろう',
        handle_name: 'testuser',
        password: hashSync('0000', genSaltSync(10)),
        birthday: new Date('1990-01-01').toISOString(),
        introduction: 'テスト用のユーザーアカウントです。',
        phone_number: '09012345678',
        email: 'aaa@example.jp',
        address: 'テスト住所',
        role: 'USER' as const,
    };
    
    // 固定管理者ユーザ
    usersData[1] = {
        name: '管理者',
        name_kana: 'かんりしゃ',
        handle_name: 'admin',
        password: hashSync('admin123', genSaltSync(10)), // 管理者用パスワード
        birthday: new Date('1985-01-01').toISOString(),
        introduction: 'システム管理者アカウントです。',
        phone_number: '09087654321',
        email: 'admin@example.com',
        address: '管理者住所',
        role: 'ADMIN' as const,
    };
    
    await prisma.user.createMany({ data: usersData });
    console.log('userの作成が完了しました。 (含: aaa@example.jp / 0000, admin@example.com / admin123)');
};
