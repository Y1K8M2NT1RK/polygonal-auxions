import { builder } from "../../builder";
import { prisma } from '../../db';
import { Comment, userIncludeFile } from '../consts';

builder.queryField("getArtworkComments", (t) => t.prismaField({
    type: [Comment],
    args: { artwork_id: t.arg.string({ required: true }), },
    resolve: (query, _parent, args, _ctx, _info) => 
        prisma.comment.findMany({
            ...query,
            where: { artwork_id: parseInt(args.artwork_id) },
            orderBy: { created_at: 'desc' },
            include: { user: userIncludeFile }
        }),
}));