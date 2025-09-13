import { builder } from '../builder';
import { prisma } from '../../db';

// UserRole enum
export const UserRole = builder.enumType('UserRole', {
	values: ['USER', 'ADMIN', 'MODERATOR'] as const,
});

export const User = builder.prismaObject('User', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		name: t.exposeString('name'),
		slug_id: t.exposeString('slug_id'),
		name_kana: t.exposeString('name_kana', {nullable: true}),
		handle_name: t.exposeString('handle_name'),
		email: t.exposeString('email'),
		introduction: t.exposeString('introduction'),
		phone_number: t.exposeString('phone_number', {nullable: true}),
		birthday: t.expose('birthday', {type: 'Date', nullable: true}),
		address: t.exposeString('address'),
		// Prisma の select に含まれないケースでも安全に返す
		role: t.field({
			type: UserRole,
			resolve: (user: any) => (user?.role as any) ?? 'USER',
		}),
		created_at: t.expose('created_at', {type: 'Date'}),
		updated_at: t.expose('updated_at', {type: 'Date'}),
		user_files: t.relation('user_files'),
		artworks: t.relation('artworks'),
		articles: t.relation('articles'),
		comments: t.relation('comments'),
		following: t.relation('following'),
		// Notification relations (enable both received & sent once Notification type is defined)
		notifications_received: t.relation('notifications_received'),
		notifications_sent: t.relation('notifications_sent'),
	}),
});

// Article関連の型定義
export const Article = builder.prismaObject('Article', {
  fields: (t) => ({
    id: t.exposeID('id'),
    slugId: t.exposeString('slug_id'),
    title: t.exposeString('title'),
    content: t.exposeString('content', { nullable: true }),
    excerpt: t.exposeString('excerpt', { nullable: true }),
    status: t.exposeString('status'),
    publishedAt: t.expose('published_at', { type: 'DateTime', nullable: true }),
    microCmsId: t.exposeString('micro_cms_id', { nullable: true }),
    tags: t.exposeStringList('tags'),
    featuredImage: t.exposeString('featured_image', { nullable: true }),
    createdAt: t.expose('created_at', { type: 'DateTime' }),
    updatedAt: t.expose('updated_at', { type: 'DateTime' }),
    author: t.relation('author', { nullable: true }),
  }),
});

// ArticleStatus enum
export const ArticleStatus = builder.enumType('ArticleStatus', {
  values: ['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const,
});

// ArticleInput type
export const ArticleInput = builder.inputType('ArticleInput', {
  fields: (t) => ({
    title: t.string({ required: true, validate: { maxLength: 200 } }),
    content: t.string({ required: false }),
    excerpt: t.string({ required: false, validate: { maxLength: 500 } }),
    status: t.field({ type: ArticleStatus, required: false }),
    publishedAt: t.field({ type: 'DateTime', required: false }),
    tags: t.stringList({ required: false }),
    featuredImage: t.string({ required: false }),
  }),
});

export const UserFile = builder.prismaObject('UserFiles', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		user_id: t.exposeID('user_id'),
		purpose_id: t.exposeID('purpose_id'),
		file_path: t.exposeString('file_path'),
		created_at: t.expose('created_at', { type: 'Date' }),
		user: t.relation('user'),
	}),
});
  
export const AuthPayload = builder.prismaObject('AuthPayload', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		accessToken: t.exposeString('access_token'),
		expires_at: t.expose('expires_at', { type: 'Date' }),
		user: t.relation('user'),
	}),
});
  
export const Follows = builder.prismaObject('Follow', {
	fields: (t: any) => ({
		following: t.relation('following'),
		following_id: t.exposeID('following_id'),
		followed_by: t.relation('followedBy'),
		followed_by_id: t.exposeID('followed_by_id'),
	})
});

export const Artwork = builder.prismaObject('Artwork', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		slug_id: t.exposeID('slug_id'),
		title: t.exposeString('title'),
		feature: t.exposeString('feature'),
		likes: t.exposeInt('likes'),
		bads: t.exposeInt('bads'),
		deleted: t.exposeBoolean('deleted'),
		created_at: t.expose('created_at', {type: 'Date'}),
		user: t.relation('user'),
		user_id: t.exposeID('user_id'),
		comments: t.relation('comments'),
		artwork_ranks: t.relation('artwork_ranks'),
		artwork_file: t.relation('artwork_file'),
		// Computed fields for rank counts and auth-aware flags
		favoritesCount: t.int({
			resolve: async (artwork: any) =>
				prisma.artworkRanks.count({
					where: { artwork_id: Number(artwork.id), rank_id: 3 },
				}),
		}),
		bookmarksCount: t.int({
			resolve: async (artwork: any) =>
				prisma.artworkRanks.count({
					where: { artwork_id: Number(artwork.id), rank_id: 4 },
				}),
		}),
		isFavoritedByMe: t.boolean({
			resolve: async (artwork: any, _args: unknown, ctx: any) => {
				if (!ctx?.auth?.id) return false;
				const c = await prisma.artworkRanks.count({
					where: {
						artwork_id: Number(artwork.id),
						user_id: ctx.auth.id,
						rank_id: 3,
					},
				});
				return c > 0;
			},
		}),
		isBookmarkedByMe: t.boolean({
			resolve: async (artwork: any, _args: unknown, ctx: any) => {
				if (!ctx?.auth?.id) return false;
				const c = await prisma.artworkRanks.count({
					where: {
						artwork_id: Number(artwork.id),
						user_id: ctx.auth.id,
						rank_id: 4,
					},
				});
				return c > 0;
			},
		}),
	 }),
});

