import { builder } from '../../builder';

builder.prismaObject('Comment', {
    fields: (t) => ({
        body: t.exposeString('body'),
        created_at: t.expose('created_at', {type: 'Date'}),
        user: t.relation('user'),
        artwork: t.relation('artwork'),
    }),
});