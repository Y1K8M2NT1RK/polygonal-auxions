import { builder } from '../../builder';
import { prisma } from '../../../db';
import { ZodError } from 'zod';
import { compareSync, hashSync } from 'bcrypt';
import { AuthPayload, Follows, User, UserRanks, ImageInput } from '../consts';
import { CsrfError } from '../errors';
import { cookieModule } from '../cookie';
import { del } from '@vercel/blob';
import { getEmailService } from '../../../../lib/email';
import { createWelcomeEmail, createPasswordResetEmail } from '../../../../lib/email/templates/common';
import { getAppBaseUrl } from '../../../../lib/url/baseUrl';
import crypto from 'crypto';

type ImageInputValue = { is_image_deleted?: boolean; current_image_url?: string; image_url?: string; content_type?: string } | null;

builder.mutationField("login", (t) =>
  t.prismaField({
    type: AuthPayload,
    errors: { types: [ZodError, CsrfError] },
    args: {
      email: t.arg.string({ required: true, validate: { type: 'string', maxLength: [100, { message: '文字数が多すぎます。' }], minLength: [1, { message: '入力してください。' }] } }),
      password: t.arg.string({ required: true, validate: { type: 'string', maxLength: [100, { message: '文字数が多すぎます。' }], minLength: [1, { message: '入力してください。' }] } }),
    },
    validate: [
      async (args) => { const user = await prisma.user.findUnique({ where: { email: args?.email } }); if (!user?.password) return false; return compareSync(args.password, user.password); },
      { message: 'パスワードが違います。', path: ['password'] },
    ],
    resolve: async (_query, _parent, args, ctx) => {
      if ((ctx.req as any).__csrfInvalid) throw new CsrfError();
      const user = await prisma.user.findUnique({ where: { email: args.email } });
      if (!user) throw new Error();
      return cookieModule.setCookie(user.id, ctx);
    },
  })
);

builder.mutationField("updateMyProfile", (t) =>
  t.prismaField({
    type: User,
    errors: { types: [ZodError] },
    authScopes: { isAuthenticated: true },
    args: {
      name: t.arg.string({ required: false, validate: { type: 'string', maxLength: [25, { message: '文字数が多すぎます。' }] } }),
      name_kana: t.arg.string({ required: false, validate: { type: 'string', maxLength: [50, { message: '文字数が多すぎます。' }] } }),
      birthday: t.arg.string({ required: false, validate: { type: 'string', refine: [(val: string) => { const date = new Date(val); return !isNaN(date.getTime()); }, { message: '日付の形式が正しくありません。' }] } }),
      introduction: t.arg.string({ required: false, validate: { type: 'string', maxLength: [500, { message: '文字数が多すぎます。' }] } }),
      phone_number: t.arg.string({ required: false, validate: { type: 'string', maxLength: [15, { message: '文字数が多すぎます。' }], refine: [(val: string) => (/^\d+$/).test(val), { message: '電話番号は数字のみで入力してください。' }] } }),
      address: t.arg.string({ required: false, validate: { type: 'string', maxLength: [150, { message: '文字数が多すぎます。' }] } }),
      bg: t.arg({ type: ImageInput, required: false }),
      icon: t.arg({ type: ImageInput, required: false })
    },
    resolve: async (_query, _parent, args, ctx) => {
      let targetExistedFile = null; let updateData: { createMany: { data: any[] } } = { createMany: { data: [] } }; let userFiles: ImageInputValue = null;
      for (const val of [{ key: 1, files: args.bg }, { key: 2, files: args.icon }]) {
        userFiles = (val.files as any) as ImageInputValue; if (!userFiles) continue;
        if (userFiles?.current_image_url && userFiles?.image_url && userFiles?.content_type) { await del(userFiles.current_image_url, { token: process.env.BLOB_READ_WRITE_TOKEN }); }
        targetExistedFile = await prisma.userFiles.findFirst({ where: { file_path: (userFiles?.current_image_url || '') } });
        if (((!!userFiles?.image_url && !!userFiles?.content_type) || userFiles?.is_image_deleted == true) && !!targetExistedFile) { await prisma.userFiles.delete({ where: { id: targetExistedFile?.id } }); }
        if (!!userFiles?.image_url && !!userFiles?.content_type && userFiles?.is_image_deleted != true) {
          const imageUrl = userFiles.image_url || ''; const contentType = userFiles.content_type || '';
          updateData.createMany.data.push({ purpose_id: val.key, file_path: imageUrl, file_name: imageUrl.split('/').pop() || '', extension: contentType.split('/')[1] || '' });
        }
      }
      return prisma.user.update({ where: { id: ctx.auth?.id as number }, data: { name: args?.name ?? '', name_kana: args?.name_kana ?? '', birthday: args?.birthday ? new Date(args?.birthday) : '', introduction: args?.introduction ?? '', phone_number: args?.phone_number ?? '', address: args?.address ?? '', user_files: updateData } });
    },
  })
);

