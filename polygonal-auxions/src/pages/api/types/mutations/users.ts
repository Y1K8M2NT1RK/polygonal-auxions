import { builder } from '../../builder';
import { prisma } from '../../db';
import { ZodError } from 'zod';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Follows } from '../queries/users';

builder.mutationField("validateUser", (t) => 
    t.boolean({
        errors: { types: [ZodError], },
        args: {
            email: t.arg.string({
                required: true,
                validate: {
                    type: 'string',
                    maxLength: [100, {message: '文字数が多すぎます。'}],
                    minLength: [1, {message: '入力してください。'}],
                    refine: [
                        async (val) => {
                            if( val == "" ) return true;
                            return !!(await prisma.user.findUnique({where: {email: val},}));
                        },
                        {message: '入力した情報からユーザが確認できません。'}
                    ],
                },
            }),
            password: t.arg.string({
                required: true,
                validate: {
                    type: 'string',
                    maxLength: [100, {message: '文字数が多すぎます。'}],
                    minLength: [1, {message: '入力してください。'}],
                },
            }),
        },
        validate: [
            async (args) => {
                const user = await prisma.user.findUnique({where: {email: args?.email},});
                const saltRounds = 10;
                const salt = genSaltSync(saltRounds);
                const hashedPassword = hashSync(user?.password || '', salt);
                return compareSync(args.password, hashedPassword);
            },
            {message: 'パスワードが違います。', path: ['password']},
        ],
        resolve: () => true,
    })
);

// フォロー・フォロー解除
builder.mutationField('followOrUnfollow', (t) => 
    t.prismaField({
        type: Follows,
        args: { following_id: t.arg.string({required: true,}), mode: t.arg.string({required: true,}) },
        resolve: async (query, _parent, args, ctx, _info) => {
            if(args.mode == 'follow'){ return prisma.follow.create({
                ...query,
                data: {
                    following: { connect: { id: parseInt(args.following_id) } },
                    followedBy: { connect: { id: ctx.auth.user.id } }
                },
            })}else if(args.mode == 'unfollow'){ return prisma.follow.delete({
                where: {
                    following_id_followed_by_id: {
                        following_id: parseInt(args.following_id),
                        followed_by_id: ctx.auth.user.id,
                    }
                },
            })}else{
                throw new Error('follow error');
            }
        }
    })
);