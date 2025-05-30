import { builder } from './builder';

import './types/errors';
import './types/queries/artworks';
import './types/mutations/artworks';
import './types/queries/users';
import './types/mutations/users';
import './types/queries/comments';
import './types/mutations/comments';

export const schema = builder.toSchema();