builder.mutationField("updatePassword", (t) =>
  t.prismaField({
    type: User,
    errors: { types: [ZodError] },
    authScopes: { isAuthenticated: true },
    args: {
      password: t.arg.string({ required: true, validate: { type: 'string', maxLength: [100, { message: '文字数が多すぎます。' }], minLength: [1, { message: '入力してください。' }], refine: [(val: string) => val.trim().length > 0, { message: '入力してください。' }] } }),
      passwordConfirmation: t.arg.string({ required: true, validate: { type: 'string', maxLength: [100, { message: '文字数が多すぎます。' }], minLength: [1, { message: '入力してください。' }], refine: [(val: string) => val.trim().length > 0, { message: '入力してください。' }] } }),
    },
    validate: [(args) => args.password === args.passwordConfirmation, { message: 'パスワードが一致しません。', path: ['passwordConfirmation'] }],
    resolve: async (_query, _parent, args, ctx) => {
      const userId = ctx.auth?.id as number; const hashedPassword = hashSync(args.password, 10);
      const updated = await prisma.user.update({ where: { id: userId }, data: { password: hashedPassword } });
      await prisma.authPayload.deleteMany({ where: { user_id: userId } });
      await cookieModule.setCookie(userId, ctx);
      return updated;
    },
  })
);

builder.mutationField("logout", (t) =>
  t.boolean({ authScopes: { isAuthenticated: true }, resolve: async (_q, _p, ctx) => { try { return cookieModule.deleteCookie(ctx); } catch { return false; } } })
);

builder.mutationField("logoutAll", (t) =>
  t.boolean({ authScopes: { isAuthenticated: true }, resolve: async (_q, _p, ctx) => { try { await prisma.authPayload.deleteMany({ where: { user_id: ctx?.auth?.id as number } }); return cookieModule.deleteCookie(ctx); } catch { return false; } } })
);

// CSRF Token issuance (idempotent). Returns Boolean true if token cookie is present/created.
builder.mutationField("issueCsrfToken", (t) =>
  t.boolean({
    resolve: (_q, _p, ctx) => { cookieModule.ensureCsrf(ctx); return true; },
  })
);

builder.mutationField('followOrUnfollow', (t) =>
  t.prismaField({
    type: Follows,
    authScopes: { isAuthenticated: true },
    args: { following_id: t.arg.string({ required: true }), mode: t.arg.string({ required: true }) },
    resolve: (query, _parent, args, ctx) => {
      if (args.mode === 'follow') {
        return prisma.follow.create({ ...query, data: { following: { connect: { id: parseInt(args.following_id) } }, followedBy: { connect: { id: ctx?.auth?.id } } } });
      } else if (args.mode === 'unfollow') {
        return prisma.follow.delete({ where: { following_id_followed_by_id: { following_id: parseInt(args.following_id), followed_by_id: ctx?.auth?.id as number } } });
      }
      throw new Error('follow error');
    }
  })
);

