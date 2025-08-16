import { builder } from '../../builder';
import { prisma } from '../../db';
import { ZodError } from 'zod';
import { compareSync, hashSync } from 'bcrypt';
import { AuthPayload, Follows, User } from '../consts';
import { CsrfError } from '../errors';
import { cookieModule } from '../cookie';
import { ImageInput } from '../consts';
import { del } from '@vercel/blob';

type ImageInputValue = {
    is_image_deleted?: boolean;
    current_image_url?: string;
    image_url?: string;
    content_type?: string;
} | null;

builder.mutationField("login", (t) => 
    t.prismaField({
        type: AuthPayload,
    errors: { types: [ZodError, CsrfError], },
        args: {
            email: t.arg.string({
                required: true,
                validate: {
                    type: 'string',
                    maxLength: [100, {message: '文字数が多すぎます。'}],
                    minLength: [1, {message: '入力してください。'}],
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
                if (!user?.password) return false;
                return compareSync(args.password, user.password);
            },
            {message: 'パスワードが違います。', path: ['password']},
        ],
        resolve: async (_query, _parent, args, ctx) => {
            // CSRF 失敗を GraphQL レイヤに昇格 (フォーム側で 403 -> フィールドエラー表示可能)
            if ((ctx.req as any).__csrfInvalid) {
                throw new CsrfError();
            }
            const user = await prisma.user.findUnique({where: {email: args.email},});
            if (!user) throw new Error();
            return cookieModule.setCookie(user.id, ctx);
        },
    })
);


builder.mutationField("updateMyProfile", (t) =>
    t.prismaField({
        type: User,
        errors: { types: [ZodError], },
        authScopes: { isAuthenticated: true, },
        args: {
            name: t.arg.string({
                required: false,
                validate: {type: 'string', maxLength: [25, {message: '文字数が多すぎます。'}],},
            }),
            name_kana: t.arg.string({
                required: false,
                validate: {type: 'string', maxLength: [50, {message: '文字数が多すぎます。'}],},
            }),
            birthday: t.arg.string({
                required: false,
                validate: {
                    type: 'string',
                    refine: [
                        (val: string) => {
                            const date = new Date(val);
                            return !isNaN(date.getTime());
                        },
                        {message: '日付の形式が正しくありません。'}
                    ],
                },
            }),
            introduction: t.arg.string({
                required: false,
                validate: {type: 'string', maxLength: [500, {message: '文字数が多すぎます。'}],},
            }),
            phone_number: t.arg.string({
                required: false,
                validate: {
                    type: 'string',
                    maxLength: [15, {message: '文字数が多すぎます。'}],
                    refine: [
                        (val: string) => ((/^\d+$/).test(val)),
                        {message: '電話番号は数字のみで入力してください。'}
                    ],
                },
            }),
            address: t.arg.string({
                required: false,
                validate: {type: 'string', maxLength: [150, {message: '文字数が多すぎます。'}],},
            }),
            bg: t.arg({ type: ImageInput, required: false, }),
            icon: t.arg({ type: ImageInput, required: false, })
        },
        resolve: async (_query, _parent, args, ctx) => {
            let targetExistedFile = null;
            let updateData: { createMany: { data: any[] } } = { createMany: { data: [] } };
            let userFiles: ImageInputValue = null;
            for(const val of [{key: 1, files: args.bg,}, {key: 2, files: args.icon,}]) {
                userFiles = (val.files as any) as ImageInputValue;
                if (!userFiles) continue;
                if( userFiles?.current_image_url && userFiles?.image_url && userFiles?.content_type ){
                    await del(userFiles.current_image_url, {token: process.env.BLOB_READ_WRITE_TOKEN});
                }
                targetExistedFile = await prisma.userFiles.findFirst({
                    where: { file_path: (userFiles?.current_image_url || '') },
                });
                if ((
                        (!!userFiles?.image_url && !!userFiles?.content_type)
                    ||  userFiles?.is_image_deleted==true
                ) && !!targetExistedFile ) {
                    await prisma.userFiles.delete({where: {id: targetExistedFile?.id}});
                }
                if(!!userFiles?.image_url && !!userFiles?.content_type && userFiles?.is_image_deleted != true) {
                    const imageUrl = userFiles.image_url || '';
                    const contentType = userFiles.content_type || '';
                    updateData.createMany.data.push({
                        purpose_id: val.key,
                        file_path: imageUrl,
                        file_name: imageUrl.split('/').pop() || '',
                        extension: contentType.split('/')[1] || '',
                    });
                }
            }
            return prisma.user.update({
                where: { id: ctx.auth?.id as number },
                data: {
                    name: args?.name ?? '',
                    name_kana: args?.name_kana ?? '',
                    birthday: args?.birthday ? new Date(args?.birthday) : '',
                    introduction: args?.introduction ?? '',
                    phone_number: args?.phone_number ?? '',
                    address: args?.address ?? '',
                    user_files: updateData,
                },
            })
        },
    })
)

builder.mutationField("updatePassword", (t) => 
    t.prismaField({
        type: User,
        errors: { types: [ZodError], },
        authScopes: { isAuthenticated: true, },
        args: {
            password: t.arg.string({
                required: true,
                validate: {
                    type: 'string',
                    maxLength: [100, {message: '文字数が多すぎます。'}],
                    minLength: [1, {message: '入力してください。'}],
                    refine: [
                        (val: string) => val.trim().length > 0,
                        { message: '入力してください。' },
                    ],
                },
            }),
            passwordConfirmation: t.arg.string({
                required: true,
                validate: {
                    type: 'string',
                    maxLength: [100, {message: '文字数が多すぎます。'}],
                    minLength: [1, {message: '入力してください。'}],
                    refine: [
                        (val: string) => val.trim().length > 0,
                        { message: '入力してください。' },
                    ],
                },
            }),
        },
        validate: [
            (args) => args.password === args.passwordConfirmation,
            {message: 'パスワードが一致しません。', path: ['passwordConfirmation']},
        ],
        resolve: async (_query, _parent, args, ctx) => {
            const userId = ctx.auth?.id as number;
            const hashedPassword = hashSync(args.password, 10);
            // パスワード更新
            const updated = await prisma.user.update({
                where: { id: userId },
                data: { password: hashedPassword },
            });
            // 全セッション無効化
            await prisma.authPayload.deleteMany({ where: { user_id: userId } });
            // 現在クライアント向けに再発行
            await cookieModule.setCookie(userId, ctx);
            return updated;
        },
    })
);

builder.mutationField("logout", (t) => 
    t.boolean({
        authScopes: { isAuthenticated: true, },
        resolve: async (_query, _parent, ctx) => {
            try { 
                return cookieModule.deleteCookie(ctx);
            } catch (error) {
                console.error('Logout error:', error);
                return false;
            }
        },
    })
)

builder.mutationField("logoutAll", (t) => 
    t.boolean({
        authScopes: { isAuthenticated: true, },
        resolve: async (_query, _parent, ctx) => {
            try {
                // Delete all auth payloads for this user
                await prisma.authPayload.deleteMany({
                    where: { user_id: ctx?.auth?.id as number }
                });
                
                // Clear current session cookies
                return cookieModule.deleteCookie(ctx);
            } catch (error) {
                console.error('LogoutAll error:', error);
                return false;
            }
        },
    })
)

// フォロー・フォロー解除
builder.mutationField('followOrUnfollow', (t) => 
    t.prismaField({
        type: Follows,
        authScopes: { isAuthenticated: true, },
        args: { following_id: t.arg.string({required: true,}), mode: t.arg.string({required: true,}) },
        resolve: async (query, _parent, args, ctx, _info) => {
            if(args.mode == 'follow'){ return prisma.follow.create({
                ...query,
                data: {
                    following: { connect: { id: parseInt(args.following_id) } },
                    followedBy: { connect: { id: ctx?.auth?.id } }
                },
            })}else if(args.mode == 'unfollow'){ return prisma.follow.delete({
                where: {
                    following_id_followed_by_id: {
                        following_id: parseInt(args.following_id),
                        followed_by_id: ctx?.auth?.id as number,
                    }
                },
            })}else{
                throw new Error('follow error');
            }
        }
    })
);

// Admin User Management Mutations
builder.mutationField("adminCreateUser", (t) =>
    t.prismaField({
        type: User,
        errors: { types: [ZodError] },
        authScopes: { isAdmin: true },
        args: {
            handle_name: t.arg.string({
                required: true,
                validate: {
                    type: 'string',
                    maxLength: [60, { message: 'ハンドルネームは60文字以内で入力してください。' }],
                    minLength: [1, { message: 'ハンドルネームを入力してください。' }],
                    refine: [
                        (val: string) => /^[a-zA-Z0-9_-]+$/.test(val),
                        { message: 'ハンドルネームは英数字、アンダースコア、ハイフンのみ使用できます。' }
                    ],
                },
            }),
            name: t.arg.string({
                required: true,
                validate: {
                    type: 'string',
                    maxLength: [25, { message: '名前は25文字以内で入力してください。' }],
                    minLength: [1, { message: '名前を入力してください。' }],
                },
            }),
            name_kana: t.arg.string({
                required: false,
                validate: {
                    type: 'string',
                    maxLength: [50, { message: 'ふりがなは50文字以内で入力してください。' }],
                },
            }),
            email: t.arg.string({
                required: true,
                validate: {
                    type: 'string',
                    maxLength: [150, { message: 'メールアドレスは150文字以内で入力してください。' }],
                    email: [true, { message: '正しいメールアドレスを入力してください。' }],
                },
            }),
            password: t.arg.string({
                required: true,
                validate: {
                    type: 'string',
                    minLength: [4, { message: 'パスワードは4文字以上で入力してください。' }],
                    maxLength: [100, { message: 'パスワードは100文字以内で入力してください。' }],
                },
            }),
            phone_number: t.arg.string({
                required: false,
                validate: {
                    type: 'string',
                    maxLength: [15, { message: '電話番号は15文字以内で入力してください。' }],
                    refine: [
                        (val: string) => val === '' || /^\d+$/.test(val),
                        { message: '電話番号は数字のみで入力してください。' }
                    ],
                },
            }),
            address: t.arg.string({
                required: false,
                validate: {
                    type: 'string',
                    maxLength: [150, { message: '住所は150文字以内で入力してください。' }],
                },
            }),
            introduction: t.arg.string({
                required: false,
                validate: {
                    type: 'string',
                    maxLength: [500, { message: '自己紹介は500文字以内で入力してください。' }],
                },
            }),
            birthday: t.arg.string({
                required: false,
                validate: {
                    type: 'string',
                    refine: [
                        (val: string) => {
                            if (!val) return true;
                            const date = new Date(val);
                            return !isNaN(date.getTime());
                        },
                        { message: '正しい日付を入力してください。' }
                    ],
                },
            }),
        },
        validate: [
            async (args) => {
                // Check for unique handle_name
                const existingHandleName = await prisma.user.findUnique({
                    where: { handle_name: args.handle_name },
                });
                if (existingHandleName) {
                    return false;
                }
                // Check for unique email
                const existingEmail = await prisma.user.findUnique({
                    where: { email: args.email },
                });
                if (existingEmail) {
                    return false;
                }
                return true;
            },
            { message: 'このハンドルネームまたはメールアドレスは既に使用されています。' }
        ],
        resolve: async (query, _parent, args, _ctx) => {
            const hashedPassword = hashSync(args.password, 10);
            
            return prisma.user.create({
                ...query,
                data: {
                    handle_name: args.handle_name,
                    name: args.name,
                    name_kana: args.name_kana || '',
                    email: args.email,
                    password: hashedPassword,
                    phone_number: args.phone_number || '',
                    address: args.address || '',
                    introduction: args.introduction || '',
                    birthday: args.birthday ? new Date(args.birthday) : new Date(),
                    role: 'USER',
                },
            });
        },
    })
);

builder.mutationField("adminUpdateUser", (t) =>
    t.prismaField({
        type: User,
        errors: { types: [ZodError] },
        authScopes: { isAdmin: true },
        args: {
            id: t.arg.string({ required: true }),
            handle_name: t.arg.string({
                required: false,
                validate: {
                    type: 'string',
                    maxLength: [60, { message: 'ハンドルネームは60文字以内で入力してください。' }],
                    refine: [
                        (val: string) => !val || /^[a-zA-Z0-9_-]+$/.test(val),
                        { message: 'ハンドルネームは英数字、アンダースコア、ハイフンのみ使用できます。' }
                    ],
                },
            }),
            name: t.arg.string({
                required: false,
                validate: {
                    type: 'string',
                    maxLength: [25, { message: '名前は25文字以内で入力してください。' }],
                },
            }),
            name_kana: t.arg.string({
                required: false,
                validate: {
                    type: 'string',
                    maxLength: [50, { message: 'ふりがなは50文字以内で入力してください。' }],
                },
            }),
            email: t.arg.string({
                required: false,
                validate: {
                    type: 'string',
                    maxLength: [150, { message: 'メールアドレスは150文字以内で入力してください。' }],
                    email: [true, { message: '正しいメールアドレスを入力してください。' }],
                },
            }),
            phone_number: t.arg.string({
                required: false,
                validate: {
                    type: 'string',
                    maxLength: [15, { message: '電話番号は15文字以内で入力してください。' }],
                    refine: [
                        (val: string) => !val || /^\d+$/.test(val),
                        { message: '電話番号は数字のみで入力してください。' }
                    ],
                },
            }),
            address: t.arg.string({
                required: false,
                validate: {
                    type: 'string',
                    maxLength: [150, { message: '住所は150文字以内で入力してください。' }],
                },
            }),
            introduction: t.arg.string({
                required: false,
                validate: {
                    type: 'string',
                    maxLength: [500, { message: '自己紹介は500文字以内で入力してください。' }],
                },
            }),
            birthday: t.arg.string({
                required: false,
                validate: {
                    type: 'string',
                    refine: [
                        (val: string) => {
                            if (!val) return true;
                            const date = new Date(val);
                            return !isNaN(date.getTime());
                        },
                        { message: '正しい日付を入力してください。' }
                    ],
                },
            }),
        },
        validate: [
            async (args) => {
                const userId = parseInt(args.id);
                
                // Check if user exists and has USER role
                const existingUser = await prisma.user.findUnique({
                    where: { id: userId },
                    select: { role: true },
                });
                if (!existingUser || existingUser.role !== 'USER') {
                    return false;
                }

                // Check for unique handle_name if being updated
                if (args.handle_name) {
                    const existingHandleName = await prisma.user.findUnique({
                        where: { 
                            handle_name: args.handle_name,
                            NOT: { id: userId }
                        },
                    });
                    if (existingHandleName) {
                        return false;
                    }
                }

                // Check for unique email if being updated
                if (args.email) {
                    const existingEmail = await prisma.user.findUnique({
                        where: { 
                            email: args.email,
                            NOT: { id: userId }
                        },
                    });
                    if (existingEmail) {
                        return false;
                    }
                }

                return true;
            },
            { message: 'ユーザーが見つからないか、ハンドルネーム/メールアドレスが既に使用されています。' }
        ],
        resolve: async (query, _parent, args, _ctx) => {
            const userId = parseInt(args.id);
            
            // Prepare update data - only include fields that were provided
            const updateData: any = {};
            if (args.handle_name !== undefined) updateData.handle_name = args.handle_name;
            if (args.name !== undefined) updateData.name = args.name;
            if (args.name_kana !== undefined) updateData.name_kana = args.name_kana;
            if (args.email !== undefined) updateData.email = args.email;
            if (args.phone_number !== undefined) updateData.phone_number = args.phone_number;
            if (args.address !== undefined) updateData.address = args.address;
            if (args.introduction !== undefined) updateData.introduction = args.introduction;
            if (args.birthday !== undefined) {
                const b = args.birthday;
                updateData.birthday = b ? new Date(b) : null;
            }

            return prisma.user.update({
                ...query,
                where: { id: userId },
                data: updateData,
            });
        },
    })
);

builder.mutationField("adminDeleteUser", (t) =>
    t.boolean({
        errors: { types: [ZodError] },
        authScopes: { isAdmin: true },
        args: {
            id: t.arg.string({ required: true }),
        },
        validate: [
            async (args) => {
                const userId = parseInt(args.id);
                
                // Check if user exists and has USER role
                const existingUser = await prisma.user.findUnique({
                    where: { id: userId },
                    select: { role: true },
                });
                if (!existingUser || existingUser.role !== 'USER') {
                    return false;
                }
                return true;
            },
            { message: 'ユーザーが見つからないか、削除できません。' }
        ],
        resolve: async (_parent, args, _ctx) => {
            const userId = parseInt(args.id);
            
            try {
                // Delete user (this will cascade to related data based on schema)
                await prisma.user.delete({
                    where: { id: userId },
                });
                return true;
            } catch (error) {
                console.error('Error deleting user:', error);
                return false;
            }
        },
    })
);