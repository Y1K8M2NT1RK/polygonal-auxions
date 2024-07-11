import { randomUUID } from 'crypto';
import { builder } from '../../builder';
import { prisma } from '../../db';
import { ZodError, ZodFormattedError } from 'zod';
// import { Artwork } from '@prisma/client';
import { Artwork } from '../queries/artworks';

const ErrorInterface = builder.interfaceRef<Error>('Error').implement({
    fields: (t) => ({
        message: t.exposeString('message'),
    }),
});

// Util for flattening zod errors into something easier to represent in your Schema.
function flattenErrors(
        error: ZodFormattedError<unknown>,
        path: string[],
    ): { path: string[]; message: string }[] {
    // eslint-disable-next-line no-underscore-dangle
    const errors = error._errors.map((message) => ({
        path,
        message,
    }));

    Object.keys(error).forEach((key) => {
        if (key !== '_errors') {
            errors.push(
                ...flattenErrors((error as Record<string, unknown>)[key] as ZodFormattedError<unknown>, [
                    ...path,
                    key,
                ]),
            );
        }
    });

    return errors;
}

const ZodFieldError = builder
    .objectRef<{
        message: string;
        path: string[];
    }>('ZodFieldError')
    .implement({
        fields: (t) => ({
            message: t.exposeString('message'),
            path: t.exposeStringList('path'),
        }),
    });

// The actual error type
builder.objectType(ZodError, {
    name: 'ZodError',
    interfaces: [ErrorInterface],
    fields: (t) => ({
        fieldErrors: t.field({
            type: [ZodFieldError],
            resolve: (err) => flattenErrors(err.format(), []),
        }),
    }),
});

// 作品追加のGraphQLミューテーション
builder.mutationField("addArtwork", (t) => 
    t.prismaField({
        type: Artwork, // 一つのデータを求める場合は[]で囲わない
        errors: {
            types: [ZodError],
        },
        args: {
            title: t.arg.string({
                required: true,
                validate: {
                    type: 'string',
                    maxLength: [100, {message: '文字数超過エラー'}],
                    minLength: [1, {message: '文字数不足エラー'}],
                },
            }),
            feature: t.arg.string({
                required: true,
                validate: {
                    type: 'string',
                    maxLength: [500, {message: '文字数超過エラー'}],
                    minLength: [1, {message: '文字数不足エラー'}],
                },
            }),
        },
        resolve: async (query, _parent, _args, _ctx, _info) => {
            return prisma.artwork.create({
                ...query,
                data: {
                    ..._args,
                    /** issue: pothosにセッションを使用できるようにする */
                    slug_id: randomUUID(),
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    likes: 0,
                    bads: 0,
                    user: {
                        connect: await prisma.user.findFirstOrThrow({
                            where: { id: _ctx.auth.user.id },
                            include: {}
                        })
                    },
                    artwork_file: {},
                    comments: {},
                },
            })},
    })
);