builder.mutationField("adminCreateUser", (t) =>
  t.prismaField({
    type: User,
    errors: { types: [ZodError] },
    authScopes: { isAdmin: true },
    args: {
      handle_name: t.arg.string({ required: true, validate: { type: 'string', maxLength: [60, { message: 'ハンドルネームは60文字以内で入力してください。' }], minLength: [1, { message: 'ハンドルネームを入力してください。' }], refine: [(val: string) => /^[a-zA-Z0-9_-]+$/.test(val), { message: 'ハンドルネームは英数字、アンダースコア、ハイフンのみ使用できます。' }] } }),
      name: t.arg.string({ required: true, validate: { type: 'string', maxLength: [25, { message: '名前は25文字以内で入力してください。' }], minLength: [1, { message: '名前を入力してください。' }] } }),
      name_kana: t.arg.string({ required: false, validate: { type: 'string', maxLength: [50, { message: 'ふりがなは50文字以内で入力してください。' }] } }),
      email: t.arg.string({ required: true, validate: { type: 'string', maxLength: [150, { message: 'メールアドレスは150文字以内で入力してください。' }], email: [true, { message: '正しいメールアドレスを入力してください。' }] } }),
      password: t.arg.string({ required: true, validate: { type: 'string', minLength: [4, { message: 'パスワードは4文字以上で入力してください。' }], maxLength: [100, { message: 'パスワードは100文字以内で入力してください。' }] } }),
      phone_number: t.arg.string({ required: false, validate: { type: 'string', maxLength: [15, { message: '電話番号は15文字以内で入力してください。' }], refine: [(val: string) => val === '' || /^\d+$/.test(val), { message: '電話番号は数字のみで入力してください。' }] } }),
      address: t.arg.string({ required: false, validate: { type: 'string', maxLength: [150, { message: '住所は150文字以内で入力してください。' }] } }),
      introduction: t.arg.string({ required: false, validate: { type: 'string', maxLength: [500, { message: '自己紹介は500文字以内で入力してください。' }] } }),
      birthday: t.arg.string({ required: false, validate: { type: 'string', refine: [(val: string) => { if (!val) return true; const date = new Date(val); return !isNaN(date.getTime()); }, { message: '正しい日付を入力してください。' }] } }),
    },
    validate: [
      async (args) => { const existingHandleName = await prisma.user.findUnique({ where: { handle_name: args.handle_name } }); if (existingHandleName) return false; const existingEmail = await prisma.user.findUnique({ where: { email: args.email } }); if (existingEmail) return false; return true; },
      { message: 'このハンドルネームまたはメールアドレスは既に使用されています。' }
    ],
    resolve: async (query, _parent, args) => {
      const hashedPassword = hashSync(args.password, 10);
      const newUser = await prisma.user.create({ ...query, data: { handle_name: args.handle_name, name: args.name, name_kana: args.name_kana || '', email: args.email, password: hashedPassword, phone_number: args.phone_number || '', address: args.address || '', introduction: args.introduction || '', birthday: args.birthday ? new Date(args.birthday) : new Date(), role: 'USER' } });
      try { const emailService = getEmailService(); const { subject, html, text } = createWelcomeEmail(args.name, args.handle_name); emailService.send(args.email, subject, html, text).catch((error) => console.error(`Failed to send welcome email to ${args.email}:`, error)); } catch (error) { console.error(`Failed to queue welcome email for ${args.email}:`, error); }
      return newUser;
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
      handle_name: t.arg.string({ required: false, validate: { type: 'string', maxLength: [60, { message: 'ハンドルネームは60文字以内で入力してください。' }], refine: [(val: string) => !val || /^[a-zA-Z0-9_-]+$/.test(val), { message: 'ハンドルネームは英数字、アンダースコア、ハイフンのみ使用できます。' }] } }),
      name: t.arg.string({ required: false, validate: { type: 'string', maxLength: [25, { message: '名前は25文字以内で入力してください。' }] } }),
      name_kana: t.arg.string({ required: false, validate: { type: 'string', maxLength: [50, { message: 'ふりがなは50文字以内で入力してください。' }] } }),
      email: t.arg.string({ required: false, validate: { type: 'string', maxLength: [150, { message: 'メールアドレスは150文字以内で入力してください。' }], email: [true, { message: '正しいメールアドレスを入力してください。' }] } }),
      phone_number: t.arg.string({ required: false, validate: { type: 'string', maxLength: [15, { message: '電話番号は15文字以内で入力してください。' }], refine: [(val: string) => !val || /^\d+$/.test(val), { message: '電話番号は数字のみで入力してください。' }] } }),
      address: t.arg.string({ required: false, validate: { type: 'string', maxLength: [150, { message: '住所は150文字以内で入力してください。' }] } }),
      introduction: t.arg.string({ required: false, validate: { type: 'string', maxLength: [500, { message: '自己紹介は500文字以内で入力してください。' }] } }),
      birthday: t.arg.string({ required: false, validate: { type: 'string', refine: [(val: string) => { if (!val) return true; const date = new Date(val); return !isNaN(date.getTime()); }, { message: '正しい日付を入力してください。' }] } }),
    },
    validate: [
      async (args) => { const userId = parseInt(args.id); const existingUser = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } }); if (!existingUser || existingUser.role !== 'USER') return false; if (args.handle_name) { const existingHandleName = await prisma.user.findUnique({ where: { handle_name: args.handle_name, NOT: { id: userId } } }); if (existingHandleName) return false; } if (args.email) { const existingEmail = await prisma.user.findUnique({ where: { email: args.email, NOT: { id: userId } } }); if (existingEmail) return false; } return true; },
      { message: 'ユーザーが見つからないか、ハンドルネーム/メールアドレスが既に使用されています。' }
    ],
    resolve: (query, _parent, args) => {
      const userId = parseInt(args.id); const updateData: any = {};
      if (args.handle_name !== undefined) updateData.handle_name = args.handle_name;
      if (args.name !== undefined) updateData.name = args.name;
      if (args.name_kana !== undefined) updateData.name_kana = args.name_kana;
      if (args.email !== undefined) updateData.email = args.email;
      if (args.phone_number !== undefined) updateData.phone_number = args.phone_number;
      if (args.address !== undefined) updateData.address = args.address;
      if (args.introduction !== undefined) updateData.introduction = args.introduction;
      if (args.birthday !== undefined) updateData.birthday = args.birthday ? new Date(args.birthday) : null;
      return prisma.user.update({ ...query, where: { id: userId }, data: updateData });
    },
  })
);

