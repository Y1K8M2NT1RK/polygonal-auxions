import { builder } from './builder';

import '../../pages/api/types/errors';
import '../../pages/api/types/queries/artworks';
import '../../pages/api/types/mutations/artworks';
import '../../pages/api/types/queries/users';
import '../../pages/api/types/mutations/users';
import '../../pages/api/types/mutations/emails';
import '../../pages/api/types/queries/comments';
import '../../pages/api/types/mutations/comments';

export const schema = builder.toSchema();
