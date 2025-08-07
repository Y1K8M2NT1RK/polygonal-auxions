import { faker } from '@faker-js/faker'
import { prisma } from '../../src/pages/api/db'

export const createArtworksData = () => {
    const artworksData = [];
    for (let i = 0; i < 45; i++) {
        // 日本語の作品タイトル候補
        const titleOptions = [
            `${faker.color.human()}の${faker.word.noun()}`,
            `${faker.animal.type()}と${faker.science.unit().name}`,
            `${faker.date.month()}の${faker.word.adjective()}`,
            `静かな${faker.location.city()}`,
            `青い${faker.word.noun()}の物語`,
            `夜明けの${faker.color.human()}`,
            `風の中の${faker.animal.type()}`,
            `光る${faker.word.noun()}`,
            `遠い${faker.location.city()}の記憶`,
            `小さな${faker.word.adjective()}な世界`,
            `美しい${faker.color.human()}の調べ`,
            `踊る${faker.word.noun()}たち`,
            `静寂の${faker.animal.type()}`,
            `輝く${faker.date.month()}`,
            `永遠の${faker.word.adjective()}`,
            `謎めいた${faker.color.human()}`,
            `空飛ぶ${faker.animal.type()}`,
            `魔法の${faker.word.noun()}`,
            `古い${faker.location.city()}の伝説`,
            `新しい${faker.word.adjective()}な始まり`
        ];
        const title = faker.helpers.arrayElement(titleOptions).substring(0, 500); // VarChar(500)制限
        
        // 日本語の作品特徴
        const featureOptions = [
            `この作品は${faker.color.human()}を基調とした美しい色合いが特徴的です。`,
            `${faker.animal.type()}をモチーフにした独創的なデザインが印象的な作品です。`,
            `繊細な筆致で描かれた${faker.word.adjective()}な表現が心に響きます。`,
            `現代的な技法と伝統的な要素を融合させた革新的な作品です。`,
            `光と影の対比が美しく、見る者の心を静かに癒してくれる作品です。`,
            `自然の美しさを独自の視点で表現した感動的な作品です。`,
            `抽象的でありながら、深い意味を持つ哲学的な作品です。`,
            `温かみのある色調で描かれた、どこか懐かしさを感じる作品です。`,
            `現実と幻想の境界を探求した実験的で挑戦的な作品です。`,
            `日本の四季の美しさを現代的に解釈した季節感溢れる作品です。`
        ];
        const feature = faker.helpers.arrayElement(featureOptions).substring(0, 1000); // VarChar(1000)制限
        
        artworksData.push({
            title,
            likes: faker.number.int({ min: 0, max: 500 }),
            bads: faker.number.int({ min: 0, max: 100 }),
            feature, // 日本語の特徴説明
            user_id: faker.number.int({ min: 1, max: 50 }),
            created_at: faker.date.between({ 
                from: new Date(2023, 0, 1), 
                to: new Date(2024, 11, 31) 
            }).toISOString()
        });
    }
    
    return artworksData;
};

export const seedArtworks = async () => {
    const artworksData = createArtworksData();
    await prisma.artwork.createMany({ data: artworksData });
    console.log('artworkの作成が完了しました。');
};