builder.mutationField("adminDeleteUser", (t) =>
  t.boolean({
    errors: { types: [ZodError] },
    authScopes: { isAdmin: true },
    args: { id: t.arg.string({ required: true }) },
    validate: [ async (args) => { const userId = parseInt(args.id); const existingUser = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } }); if (!existingUser || existingUser.role !== 'USER') return false; return true; }, { message: 'ユーザーが見つからないか、削除できません。' } ],
    resolve: async (_p, args) => { const userId = parseInt(args.id); try { await prisma.user.delete({ where: { id: userId } }); return true; } catch (e) { console.error('Error deleting user:', e); return false; } },
  })
);

// User Report Mutation
builder.mutationField("addUserRank", (t) =>
  t.prismaField({
    type: 'UserRanks',
    args: { user_id: t.arg.string({ required: true }), rank_id: t.arg.string({ required: true }) },
  authScopes: { isAuthenticated: true },
    resolve: (query, _parent, args, ctx) => prisma.userRanks.create({
      ...query,
      data: { 
        reported_user_id: parseInt(args.user_id), 
        rank_id: parseInt(args.rank_id), 
        reporter_user_id: ctx.auth?.id as number 
      },
    }),
  })
);

// Password Reset Request Mutation
const passwordResetRateMap: Record<string, { windowStart: number; count: number }> = {};
const RATE_WINDOW_MS = parseInt(process.env.PASSWORD_RESET_RATE_LIMIT_WINDOW_MS || '60000', 10);
const RATE_MAX = parseInt(process.env.PASSWORD_RESET_RATE_LIMIT_MAX || '3', 10);

// Define the response type for password reset with optional token
const MutationRequestPasswordResetSuccess = builder.objectRef<{ success: boolean; token?: string }>('MutationRequestPasswordResetSuccess');
builder.objectType(MutationRequestPasswordResetSuccess, {
  // Help GraphQL resolve the union member at runtime
  isTypeOf: (value): boolean => {
    return typeof value === 'object' && value !== null && 'success' in (value as any);
  },
  fields: (t) => ({
    success: t.exposeBoolean('success'),
    token: t.exposeString('token', { nullable: true }),
  }),
});

