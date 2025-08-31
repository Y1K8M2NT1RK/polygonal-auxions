import { faker } from '@faker-js/faker'
import { prisma } from '../../src/server/db'

export const createCommentsData = () => {
    const commentsData = [];
    for (let i = 0; i < 45; i++) {
        // 日本語のコメント候補
        const commentTypes = [
            '素晴らしい作品ですね！',
            'これはすごいクオリティです！',
            '感動しました。ありがとうございます。',
            'とても美しい作品だと思います。',
            'この色使いが本当に素敵です。',
            '見ているだけで心が癒されます。',
            'お疲れ様でした！素晴らしい出来栄えです。',
            'この構図がとても印象的ですね。',
            '細部まで丁寧に描かれていて感心します。',
            '独創的なアイデアが光る作品ですね。',
            'とても温かい気持ちになりました。',
            'プロフェッショナルな仕上がりです。',
            'このテーマ設定が面白いですね。',
            '技術力の高さに驚かされます。',
            'アートの力を感じる作品です。',
            '色彩の調和が美しいですね。',
            'とても幻想的で夢のような作品です。',
            '見る角度によって印象が変わって面白いです。',
            'この作品から物語を感じます。',
            '作者の想いが伝わってくる作品ですね。',
            'いいね！👍',
            '最高です！✨',
            '美しい！🎨',
            'Amazing!',
            'Great work!',
            faker.helpers.arrayElement(['👍', '❤️', '🎨', '✨', '🔥']).repeat(faker.number.int({ min: 1, max: 3 }))
        ];
        
        const body = faker.helpers.arrayElement(commentTypes).substring(0, 500); // VarChar(500)制限
        
        commentsData.push({
            user_id: faker.number.int({ min: 1, max: 50 }),
            artwork_id: faker.number.int({ min: 1, max: 45 }),
            body,
            created_at: faker.date.between({ 
                from: new Date(2023, 6, 1), 
                to: new Date(2024, 11, 31) 
            }).toISOString()
        });
    }
    
    return commentsData;
};

export const seedComments = async () => {
    const commentsData = createCommentsData();
    await prisma.comment.createMany({ data: commentsData });
    console.log('commentの作成が完了しました。');
};
