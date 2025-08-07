import { faker } from '@faker-js/faker'
import { prisma } from '../../src/pages/api/db'

export const createArtworkRanksData = () => {
    const artworkRanksData = [];
    const usedRankCombinations = new Set();
    
    for (let i = 0; i < 45; i++) {
        let artwork_id, rank_id, user_id;
        let combination;
        
        do {
            artwork_id = faker.number.int({ min: 1, max: 45 });
            rank_id = faker.number.int({ min: 1, max: 8 });
            user_id = faker.number.int({ min: 1, max: 50 });
            combination = `${artwork_id}-${rank_id}-${user_id}`;
        } while (usedRankCombinations.has(combination));
        
        usedRankCombinations.add(combination);
        artworkRanksData.push({ artwork_id, rank_id, user_id });
    }
    
    return artworkRanksData;
};

export const seedArtworkRanks = async () => {
    const artworkRanksData = createArtworkRanksData();
    await prisma.artworkRanks.createMany({ data: artworkRanksData });
    console.log('artworkRanksの作成が完了しました。');
};