export const ArtworkRanks = builder.prismaObject('ArtworkRanks', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		artwork_id: t.exposeID('artwork_id'),
		rank_id: t.exposeID('rank_id'),
		user_id: t.exposeID('user_id'),
		ranks: t.relation('ranks'),
	}),
});

export const UserRanks = builder.prismaObject('UserRanks', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		reported_user_id: t.exposeID('reported_user_id'),
		rank_id: t.exposeID('rank_id'),
		reporter_user_id: t.exposeID('reporter_user_id'),
		reported_user: t.relation('reported_user'),
		reporter_user: t.relation('reporter_user'),
		ranks: t.relation('ranks'),
		created_at: t.expose('created_at', {type: 'Date'}),
	}),
});

// TODO: Uncomment when Prisma client is regenerated with CommentRanks model
// export const CommentRanks = builder.prismaObject('CommentRanks', {
// 	fields: (t: any) => ({
// 		id: t.exposeID('id'),
// 		comment_id: t.exposeID('comment_id'),
// 		rank_id: t.exposeID('rank_id'),
// 		user_id: t.exposeID('user_id'),
// 		comment: t.relation('comment'),
// 		user: t.relation('user'),
// 		ranks: t.relation('ranks'),
// 		created_at: t.expose('created_at', {type: 'Date'}),
// 	}),
// });

export const Ranks = builder.prismaObject('Ranks', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		name: t.exposeString('name'),
		rank_type_id: t.exposeID('rank_type_id'),
		rank_type: t.relation('rank_type'),
	}),
});

export const RankTypes = builder.prismaObject('RankTypes', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		name: t.exposeString('name'),
		ranks: t.relation('ranks'),
	}),
});

export const ArtworkFile = builder.prismaObject('ArtworkFile', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		artwork_id: t.exposeID('artwork_id'),
		file_path: t.exposeString('file_path'),
	}),
});

export const Comment = builder.prismaObject('Comment', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		body: t.exposeString('body'),
		artwork_id: t.exposeID('artwork_id'),
		slug_id: t.exposeID('slug_id'),
		created_at: t.expose('created_at', {type: 'Date'}),
		user: t.relation('user'),
		artwork: t.relation('artwork'),
		// TODO: Uncomment when CommentRanks model is available
		// comment_ranks: t.relation('comment_ranks'),
	}),
});

export const ImageInput = builder.inputType('ImageInput', {
	fields: (t: any) => ({
		is_image_deleted: t.boolean({defaultValue: false,}),
		current_image_url: t.string({defaultValue: ''}),
		image_url: t.string(),
		content_type: t.string(),
	}),
})

// NotificationType enum & Notification object (re-enabled)
export const NotificationType = builder.enumType('NotificationType', {
	values: ['FOLLOW', 'NEW_ARTWORK', 'NEW_COMMENT'] as const,
});

export const Notification = builder.prismaObject('Notification', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		slug_id: t.exposeString('slug_id'),
		type: t.field({
			type: NotificationType,
			resolve: (notification: any) => notification.type,
		}),
		title: t.exposeString('title'),
		message: t.exposeString('message'),
		is_read: t.exposeBoolean('is_read'),
		created_at: t.expose('created_at', {type: 'Date'}),
		updated_at: t.expose('updated_at', {type: 'Date'}),
		recipient: t.relation('recipient'),
		actor: t.relation('actor', {nullable: true}),
		artwork: t.relation('artwork', {nullable: true}),
		comment: t.relation('comment', {nullable: true}),
	}),
});

// Admin Users List Response Type
export const AdminUsersListResponse = builder.simpleObject('AdminUsersListResponse', {
	fields: (t: any) => ({
		users: t.field({ type: [User], required: true }),
		totalCount: t.int({ required: true }),
		hasNextPage: t.boolean({ required: true }),
		hasPreviousPage: t.boolean({ required: true }),
	}),
});

export const userIncludeFile = { include: { user_files: { where: { purpose_id: 2 } } } };