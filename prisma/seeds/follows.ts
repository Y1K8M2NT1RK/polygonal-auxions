import { faker } from '@faker-js/faker'
import { prisma } from '../../src/server/db'

export const createFollowsData = () => {
    const followsData = [];
    const usedCombinations = new Set();
    
    for (let i = 0; i < 40; i++) {
        let following_id, followed_by_id;
        let combination;
        
        do {
            following_id = faker.number.int({ min: 1, max: 50 });
            followed_by_id = faker.number.int({ min: 1, max: 50 });
            combination = `${following_id}-${followed_by_id}`;
        } while (following_id === followed_by_id || usedCombinations.has(combination));
        
        usedCombinations.add(combination);
        followsData.push({ following_id, followed_by_id });
    }
    
    return followsData;
};

export const seedFollows = async () => {
    const followsData = createFollowsData();
    await prisma.follow.createMany({ data: followsData });
    console.log('followsの作成が完了しました。');
};
