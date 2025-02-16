import { randomUUID } from 'crypto';
import { builder } from '../../builder';
import { prisma } from '../../db';
import { ZodError } from 'zod';
import { Artwork, ArtworkRanks } from '../../types/consts';

builder.mutationField("addArtwork", (t) => 
    t.prismaField({
        type: Artwork,
        errors: { types: [ZodError], },
        authScopes: { isAuthenticated: true, },
        args: {
            title: t.arg.string({
                required: true,
                validate: {
                    type: 'string',
                    maxLength: [100, {message: '文字数が多すぎます。'}],
                    minLength: [1, {message: '入力してください。'}],
                },
            }),
            feature: t.arg.string({
                required: true,
                validate: {
                    type: 'string',
                    maxLength: [500, {message: '文字数が多すぎます。'}],
                    minLength: [1, {message: '入力してください。'}],
                },
            }),
        },
        resolve: async (query, _parent, args, ctx, _info) => 
            prisma.artwork.create({
                ...query,
                data: {
                    ...args,
                    slug_id: randomUUID(),
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    likes: 0,
                    bads: 0,
                    user: {
                        connect: await prisma.user.findUniqueOrThrow({
                            where: { slug_id: ctx.auth?.slug_id },
                            include: {}
                        })
                    },
                    artwork_file: {},
                    comments: {},
                },
            }),
    })
);

builder.mutationField("addArtworkRank", (t) => 
    t.prismaField({
        type: ArtworkRanks,
        authScopes: { isAuthenticated: true, },
        args: {
            artwork_id: t.arg.string({required: true}),
            rank_id: t.arg.string({required: true})
        },
        resolve: async (query, _parent, args, ctx, _info) =>
            prisma.artworkRanks.create({ ...query, data: { 
                artwork_id: parseInt(args.artwork_id),
                rank_id: parseInt(args.rank_id),
                user_id: ctx.auth?.id as number,
            }})
    })
);

builder.mutationField("removeArtworkRank", (t) => 
    t.prismaField({
        type: ArtworkRanks,
        authScopes: { isAuthenticated: true, },
        args: {
            artwork_id: t.arg.string({required: true}),
            rank_id: t.arg.string({required: true})
        },
        resolve: async (_query, _parent, args, ctx, _info) => {
            const targetArtworkRank = await prisma.artworkRanks.findFirst({where: { 
                artwork_id: parseInt(args.artwork_id),
                rank_id: parseInt(args.rank_id),
                user_id: ctx.auth?.id,
            }});
            if( !targetArtworkRank ) throw new Error('artwork-rank error');
            return prisma.artworkRanks.delete({where: {id: targetArtworkRank.id}})
        }
    })
);