const MutationRequestPasswordResetResult = builder.unionType('MutationRequestPasswordResetResult', {
  types: [MutationRequestPasswordResetSuccess, ZodError],
});

builder.mutationField("requestPasswordReset", (t) =>
  t.field({
    type: MutationRequestPasswordResetResult,
    args: { emailOrHandle: t.arg.string({ required: true, validate: { type: 'string', maxLength: [150, { message: '入力が長すぎます。' }], minLength: [1, { message: '入力してください。' }] } }) },
    resolve: async (_parent, args) => {
      const { emailOrHandle } = args; const user = await prisma.user.findFirst({ where: { OR: [{ email: emailOrHandle }, { handle_name: emailOrHandle }] } });
      const key = user ? `u:${user.id}` : `e:${emailOrHandle.toLowerCase()}`; const now = Date.now(); const entry = passwordResetRateMap[key];
      if (!entry || now - entry.windowStart > RATE_WINDOW_MS) { passwordResetRateMap[key] = { windowStart: now, count: 1 }; } else { if (entry.count >= RATE_MAX) { return { success: true }; } else { entry.count += 1; } }
      if (!user) return { success: true };
      try {
        await prisma.passwordResetToken.updateMany({ where: { user_id: user.id, used: false, expires_at: { gt: new Date() } }, data: { used: true } });
        const token = crypto.randomBytes(32).toString('hex'); const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await prisma.passwordResetToken.create({ data: { token, user_id: user.id, expires_at: expiresAt } });
        const emailService = getEmailService(); const baseUrl = getAppBaseUrl();
        const { subject, html, text } = createPasswordResetEmail(user.name, token, baseUrl);
        emailService.send(user.email, subject, html, text).catch(err => { console.error('[password-reset] send failed user:' + user.id, err); });
        return { success: true, token }; // Return token for temporary direct link
      } catch (error) { console.error('Password reset request error:', error); return { success: true }; }
    },
  })
);

builder.mutationField("resetPassword", (t) =>
  t.field({
    type: 'Boolean',
    errors: { types: [ZodError] },
    args: {
      token: t.arg.string({ required: true, validate: { type: 'string', minLength: [1, { message: 'トークンが必要です。' }] } }),
      password: t.arg.string({ required: true, validate: { type: 'string', maxLength: [100, { message: 'パスワードが長すぎます。' }], minLength: [4, { message: 'パスワードは4文字以上で入力してください。' }], refine: [(val: string) => val.trim().length > 0, { message: 'パスワードを入力してください。' }] } }),
      passwordConfirmation: t.arg.string({ required: true, validate: { type: 'string', maxLength: [100, { message: 'パスワード確認が長すぎます。' }], minLength: [1, { message: 'パスワード確認を入力してください。' }] } }),
    },
    validate: [(args) => args.password === args.passwordConfirmation, { message: 'パスワードが一致しません。', path: ['passwordConfirmation'] }],
    resolve: async (_parent, args, ctx) => {
      const { token, password } = args; const resetToken = await prisma.passwordResetToken.findFirst({ where: { token, used: false, expires_at: { gt: new Date() } }, include: { user: true } });
      if (!resetToken) { throw new ZodError([{ code: 'custom', message: 'トークンが無効か期限切れです。', path: ['token'] } as any]); }
      try { const hashedPassword = hashSync(password, 10); await prisma.user.update({ where: { id: resetToken.user_id }, data: { password: hashedPassword } }); await prisma.passwordResetToken.update({ where: { id: resetToken.id }, data: { used: true } }); await prisma.authPayload.deleteMany({ where: { user_id: resetToken.user_id } }); await cookieModule.setCookie(resetToken.user_id, ctx); return true; } catch (error) { console.error('Password reset error:', error); throw new Error('パスワードリセットに失敗しました。'); }
    },
  })
);
