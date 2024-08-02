import { randomUUID } from 'crypto';
import { builder } from '../../builder';
import { prisma } from '../../db';
import { ZodError } from 'zod';
import { Artwork } from '../queries/artworks';

builder.mutationField("addArtwork", (t) => 
    t.prismaField({
        type: Artwork,
        errors: { types: [ZodError], },
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
                            where: { slug_id: ctx.auth.user.slug_id },
                            include: {}
                        })
                    },
                    artwork_file: {},
                    comments: {},
                },
            }),
    })
);