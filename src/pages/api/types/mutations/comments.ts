import { builder } from '../../../../server/graphql/builder';
import { prisma } from '../../../../server/db';
import { ZodError } from 'zod';
import { Comment } from '../consts';

builder.mutationField("upsertComment", (t) =>
    t.prismaField({
        type: Comment,
        errors: { types: [ZodError], },
        authScopes: { isAuthenticated: true },
        args: {
            comment_slug_id: t.arg.string({ required: false }),
            artwork_id: t.arg.string({ required: true }),
            body: t.arg.string({
                required: true,
                validate: {
                    type: 'string',
                    maxLength: [300, {message: '文字数が多すぎます。'}],
                    minLength: [1, {message: '入力してください。'}],
                },
            }),
        },
        resolve: async (_query, _parent, args, ctx, _info) => 
            prisma.comment.upsert({
                where: { slug_id: args.comment_slug_id??'' },
                update: {
                    body: args.body,
                    updated_at: new Date().toISOString(),
                },
                create: {
                    body: args.body,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    artwork_id:  parseInt(args.artwork_id),
                    user_id: ctx.auth?.id as number,
                },
            }),
    })
);

builder.mutationField("removeComment", (t) =>
    t.prismaField({
        type: Comment,
        authScopes: { isAuthenticated: true },
        args: { comment_slug_id: t.arg.string({required: true}), },
        resolve: async (_query, _parent, args, _ctx, _info) => {
            const targetComment = await prisma.comment.findFirst({where: {slug_id: args.comment_slug_id}});
            if (!targetComment) throw new Error('コメントが見つかりません。');
            return prisma.comment.delete({where: {slug_id: args.comment_slug_id}});
        },
    })
);