import { builder } from './builder';

import './types/errors';
import './types/consts';
import './types/cookie';
// Queries
import './types/queries/artworks';
import './types/queries/users';
import './types/queries/comments';
// Temporarily commented out due to Prisma generation issues
// import './types/queries/notifications';
// Mutations
import './types/mutations/artworks';
import './types/mutations/users';
import './types/mutations/comments';
import './types/mutations/emails';
// Temporarily commented out due to Prisma generation issues
// import './types/mutations/notifications';

export const schema = builder.toSchema();
