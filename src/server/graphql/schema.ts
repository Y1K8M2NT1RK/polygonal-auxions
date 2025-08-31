import { builder } from './builder';

import './types/errors';
import './types/consts';
import './types/cookie';
// Queries
import './types/queries/artworks';
import './types/queries/users';
import './types/queries/comments';
// Mutations
import './types/mutations/artworks';
import './types/mutations/users';
import './types/mutations/comments';
import './types/mutations/emails';

export const schema = builder.toSchema();
