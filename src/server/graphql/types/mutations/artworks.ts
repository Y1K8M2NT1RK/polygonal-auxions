import { randomUUID } from 'crypto';
import { builder } from '../../builder';
import { prisma } from '../../../db';
import { ZodError } from 'zod';
import { Artwork, ArtworkRanks } from '../consts';
import { del } from '@vercel/blob';

builder.mutationField("upsertArtwork", (t) => 
  t.prismaField({
    type: Artwork,
    errors: { types: [ZodError] },
    authScopes: { isAuthenticated: true },
    args: {
      artwork_slug_id: t.arg.string({ required: false }),
      title: t.arg.string({
        required: true,
        validate: { type: 'string', maxLength: [100, { message: '文字数が多すぎます。' }], minLength: [1, { message: '入力してください。' }] },
      }),
      feature: t.arg.string({
        required: true,
        validate: { type: 'string', maxLength: [500, { message: '文字数が多すぎます。' }], minLength: [1, { message: '入力してください。' }] },
      }),
      current_image_url: t.arg.string({ required: false }),
      image_url: t.arg.string({ required: false }),
      content_type: t.arg.string({ required: false }),
      is_image_deleted: t.arg.boolean({ required: false, defaultValue: false }),
    },
    resolve: async (_query, _parent, args, ctx) => {
      let targetArtworkFile = null;
      if ((args.artwork_slug_id && args.current_image_url) || args.is_image_deleted) {
        if (args.current_image_url) {
          await del(args.current_image_url as string, { token: process.env.BLOB_READ_WRITE_TOKEN });
        }
        targetArtworkFile = await prisma.artworkFile.findFirst({ where: { file_path: args.current_image_url as string } });
        if (args.is_image_deleted && targetArtworkFile) {
          await prisma.artworkFile.delete({ where: { id: targetArtworkFile.id } });
        }
      }
      return prisma.artwork.upsert({
        where: { slug_id: args.artwork_slug_id ?? '' },
        update: {
          title: args.title,
          feature: args.feature,
            updated_at: new Date().toISOString(),
          ...(args.image_url && args.content_type ? {
            artwork_file: {
              upsert: {
                where: { id: targetArtworkFile?.id ?? 0 },
                update: {
                  file_path: args.image_url,
                  file_name: args.image_url.split('/').pop(),
                  extension: args.content_type.split('/')[1],
                },
                create: {
                  file_path: args.image_url,
                  file_name: args.image_url.split('/').pop(),
                  extension: args.content_type.split('/')[1],
                },
              },
            },
          } : {}),
        },
        create: {
          title: args.title,
          feature: args.feature,
          slug_id: randomUUID(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          likes: 0,
          bads: 0,
          user_id: ctx.auth?.id as number,
          ...(args.image_url && args.content_type ? {
            artwork_file: {
              create: {
                file_path: args.image_url,
                file_name: args.image_url.split('/').pop(),
                extension: args.content_type.split('/')[1],
              },
            },
          } : {}),
        },
      });
    },
  })
);

builder.mutationField("removeArtwork", (t) =>
  t.prismaField({
    type: Artwork,
    authScopes: { isAuthenticated: true },
    args: { artwork_id: t.arg.string({ required: true }) },
    resolve: async (_query, _parent, args) => {
      const targetArtwork = await prisma.artwork.findFirst({
        where: { id: parseInt(args.artwork_id) },
        include: { artwork_file: true },
      });
      if (!targetArtwork) throw new Error('artwork error');
      if (targetArtwork.artwork_file?.[0]) await del(targetArtwork.artwork_file[0].file_path, { token: process.env.BLOB_READ_WRITE_TOKEN });
      await prisma.artworkFile.deleteMany({ where: { artwork_id: parseInt(args.artwork_id) } });
      return prisma.artwork.update({ where: { id: parseInt(args.artwork_id) }, data: { deleted: true } });
    },
  })
);

builder.mutationField("addArtworkRank", (t) =>
  t.prismaField({
    type: ArtworkRanks,
    authScopes: { isAuthenticated: true },
    args: { artwork_id: t.arg.string({ required: true }), rank_id: t.arg.string({ required: true }) },
    resolve: (query, _parent, args, ctx) => prisma.artworkRanks.create({
      ...query,
      data: { artwork_id: parseInt(args.artwork_id), rank_id: parseInt(args.rank_id), user_id: ctx.auth?.id as number },
    }),
  })
);

builder.mutationField("removeArtworkRank", (t) =>
  t.prismaField({
    type: ArtworkRanks,
    authScopes: { isAuthenticated: true },
    args: { artwork_id: t.arg.string({ required: true }), rank_id: t.arg.string({ required: true }) },
    resolve: async (_query, _parent, args, ctx) => {
      const targetArtworkRank = await prisma.artworkRanks.findFirst({
        where: { artwork_id: parseInt(args.artwork_id), rank_id: parseInt(args.rank_id), user_id: ctx.auth?.id },
      });
      if (!targetArtworkRank) throw new Error('artwork-rank error');
      return prisma.artworkRanks.delete({ where: { id: targetArtworkRank.id } });
    },
  })
);
