import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: string; output: string; }
};

export type AdminUsersListResponse = {
  __typename?: 'AdminUsersListResponse';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  totalCount: Scalars['Int']['output'];
  users: Array<User>;
};

export type Article = {
  __typename?: 'Article';
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  excerpt?: Maybe<Scalars['String']['output']>;
  featuredImage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  microCmsId?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slugId: Scalars['String']['output'];
  status: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ArticleConnection = {
  __typename?: 'ArticleConnection';
  edges: Array<ArticleEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ArticleEdge = {
  __typename?: 'ArticleEdge';
  cursor: Scalars['String']['output'];
  node: Article;
};

export type ArticleFilter = {
  authorId?: InputMaybe<Scalars['Int']['input']>;
  publishedAfter?: InputMaybe<Scalars['DateTime']['input']>;
  publishedBefore?: InputMaybe<Scalars['DateTime']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ArticleInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  featuredImage?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<ArticleStatus>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export enum ArticleStatus {
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type Artwork = {
  __typename?: 'Artwork';
  artwork_file: Array<ArtworkFile>;
  artwork_ranks: Array<ArtworkRanks>;
  bads: Scalars['Int']['output'];
  bookmarksCount: Scalars['Int']['output'];
  comments: Array<Comment>;
  created_at: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  favoritesCount: Scalars['Int']['output'];
  feature: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isBookmarkedByMe: Scalars['Boolean']['output'];
  isFavoritedByMe: Scalars['Boolean']['output'];
  likes: Scalars['Int']['output'];
  slug_id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  user: User;
  user_id: Scalars['ID']['output'];
};

export type ArtworkFile = {
  __typename?: 'ArtworkFile';
  artwork_id: Scalars['ID']['output'];
  file_path: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type ArtworkRanks = {
  __typename?: 'ArtworkRanks';
  artwork_id: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  rank_id: Scalars['ID']['output'];
  ranks: Ranks;
  user_id: Scalars['ID']['output'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  accessToken: Scalars['String']['output'];
  expires_at: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  user: User;
};

export type Comment = {
  __typename?: 'Comment';
  artwork: Artwork;
  artwork_id: Scalars['ID']['output'];
  body: Scalars['String']['output'];
  created_at: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  slug_id: Scalars['ID']['output'];
  user: User;
};

export type CsrfError = Error & {
  __typename?: 'CsrfError';
  message: Scalars['String']['output'];
};

export type EmailSendResult = {
  __typename?: 'EmailSendResult';
  error?: Maybe<Scalars['String']['output']>;
  messageId?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Error = {
  message: Scalars['String']['output'];
};

export type Follow = {
  __typename?: 'Follow';
  followed_by: User;
  followed_by_id: Scalars['ID']['output'];
  following: User;
  following_id: Scalars['ID']['output'];
};

export type ImageInput = {
  content_type?: InputMaybe<Scalars['String']['input']>;
  current_image_url?: InputMaybe<Scalars['String']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  is_image_deleted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addArtworkRank: ArtworkRanks;
  addCommentRank: Scalars['Boolean']['output'];
  addUserRank: UserRanks;
  adminCreateUser: MutationAdminCreateUserResult;
  adminDeleteUser: MutationAdminDeleteUserResult;
  adminUpdateUser: MutationAdminUpdateUserResult;
  createArticle: MutationCreateArticleResult;
  deleteArticle: MutationDeleteArticleResult;
  followOrUnfollow: Follow;
  issueCsrfToken: Scalars['Boolean']['output'];
  login: MutationLoginResult;
  logout: Scalars['Boolean']['output'];
  logoutAll: Scalars['Boolean']['output'];
  markAllNotificationsAsRead: Scalars['Boolean']['output'];
  markNotificationAsRead: Notification;
  publishArticleNow: MutationPublishArticleNowResult;
  removeArtwork: Artwork;
  removeArtworkRank: ArtworkRanks;
  removeComment: Comment;
  requestPasswordReset: MutationRequestPasswordResetResult;
  resetPassword: MutationResetPasswordResult;
  sendEmailVerificationEmail: EmailSendResult;
  sendPasswordResetEmail: EmailSendResult;
  sendTestEmail: EmailSendResult;
  sendWelcomeEmail: EmailSendResult;
  syncArticleFromMicroCMS: MutationSyncArticleFromMicroCmsResult;
  updateArticle: MutationUpdateArticleResult;
  updateMyProfile: MutationUpdateMyProfileResult;
  updatePassword: MutationUpdatePasswordResult;
  upsertArtwork: MutationUpsertArtworkResult;
  upsertComment: MutationUpsertCommentResult;
};


export type MutationAddArtworkRankArgs = {
  artwork_id: Scalars['String']['input'];
  rank_id: Scalars['String']['input'];
};


export type MutationAddCommentRankArgs = {
  comment_slug_id: Scalars['String']['input'];
  rank_id: Scalars['String']['input'];
};


export type MutationAddUserRankArgs = {
  rank_id: Scalars['String']['input'];
  user_id: Scalars['String']['input'];
};


export type MutationAdminCreateUserArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  handle_name: Scalars['String']['input'];
  introduction?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  name_kana?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone_number?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAdminDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationAdminUpdateUserArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  handle_name?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  introduction?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_kana?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateArticleArgs = {
  input: ArticleInput;
  syncToMicroCMS?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteArticleArgs = {
  deleteFromMicroCMS?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
};


export type MutationFollowOrUnfollowArgs = {
  following_id: Scalars['String']['input'];
  mode: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationMarkNotificationAsReadArgs = {
  slug_id: Scalars['String']['input'];
};


export type MutationPublishArticleNowArgs = {
  id: Scalars['Int']['input'];
  syncToMicroCMS?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationRemoveArtworkArgs = {
  artwork_id: Scalars['String']['input'];
};


export type MutationRemoveArtworkRankArgs = {
  artwork_id: Scalars['String']['input'];
  rank_id: Scalars['String']['input'];
};


export type MutationRemoveCommentArgs = {
  comment_slug_id: Scalars['String']['input'];
};


export type MutationRequestPasswordResetArgs = {
  emailOrHandle: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSendEmailVerificationEmailArgs = {
  baseUrl: Scalars['String']['input'];
  email: Scalars['String']['input'];
  userName: Scalars['String']['input'];
  verificationToken: Scalars['String']['input'];
};


export type MutationSendPasswordResetEmailArgs = {
  baseUrl: Scalars['String']['input'];
  email: Scalars['String']['input'];
  resetToken: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};


export type MutationSendTestEmailArgs = {
  content: Scalars['String']['input'];
  subject: Scalars['String']['input'];
  to: Scalars['String']['input'];
};


export type MutationSendWelcomeEmailArgs = {
  email: Scalars['String']['input'];
  handleName: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};


export type MutationSyncArticleFromMicroCmsArgs = {
  microCmsId: Scalars['String']['input'];
};


export type MutationUpdateArticleArgs = {
  id: Scalars['Int']['input'];
  input: ArticleInput;
  syncToMicroCMS?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateMyProfileArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  bg?: InputMaybe<ImageInput>;
  birthday?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<ImageInput>;
  introduction?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_kana?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdatePasswordArgs = {
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationUpsertArtworkArgs = {
  artwork_slug_id?: InputMaybe<Scalars['String']['input']>;
  content_type?: InputMaybe<Scalars['String']['input']>;
  current_image_url?: InputMaybe<Scalars['String']['input']>;
  feature: Scalars['String']['input'];
  image_url?: InputMaybe<Scalars['String']['input']>;
  is_image_deleted?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
};


export type MutationUpsertCommentArgs = {
  artwork_id: Scalars['String']['input'];
  body: Scalars['String']['input'];
  comment_slug_id?: InputMaybe<Scalars['String']['input']>;
};

export type MutationAdminCreateUserResult = MutationAdminCreateUserSuccess | ZodError;

export type MutationAdminCreateUserSuccess = {
  __typename?: 'MutationAdminCreateUserSuccess';
  data: User;
};

export type MutationAdminDeleteUserResult = MutationAdminDeleteUserSuccess | ZodError;

export type MutationAdminDeleteUserSuccess = {
  __typename?: 'MutationAdminDeleteUserSuccess';
  data: Scalars['Boolean']['output'];
};

export type MutationAdminUpdateUserResult = MutationAdminUpdateUserSuccess | ZodError;

export type MutationAdminUpdateUserSuccess = {
  __typename?: 'MutationAdminUpdateUserSuccess';
  data: User;
};

export type MutationCreateArticleResult = CsrfError | MutationCreateArticleSuccess | ZodError;

export type MutationCreateArticleSuccess = {
  __typename?: 'MutationCreateArticleSuccess';
  data: Article;
};

export type MutationDeleteArticleResult = CsrfError | MutationDeleteArticleSuccess | ZodError;

export type MutationDeleteArticleSuccess = {
  __typename?: 'MutationDeleteArticleSuccess';
  data: Scalars['Boolean']['output'];
};

export type MutationLoginResult = CsrfError | MutationLoginSuccess | ZodError;

export type MutationLoginSuccess = {
  __typename?: 'MutationLoginSuccess';
  data: AuthPayload;
};

export type MutationPublishArticleNowResult = CsrfError | MutationPublishArticleNowSuccess | ZodError;

export type MutationPublishArticleNowSuccess = {
  __typename?: 'MutationPublishArticleNowSuccess';
  data: Article;
};

export type MutationRequestPasswordResetResult = MutationRequestPasswordResetSuccess | ZodError;

export type MutationRequestPasswordResetSuccess = {
  __typename?: 'MutationRequestPasswordResetSuccess';
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type MutationResetPasswordResult = MutationResetPasswordSuccess | ZodError;

export type MutationResetPasswordSuccess = {
  __typename?: 'MutationResetPasswordSuccess';
  data: Scalars['Boolean']['output'];
};

export type MutationSyncArticleFromMicroCmsResult = CsrfError | MutationSyncArticleFromMicroCmsSuccess | ZodError;

export type MutationSyncArticleFromMicroCmsSuccess = {
  __typename?: 'MutationSyncArticleFromMicroCMSSuccess';
  data: Article;
};

export type MutationUpdateArticleResult = CsrfError | MutationUpdateArticleSuccess | ZodError;

export type MutationUpdateArticleSuccess = {
  __typename?: 'MutationUpdateArticleSuccess';
  data: Article;
};

export type MutationUpdateMyProfileResult = MutationUpdateMyProfileSuccess | ZodError;

export type MutationUpdateMyProfileSuccess = {
  __typename?: 'MutationUpdateMyProfileSuccess';
  data: User;
};

export type MutationUpdatePasswordResult = MutationUpdatePasswordSuccess | ZodError;

export type MutationUpdatePasswordSuccess = {
  __typename?: 'MutationUpdatePasswordSuccess';
  data: User;
};

export type MutationUpsertArtworkResult = MutationUpsertArtworkSuccess | ZodError;

export type MutationUpsertArtworkSuccess = {
  __typename?: 'MutationUpsertArtworkSuccess';
  data: Artwork;
};

export type MutationUpsertCommentResult = MutationUpsertCommentSuccess | ZodError;

export type MutationUpsertCommentSuccess = {
  __typename?: 'MutationUpsertCommentSuccess';
  data: Comment;
};

export type Notification = {
  __typename?: 'Notification';
  actor?: Maybe<User>;
  artwork?: Maybe<Artwork>;
  comment?: Maybe<Comment>;
  created_at: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  is_read: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  recipient: User;
  slug_id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: NotificationType;
  updated_at: Scalars['Date']['output'];
};

export enum NotificationType {
  Follow = 'FOLLOW',
  NewArtwork = 'NEW_ARTWORK',
  NewComment = 'NEW_COMMENT'
}

export type NotificationsListResponse = {
  __typename?: 'NotificationsListResponse';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  notifications: Array<Notification>;
  totalCount: Scalars['Int']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  UserProfile: User;
  adminUserDetail: User;
  adminUsersList: AdminUsersListResponse;
  article?: Maybe<Article>;
  articleTags: Array<Scalars['String']['output']>;
  articles: ArticleConnection;
  artwork: Artwork;
  artworks: Array<Artwork>;
  artworksCount: Scalars['Int']['output'];
  getArtworkComments: Array<Comment>;
  getArtworkRanks: Array<ArtworkRanks>;
  getAuthArtworkRanks: Array<ArtworkRanks>;
  getFollowedByUser: Array<User>;
  getFollowingUser: Array<User>;
  getMyBookmarksGiven: Scalars['Int']['output'];
  getMyFavoritesGiven: Scalars['Int']['output'];
  getMyTotalBookmarks: Scalars['Int']['output'];
  getMyTotalFavorites: Scalars['Int']['output'];
  getReportReasons: Array<Ranks>;
  me: User;
  notification: Notification;
  /**
   * Backward compatible simple list (deprecated: use notificationsList)
   * @deprecated Use notificationsList for pagination metadata
   */
  notifications: Array<Notification>;
  notificationsList: NotificationsListResponse;
  publishedArticles: ArticleConnection;
  unreadNotificationsCount: Scalars['Int']['output'];
};


export type QueryUserProfileArgs = {
  handle_name: Scalars['String']['input'];
};


export type QueryAdminUserDetailArgs = {
  id: Scalars['String']['input'];
};


export type QueryAdminUsersListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryArticleArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  microCmsId?: InputMaybe<Scalars['String']['input']>;
  slugId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryArticlesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ArticleFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
};


export type QueryArtworkArgs = {
  slug_id: Scalars['String']['input'];
};


export type QueryArtworksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
};


export type QueryArtworksCountArgs = {
  q?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetArtworkCommentsArgs = {
  artwork_id: Scalars['String']['input'];
};


export type QueryGetArtworkRanksArgs = {
  artwork_id: Scalars['String']['input'];
};


export type QueryGetAuthArtworkRanksArgs = {
  artwork_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryNotificationArgs = {
  slug_id: Scalars['String']['input'];
};


export type QueryNotificationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  onlyUnread?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryNotificationsListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  onlyUnread?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPublishedArticlesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type RankTypes = {
  __typename?: 'RankTypes';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ranks: Array<Ranks>;
};

export type Ranks = {
  __typename?: 'Ranks';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rank_type: RankTypes;
  rank_type_id: Scalars['ID']['output'];
};

export type User = {
  __typename?: 'User';
  address: Scalars['String']['output'];
  articles: Array<Article>;
  artworks: Array<Artwork>;
  birthday?: Maybe<Scalars['Date']['output']>;
  comments: Array<Comment>;
  created_at: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  following: Array<Follow>;
  handle_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  introduction: Scalars['String']['output'];
  name: Scalars['String']['output'];
  name_kana?: Maybe<Scalars['String']['output']>;
  notifications_received: Array<Notification>;
  notifications_sent: Array<Notification>;
  phone_number?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  slug_id: Scalars['String']['output'];
  updated_at: Scalars['Date']['output'];
  user_files: Array<UserFiles>;
};

export type UserFiles = {
  __typename?: 'UserFiles';
  created_at: Scalars['Date']['output'];
  file_path: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  purpose_id: Scalars['ID']['output'];
  user: User;
  user_id: Scalars['ID']['output'];
};

export type UserRanks = {
  __typename?: 'UserRanks';
  created_at: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  rank_id: Scalars['ID']['output'];
  ranks: Ranks;
  reported_user: User;
  reported_user_id: Scalars['ID']['output'];
  reporter_user: User;
  reporter_user_id: Scalars['ID']['output'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
  User = 'USER'
}

export type ZodError = Error & {
  __typename?: 'ZodError';
  fieldErrors: Array<ZodFieldError>;
  message: Scalars['String']['output'];
};

export type ZodFieldError = {
  __typename?: 'ZodFieldError';
  message: Scalars['String']['output'];
  path: Array<Scalars['String']['output']>;
};

export type SyncArticleFromMicroCmsMutationVariables = Exact<{
  microCmsId: Scalars['String']['input'];
}>;


export type SyncArticleFromMicroCmsMutation = { __typename?: 'Mutation', syncArticleFromMicroCMS: { __typename: 'CsrfError', message: string } | { __typename: 'MutationSyncArticleFromMicroCMSSuccess', data: { __typename?: 'Article', id: string, slugId: string, title: string, content?: string | null, excerpt?: string | null, status: string, publishedAt?: string | null, microCmsId?: string | null, tags: Array<string>, featuredImage?: string | null, createdAt: string, updatedAt: string, author?: { __typename?: 'User', id: string, name: string, handleName: string } | null } } | { __typename: 'ZodError', message: string, fieldErrors: Array<{ __typename?: 'ZodFieldError', message: string }> } };

export type CreateArticleMutationVariables = Exact<{
  input: ArticleInput;
  syncToMicroCMS?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle: { __typename: 'CsrfError', message: string } | { __typename: 'MutationCreateArticleSuccess', data: { __typename?: 'Article', id: string, slugId: string, title: string, content?: string | null, excerpt?: string | null, status: string, publishedAt?: string | null, microCmsId?: string | null, tags: Array<string>, featuredImage?: string | null, createdAt: string, updatedAt: string, author?: { __typename?: 'User', id: string, name: string, handleName: string } | null } } | { __typename: 'ZodError', message: string, fieldErrors: Array<{ __typename?: 'ZodFieldError', message: string }> } };

export type UpdateArticleMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: ArticleInput;
  syncToMicroCMS?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle: { __typename: 'CsrfError', message: string } | { __typename: 'MutationUpdateArticleSuccess', data: { __typename?: 'Article', id: string, slugId: string, title: string, content?: string | null, excerpt?: string | null, status: string, publishedAt?: string | null, microCmsId?: string | null, tags: Array<string>, featuredImage?: string | null, createdAt: string, updatedAt: string, author?: { __typename?: 'User', id: string, name: string, handleName: string } | null } } | { __typename: 'ZodError', message: string, fieldErrors: Array<{ __typename?: 'ZodFieldError', message: string }> } };

export type DeleteArticleMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  deleteFromMicroCMS?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type DeleteArticleMutation = { __typename?: 'Mutation', deleteArticle: { __typename: 'CsrfError', message: string } | { __typename: 'MutationDeleteArticleSuccess', data: boolean } | { __typename: 'ZodError', message: string, fieldErrors: Array<{ __typename?: 'ZodFieldError', message: string }> } };

export type PublishArticleNowMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  syncToMicroCMS?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type PublishArticleNowMutation = { __typename?: 'Mutation', publishArticleNow: { __typename: 'CsrfError', message: string } | { __typename: 'MutationPublishArticleNowSuccess', data: { __typename?: 'Article', id: string, slugId: string, title: string, status: string, publishedAt?: string | null, updatedAt: string } } | { __typename: 'ZodError', message: string, fieldErrors: Array<{ __typename?: 'ZodFieldError', message: string }> } };

export type UpsertArtworkMutationVariables = Exact<{
  title: Scalars['String']['input'];
  feature: Scalars['String']['input'];
  artwork_slug_id?: InputMaybe<Scalars['String']['input']>;
  current_image_url?: InputMaybe<Scalars['String']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  content_type?: InputMaybe<Scalars['String']['input']>;
  is_image_deleted?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpsertArtworkMutation = { __typename?: 'Mutation', upsertArtwork: { __typename: 'MutationUpsertArtworkSuccess' } | { __typename: 'ZodError', message: string } };

export type RemoveArtworkMutationVariables = Exact<{
  artwork_id: Scalars['String']['input'];
}>;


export type RemoveArtworkMutation = { __typename?: 'Mutation', removeArtwork: { __typename: 'Artwork' } };

export type AddArtworkRankMutationVariables = Exact<{
  artwork_id: Scalars['String']['input'];
  rank_id: Scalars['String']['input'];
}>;


export type AddArtworkRankMutation = { __typename?: 'Mutation', addArtworkRank: { __typename: 'ArtworkRanks' } };

export type RemoveArtworkRankMutationVariables = Exact<{
  artwork_id: Scalars['String']['input'];
  rank_id: Scalars['String']['input'];
}>;


export type RemoveArtworkRankMutation = { __typename?: 'Mutation', removeArtworkRank: { __typename: 'ArtworkRanks' } };

export type UpsertCommentMutationVariables = Exact<{
  body: Scalars['String']['input'];
  artwork_id: Scalars['String']['input'];
  comment_slug_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpsertCommentMutation = { __typename?: 'Mutation', upsertComment: { __typename: 'MutationUpsertCommentSuccess' } | { __typename: 'ZodError', message: string } };

export type RemoveCommentMutationVariables = Exact<{
  comment_slug_id: Scalars['String']['input'];
}>;


export type RemoveCommentMutation = { __typename?: 'Mutation', removeComment: { __typename: 'Comment' } };

export type AddCommentRankMutationVariables = Exact<{
  comment_slug_id: Scalars['String']['input'];
  rank_id: Scalars['String']['input'];
}>;


export type AddCommentRankMutation = { __typename?: 'Mutation', addCommentRank: boolean };

export type MarkNotificationAsReadMutationVariables = Exact<{
  slug_id: Scalars['String']['input'];
}>;


export type MarkNotificationAsReadMutation = { __typename?: 'Mutation', markNotificationAsRead: { __typename?: 'Notification', id: string, slug_id: string, is_read: boolean, updated_at: any } };

export type MarkAllNotificationsAsReadMutationVariables = Exact<{ [key: string]: never; }>;


export type MarkAllNotificationsAsReadMutation = { __typename?: 'Mutation', markAllNotificationsAsRead: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'CsrfError' } | { __typename: 'MutationLoginSuccess', data: { __typename?: 'AuthPayload', accessToken: string } } | { __typename: 'ZodError', message: string, fieldErrors: Array<{ __typename?: 'ZodFieldError', message: string }> } };

export type UpdateMyProfileMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
  name_kana?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['String']['input']>;
  introduction?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  bg?: InputMaybe<ImageInput>;
  icon?: InputMaybe<ImageInput>;
}>;


export type UpdateMyProfileMutation = { __typename?: 'Mutation', updateMyProfile: { __typename: 'MutationUpdateMyProfileSuccess' } | { __typename: 'ZodError', message: string, fieldErrors: Array<{ __typename?: 'ZodFieldError', message: string }> } };

export type UpdatePasswordMutationVariables = Exact<{
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: { __typename: 'MutationUpdatePasswordSuccess' } | { __typename: 'ZodError', message: string, fieldErrors: Array<{ __typename?: 'ZodFieldError', message: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type LogoutAllMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutAllMutation = { __typename?: 'Mutation', logoutAll: boolean };

export type FollowOrUnfollowMutationVariables = Exact<{
  following_id: Scalars['String']['input'];
  mode: Scalars['String']['input'];
}>;


export type FollowOrUnfollowMutation = { __typename?: 'Mutation', followOrUnfollow: { __typename: 'Follow' } };

export type AddUserRankMutationVariables = Exact<{
  user_id: Scalars['String']['input'];
  rank_id: Scalars['String']['input'];
}>;


export type AddUserRankMutation = { __typename?: 'Mutation', addUserRank: { __typename: 'UserRanks' } };

export type AdminCreateUserMutationVariables = Exact<{
  handle_name: Scalars['String']['input'];
  name: Scalars['String']['input'];
  name_kana?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone_number?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  introduction?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['String']['input']>;
}>;


export type AdminCreateUserMutation = { __typename?: 'Mutation', adminCreateUser: { __typename: 'MutationAdminCreateUserSuccess', data: { __typename?: 'User', id: string, handle_name: string, name: string, email: string } } | { __typename: 'ZodError', message: string, fieldErrors: Array<{ __typename?: 'ZodFieldError', message: string }> } };

export type AdminUpdateUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
  handle_name?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_kana?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  introduction?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['String']['input']>;
}>;


export type AdminUpdateUserMutation = { __typename?: 'Mutation', adminUpdateUser: { __typename: 'MutationAdminUpdateUserSuccess', data: { __typename?: 'User', id: string, handle_name: string, name: string, email: string } } | { __typename: 'ZodError', message: string, fieldErrors: Array<{ __typename?: 'ZodFieldError', message: string }> } };

export type AdminDeleteUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AdminDeleteUserMutation = { __typename?: 'Mutation', adminDeleteUser: { __typename: 'MutationAdminDeleteUserSuccess', data: boolean } | { __typename: 'ZodError', message: string, fieldErrors: Array<{ __typename?: 'ZodFieldError', message: string }> } };

export type RequestPasswordResetMutationVariables = Exact<{
  emailOrHandle: Scalars['String']['input'];
}>;


export type RequestPasswordResetMutation = { __typename?: 'Mutation', requestPasswordReset: { __typename: 'MutationRequestPasswordResetSuccess', success: boolean, token?: string | null } | { __typename: 'ZodError', message: string, fieldErrors: Array<{ __typename?: 'ZodFieldError', message: string }> } };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename: 'MutationResetPasswordSuccess', data: boolean } | { __typename: 'ZodError', message: string, fieldErrors: Array<{ __typename?: 'ZodFieldError', message: string }> } };

export type IssueCsrfTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type IssueCsrfTokenMutation = { __typename?: 'Mutation', issueCsrfToken: boolean };

export type GetArticlesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ArticleFilter>;
  source?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetArticlesQuery = { __typename?: 'Query', articles: { __typename?: 'ArticleConnection', totalCount: number, edges: Array<{ __typename?: 'ArticleEdge', cursor: string, node: { __typename?: 'Article', id: string, slugId: string, title: string, excerpt?: string | null, status: string, publishedAt?: string | null, tags: Array<string>, featuredImage?: string | null, createdAt: string, updatedAt: string, author?: { __typename?: 'User', id: string, name: string, handleName: string } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type GetPublishedArticlesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPublishedArticlesQuery = { __typename?: 'Query', publishedArticles: { __typename?: 'ArticleConnection', totalCount: number, edges: Array<{ __typename?: 'ArticleEdge', cursor: string, node: { __typename?: 'Article', id: string, slugId: string, title: string, excerpt?: string | null, tags: Array<string>, featuredImage?: string | null, publishedAt?: string | null, createdAt: string, author?: { __typename?: 'User', id: string, name: string, handleName: string } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type GetArticleQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  slugId?: InputMaybe<Scalars['String']['input']>;
  microCmsId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetArticleQuery = { __typename?: 'Query', article?: { __typename?: 'Article', id: string, slugId: string, title: string, content?: string | null, excerpt?: string | null, status: string, publishedAt?: string | null, microCmsId?: string | null, tags: Array<string>, featuredImage?: string | null, createdAt: string, updatedAt: string, author?: { __typename?: 'User', id: string, name: string, introduction: string, handleName: string } | null } | null };

export type GetArticleTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArticleTagsQuery = { __typename?: 'Query', articleTags: Array<string> };

export type ArtworksQueryVariables = Exact<{
  q?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ArtworksQuery = { __typename?: 'Query', artworks: Array<{ __typename?: 'Artwork', id: string, title: string, slug_id: string, feature: string, created_at: any, favoritesCount: number, bookmarksCount: number, isFavoritedByMe: boolean, isBookmarkedByMe: boolean, user: { __typename?: 'User', id: string, handle_name: string, user_files: Array<{ __typename?: 'UserFiles', file_path: string }> }, artwork_file: Array<{ __typename?: 'ArtworkFile', file_path: string }> }> };

export type ArtworksCountQueryVariables = Exact<{
  q?: InputMaybe<Scalars['String']['input']>;
}>;


export type ArtworksCountQuery = { __typename?: 'Query', artworksCount: number };

export type GetAuthArtworkRanksQueryVariables = Exact<{
  artwork_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAuthArtworkRanksQuery = { __typename?: 'Query', getAuthArtworkRanks: Array<{ __typename?: 'ArtworkRanks', id: string, artwork_id: string, user_id: string, rank_id: string }> };

export type ArtworkQueryVariables = Exact<{
  slug_id: Scalars['String']['input'];
}>;


export type ArtworkQuery = { __typename?: 'Query', artwork: { __typename?: 'Artwork', id: string, slug_id: string, title: string, likes: number, bads: number, feature: string, deleted: boolean, created_at: any, favoritesCount: number, bookmarksCount: number, isFavoritedByMe: boolean, isBookmarkedByMe: boolean, user: { __typename?: 'User', id: string, handle_name: string, user_files: Array<{ __typename?: 'UserFiles', file_path: string }> }, artwork_file: Array<{ __typename?: 'ArtworkFile', file_path: string }>, comments: Array<{ __typename?: 'Comment', body: string, created_at: any, user: { __typename?: 'User', id: string, handle_name: string, user_files: Array<{ __typename?: 'UserFiles', file_path: string }> } }> } };

export type GetArtworkRanksQueryVariables = Exact<{
  artwork_id: Scalars['String']['input'];
}>;


export type GetArtworkRanksQuery = { __typename?: 'Query', getArtworkRanks: Array<{ __typename?: 'ArtworkRanks', id: string, rank_id: string }> };

export type GetReportReasonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReportReasonsQuery = { __typename?: 'Query', getReportReasons: Array<{ __typename?: 'Ranks', id: string, name: string, rank_type_id: string }> };

export type GetArtworkCommentsQueryVariables = Exact<{
  artwork_id: Scalars['String']['input'];
}>;


export type GetArtworkCommentsQuery = { __typename?: 'Query', getArtworkComments: Array<{ __typename?: 'Comment', id: string, body: string, artwork_id: string, slug_id: string, created_at: any, user: { __typename?: 'User', id: string, handle_name: string, user_files: Array<{ __typename?: 'UserFiles', file_path: string }> } }> };

export type GetNotificationsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  onlyUnread?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetNotificationsQuery = { __typename?: 'Query', notifications: Array<{ __typename?: 'Notification', id: string, slug_id: string, type: NotificationType, title: string, message: string, is_read: boolean, created_at: any, actor?: { __typename?: 'User', id: string, name: string, handle_name: string } | null, artwork?: { __typename?: 'Artwork', id: string, slug_id: string, title: string } | null, comment?: { __typename?: 'Comment', id: string, slug_id: string, body: string } | null }> };

export type GetNotificationQueryVariables = Exact<{
  slug_id: Scalars['String']['input'];
}>;


export type GetNotificationQuery = { __typename?: 'Query', notification: { __typename?: 'Notification', id: string, slug_id: string, type: NotificationType, title: string, message: string, is_read: boolean, created_at: any, actor?: { __typename?: 'User', id: string, name: string, handle_name: string } | null, artwork?: { __typename?: 'Artwork', id: string, slug_id: string, title: string, user: { __typename?: 'User', name: string, handle_name: string } } | null, comment?: { __typename?: 'Comment', id: string, slug_id: string, body: string, artwork: { __typename?: 'Artwork', title: string } } | null } };

export type GetUnreadNotificationsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnreadNotificationsCountQuery = { __typename?: 'Query', unreadNotificationsCount: number };

export type UserProfileQueryVariables = Exact<{
  handle_name: Scalars['String']['input'];
}>;


export type UserProfileQuery = { __typename?: 'Query', UserProfile: { __typename?: 'User', id: string, name: string, name_kana?: string | null, handle_name: string, introduction: string, birthday?: any | null, phone_number?: string | null, address: string, email: string, created_at: any, user_files: Array<{ __typename?: 'UserFiles', purpose_id: string, file_path: string }>, artworks: Array<{ __typename?: 'Artwork', slug_id: string, title: string, likes: number, bads: number, created_at: any, artwork_file: Array<{ __typename?: 'ArtworkFile', file_path: string }> }>, comments: Array<{ __typename?: 'Comment', body: string, created_at: any, artwork: { __typename?: 'Artwork', slug_id: string, title: string } }>, following: Array<{ __typename?: 'Follow', followed_by_id: string }> } };

export type DashboardQueryVariables = Exact<{
  handle_name: Scalars['String']['input'];
}>;


export type DashboardQuery = { __typename?: 'Query', getMyTotalFavorites: number, getMyTotalBookmarks: number, getMyFavoritesGiven: number, getMyBookmarksGiven: number, UserProfile: { __typename?: 'User', name: string, artworks: Array<{ __typename?: 'Artwork', slug_id: string, title: string, favoritesCount: number, created_at: any, artwork_file: Array<{ __typename?: 'ArtworkFile', file_path: string }> }>, comments: Array<{ __typename?: 'Comment', body: string, created_at: any, artwork: { __typename?: 'Artwork', slug_id: string, title: string } }>, following: Array<{ __typename?: 'Follow', followed_by_id: string }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, handle_name: string, email: string, role: UserRole, user_files: Array<{ __typename?: 'UserFiles', file_path: string }> } };

export type GetFollowingQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFollowingQuery = { __typename?: 'Query', getFollowingUser: Array<{ __typename?: 'User', handle_name: string, introduction: string, user_files: Array<{ __typename?: 'UserFiles', file_path: string }> }> };

export type GetFollowedByQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFollowedByQuery = { __typename?: 'Query', getFollowedByUser: Array<{ __typename?: 'User', handle_name: string, introduction: string, user_files: Array<{ __typename?: 'UserFiles', file_path: string }> }> };

export type AdminUsersListQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type AdminUsersListQuery = { __typename?: 'Query', adminUsersList: { __typename?: 'AdminUsersListResponse', totalCount: number, hasNextPage: boolean, hasPreviousPage: boolean, users: Array<{ __typename?: 'User', id: string, handle_name: string, name: string, name_kana?: string | null, email: string, phone_number?: string | null, address: string, introduction: string, birthday?: any | null, role: UserRole, created_at: any, updated_at: any }> } };

export type AdminUserDetailQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AdminUserDetailQuery = { __typename?: 'Query', adminUserDetail: { __typename?: 'User', id: string, handle_name: string, name: string, name_kana?: string | null, email: string, phone_number?: string | null, address: string, introduction: string, birthday?: any | null, role: UserRole, created_at: any, updated_at: any, user_files: Array<{ __typename?: 'UserFiles', purpose_id: string, file_path: string }>, artworks: Array<{ __typename?: 'Artwork', slug_id: string, title: string, created_at: any }>, comments: Array<{ __typename?: 'Comment', body: string, created_at: any, artwork: { __typename?: 'Artwork', slug_id: string, title: string } }> } };


export const SyncArticleFromMicroCmsDocument = gql`
    mutation SyncArticleFromMicroCMS($microCmsId: String!) {
  syncArticleFromMicroCMS(microCmsId: $microCmsId) {
    __typename
    ... on MutationSyncArticleFromMicroCMSSuccess {
      __typename
      data {
        id
        slugId
        title
        content
        excerpt
        status
        publishedAt
        microCmsId
        tags
        featuredImage
        createdAt
        updatedAt
        author {
          id
          name
          handleName: handle_name
        }
      }
    }
    ... on ZodError {
      __typename
      message
      fieldErrors {
        message
      }
    }
    ... on CsrfError {
      __typename
      message
    }
  }
}
    `;

export function useSyncArticleFromMicroCmsMutation() {
  return Urql.useMutation<SyncArticleFromMicroCmsMutation, SyncArticleFromMicroCmsMutationVariables>(SyncArticleFromMicroCmsDocument);
};
export const CreateArticleDocument = gql`
    mutation CreateArticle($input: ArticleInput!, $syncToMicroCMS: Boolean) {
  createArticle(input: $input, syncToMicroCMS: $syncToMicroCMS) {
    __typename
    ... on MutationCreateArticleSuccess {
      __typename
      data {
        id
        slugId
        title
        content
        excerpt
        status
        publishedAt
        microCmsId
        tags
        featuredImage
        createdAt
        updatedAt
        author {
          id
          name
          handleName: handle_name
        }
      }
    }
    ... on ZodError {
      __typename
      message
      fieldErrors {
        message
      }
    }
    ... on CsrfError {
      __typename
      message
    }
  }
}
    `;

export function useCreateArticleMutation() {
  return Urql.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CreateArticleDocument);
};
export const UpdateArticleDocument = gql`
    mutation UpdateArticle($id: Int!, $input: ArticleInput!, $syncToMicroCMS: Boolean) {
  updateArticle(id: $id, input: $input, syncToMicroCMS: $syncToMicroCMS) {
    __typename
    ... on MutationUpdateArticleSuccess {
      __typename
      data {
        id
        slugId
        title
        content
        excerpt
        status
        publishedAt
        microCmsId
        tags
        featuredImage
        createdAt
        updatedAt
        author {
          id
          name
          handleName: handle_name
        }
      }
    }
    ... on ZodError {
      __typename
      message
      fieldErrors {
        message
      }
    }
    ... on CsrfError {
      __typename
      message
    }
  }
}
    `;

export function useUpdateArticleMutation() {
  return Urql.useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(UpdateArticleDocument);
};
export const DeleteArticleDocument = gql`
    mutation DeleteArticle($id: Int!, $deleteFromMicroCMS: Boolean) {
  deleteArticle(id: $id, deleteFromMicroCMS: $deleteFromMicroCMS) {
    __typename
    ... on MutationDeleteArticleSuccess {
      __typename
      data
    }
    ... on ZodError {
      __typename
      message
      fieldErrors {
        message
      }
    }
    ... on CsrfError {
      __typename
      message
    }
  }
}
    `;

export function useDeleteArticleMutation() {
  return Urql.useMutation<DeleteArticleMutation, DeleteArticleMutationVariables>(DeleteArticleDocument);
};
export const PublishArticleNowDocument = gql`
    mutation PublishArticleNow($id: Int!, $syncToMicroCMS: Boolean) {
  publishArticleNow(id: $id, syncToMicroCMS: $syncToMicroCMS) {
    __typename
    ... on MutationPublishArticleNowSuccess {
      __typename
      data {
        id
        slugId
        title
        status
        publishedAt
        updatedAt
      }
    }
    ... on ZodError {
      __typename
      message
      fieldErrors {
        message
      }
    }
    ... on CsrfError {
      __typename
      message
    }
  }
}
    `;

export function usePublishArticleNowMutation() {
  return Urql.useMutation<PublishArticleNowMutation, PublishArticleNowMutationVariables>(PublishArticleNowDocument);
};
export const UpsertArtworkDocument = gql`
    mutation UpsertArtwork($title: String!, $feature: String!, $artwork_slug_id: String, $current_image_url: String, $image_url: String, $content_type: String, $is_image_deleted: Boolean) {
  upsertArtwork(
    feature: $feature
    title: $title
    artwork_slug_id: $artwork_slug_id
    current_image_url: $current_image_url
    image_url: $image_url
    content_type: $content_type
    is_image_deleted: $is_image_deleted
  ) {
    __typename
    ... on MutationUpsertArtworkSuccess {
      __typename
    }
    ... on ZodError {
      __typename
      message
    }
  }
}
    `;

export function useUpsertArtworkMutation() {
  return Urql.useMutation<UpsertArtworkMutation, UpsertArtworkMutationVariables>(UpsertArtworkDocument);
};
export const RemoveArtworkDocument = gql`
    mutation RemoveArtwork($artwork_id: String!) {
  removeArtwork(artwork_id: $artwork_id) {
    __typename
  }
}
    `;

export function useRemoveArtworkMutation() {
  return Urql.useMutation<RemoveArtworkMutation, RemoveArtworkMutationVariables>(RemoveArtworkDocument);
};
export const AddArtworkRankDocument = gql`
    mutation AddArtworkRank($artwork_id: String!, $rank_id: String!) {
  addArtworkRank(artwork_id: $artwork_id, rank_id: $rank_id) {
    __typename
  }
}
    `;

export function useAddArtworkRankMutation() {
  return Urql.useMutation<AddArtworkRankMutation, AddArtworkRankMutationVariables>(AddArtworkRankDocument);
};
export const RemoveArtworkRankDocument = gql`
    mutation RemoveArtworkRank($artwork_id: String!, $rank_id: String!) {
  removeArtworkRank(artwork_id: $artwork_id, rank_id: $rank_id) {
    __typename
  }
}
    `;

export function useRemoveArtworkRankMutation() {
  return Urql.useMutation<RemoveArtworkRankMutation, RemoveArtworkRankMutationVariables>(RemoveArtworkRankDocument);
};
export const UpsertCommentDocument = gql`
    mutation UpsertComment($body: String!, $artwork_id: String!, $comment_slug_id: String) {
  upsertComment(
    body: $body
    artwork_id: $artwork_id
    comment_slug_id: $comment_slug_id
  ) {
    __typename
    ... on MutationUpsertCommentSuccess {
      __typename
    }
    ... on ZodError {
      __typename
      message
    }
  }
}
    `;

export function useUpsertCommentMutation() {
  return Urql.useMutation<UpsertCommentMutation, UpsertCommentMutationVariables>(UpsertCommentDocument);
};
export const RemoveCommentDocument = gql`
    mutation RemoveComment($comment_slug_id: String!) {
  removeComment(comment_slug_id: $comment_slug_id) {
    __typename
  }
}
    `;

export function useRemoveCommentMutation() {
  return Urql.useMutation<RemoveCommentMutation, RemoveCommentMutationVariables>(RemoveCommentDocument);
};
export const AddCommentRankDocument = gql`
    mutation AddCommentRank($comment_slug_id: String!, $rank_id: String!) {
  addCommentRank(comment_slug_id: $comment_slug_id, rank_id: $rank_id)
}
    `;

export function useAddCommentRankMutation() {
  return Urql.useMutation<AddCommentRankMutation, AddCommentRankMutationVariables>(AddCommentRankDocument);
};
export const MarkNotificationAsReadDocument = gql`
    mutation MarkNotificationAsRead($slug_id: String!) {
  markNotificationAsRead(slug_id: $slug_id) {
    id
    slug_id
    is_read
    updated_at
  }
}
    `;

export function useMarkNotificationAsReadMutation() {
  return Urql.useMutation<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>(MarkNotificationAsReadDocument);
};
export const MarkAllNotificationsAsReadDocument = gql`
    mutation MarkAllNotificationsAsRead {
  markAllNotificationsAsRead
}
    `;

export function useMarkAllNotificationsAsReadMutation() {
  return Urql.useMutation<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>(MarkAllNotificationsAsReadDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ... on MutationLoginSuccess {
      __typename
      data {
        accessToken
      }
    }
    ... on ZodError {
      __typename
      message
      fieldErrors {
        message
      }
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const UpdateMyProfileDocument = gql`
    mutation UpdateMyProfile($name: String, $name_kana: String, $birthday: String, $introduction: String, $phone_number: String, $address: String, $bg: ImageInput, $icon: ImageInput) {
  updateMyProfile(
    name: $name
    name_kana: $name_kana
    birthday: $birthday
    introduction: $introduction
    phone_number: $phone_number
    address: $address
    bg: $bg
    icon: $icon
  ) {
    ... on MutationUpdateMyProfileSuccess {
      __typename
    }
    ... on ZodError {
      __typename
      message
      fieldErrors {
        message
      }
    }
  }
}
    `;

export function useUpdateMyProfileMutation() {
  return Urql.useMutation<UpdateMyProfileMutation, UpdateMyProfileMutationVariables>(UpdateMyProfileDocument);
};
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($password: String!, $passwordConfirmation: String!) {
  updatePassword(password: $password, passwordConfirmation: $passwordConfirmation) {
    ... on MutationUpdatePasswordSuccess {
      __typename
    }
    ... on ZodError {
      __typename
      message
      fieldErrors {
        message
      }
    }
  }
}
    `;

export function useUpdatePasswordMutation() {
  return Urql.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const LogoutAllDocument = gql`
    mutation LogoutAll {
  logoutAll
}
    `;

export function useLogoutAllMutation() {
  return Urql.useMutation<LogoutAllMutation, LogoutAllMutationVariables>(LogoutAllDocument);
};
export const FollowOrUnfollowDocument = gql`
    mutation followOrUnfollow($following_id: String!, $mode: String!) {
  followOrUnfollow(following_id: $following_id, mode: $mode) {
    __typename
  }
}
    `;

export function useFollowOrUnfollowMutation() {
  return Urql.useMutation<FollowOrUnfollowMutation, FollowOrUnfollowMutationVariables>(FollowOrUnfollowDocument);
};
export const AddUserRankDocument = gql`
    mutation AddUserRank($user_id: String!, $rank_id: String!) {
  addUserRank(user_id: $user_id, rank_id: $rank_id) {
    __typename
  }
}
    `;

export function useAddUserRankMutation() {
  return Urql.useMutation<AddUserRankMutation, AddUserRankMutationVariables>(AddUserRankDocument);
};
export const AdminCreateUserDocument = gql`
    mutation AdminCreateUser($handle_name: String!, $name: String!, $name_kana: String, $email: String!, $password: String!, $phone_number: String, $address: String, $introduction: String, $birthday: String) {
  adminCreateUser(
    handle_name: $handle_name
    name: $name
    name_kana: $name_kana
    email: $email
    password: $password
    phone_number: $phone_number
    address: $address
    introduction: $introduction
    birthday: $birthday
  ) {
    ... on MutationAdminCreateUserSuccess {
      __typename
      data {
        id
        handle_name
        name
        email
      }
    }
    ... on ZodError {
      __typename
      message
      fieldErrors {
        message
      }
    }
  }
}
    `;

export function useAdminCreateUserMutation() {
  return Urql.useMutation<AdminCreateUserMutation, AdminCreateUserMutationVariables>(AdminCreateUserDocument);
};
export const AdminUpdateUserDocument = gql`
    mutation AdminUpdateUser($id: String!, $handle_name: String, $name: String, $name_kana: String, $email: String, $phone_number: String, $address: String, $introduction: String, $birthday: String) {
  adminUpdateUser(
    id: $id
    handle_name: $handle_name
    name: $name
    name_kana: $name_kana
    email: $email
    phone_number: $phone_number
    address: $address
    introduction: $introduction
    birthday: $birthday
  ) {
    ... on MutationAdminUpdateUserSuccess {
      __typename
      data {
        id
        handle_name
        name
        email
      }
    }
    ... on ZodError {
      __typename
      message
      fieldErrors {
        message
      }
    }
  }
}
    `;

export function useAdminUpdateUserMutation() {
  return Urql.useMutation<AdminUpdateUserMutation, AdminUpdateUserMutationVariables>(AdminUpdateUserDocument);
};
export const AdminDeleteUserDocument = gql`
    mutation AdminDeleteUser($id: String!) {
  adminDeleteUser(id: $id) {
    ... on MutationAdminDeleteUserSuccess {
      __typename
      data
    }
    ... on ZodError {
      __typename
      message
      fieldErrors {
        message
      }
    }
  }
}
    `;

export function useAdminDeleteUserMutation() {
  return Urql.useMutation<AdminDeleteUserMutation, AdminDeleteUserMutationVariables>(AdminDeleteUserDocument);
};
export const RequestPasswordResetDocument = gql`
    mutation RequestPasswordReset($emailOrHandle: String!) {
  requestPasswordReset(emailOrHandle: $emailOrHandle) {
    ... on MutationRequestPasswordResetSuccess {
      __typename
      success
      token
    }
    ... on ZodError {
      __typename
      message
      fieldErrors {
        message
      }
    }
  }
}
    `;

export function useRequestPasswordResetMutation() {
  return Urql.useMutation<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>(RequestPasswordResetDocument);
};
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $password: String!, $passwordConfirmation: String!) {
  resetPassword(
    token: $token
    password: $password
    passwordConfirmation: $passwordConfirmation
  ) {
    ... on MutationResetPasswordSuccess {
      __typename
      data
    }
    ... on ZodError {
      __typename
      message
      fieldErrors {
        message
      }
    }
  }
}
    `;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};
export const IssueCsrfTokenDocument = gql`
    mutation IssueCsrfToken {
  issueCsrfToken
}
    `;

export function useIssueCsrfTokenMutation() {
  return Urql.useMutation<IssueCsrfTokenMutation, IssueCsrfTokenMutationVariables>(IssueCsrfTokenDocument);
};
export const GetArticlesDocument = gql`
    query GetArticles($first: Int, $after: String, $filter: ArticleFilter, $source: String) {
  articles(first: $first, after: $after, filter: $filter, source: $source) {
    edges {
      node {
        id
        slugId
        title
        excerpt
        status
        publishedAt
        tags
        featuredImage
        createdAt
        updatedAt
        author {
          id
          name
          handleName: handle_name
        }
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
  }
}
    `;

export function useGetArticlesQuery(options?: Omit<Urql.UseQueryArgs<GetArticlesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetArticlesQuery, GetArticlesQueryVariables>({ query: GetArticlesDocument, ...options });
};
export const GetPublishedArticlesDocument = gql`
    query GetPublishedArticles($first: Int, $after: String, $tags: [String!], $search: String) {
  publishedArticles(first: $first, after: $after, tags: $tags, search: $search) {
    edges {
      node {
        id
        slugId
        title
        excerpt
        tags
        featuredImage
        publishedAt
        createdAt
        author {
          id
          name
          handleName: handle_name
        }
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
  }
}
    `;

export function useGetPublishedArticlesQuery(options?: Omit<Urql.UseQueryArgs<GetPublishedArticlesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPublishedArticlesQuery, GetPublishedArticlesQueryVariables>({ query: GetPublishedArticlesDocument, ...options });
};
export const GetArticleDocument = gql`
    query GetArticle($id: Int, $slugId: String, $microCmsId: String) {
  article(id: $id, slugId: $slugId, microCmsId: $microCmsId) {
    id
    slugId
    title
    content
    excerpt
    status
    publishedAt
    microCmsId
    tags
    featuredImage
    createdAt
    updatedAt
    author {
      id
      name
      handleName: handle_name
      introduction
    }
  }
}
    `;

export function useGetArticleQuery(options?: Omit<Urql.UseQueryArgs<GetArticleQueryVariables>, 'query'>) {
  return Urql.useQuery<GetArticleQuery, GetArticleQueryVariables>({ query: GetArticleDocument, ...options });
};
export const GetArticleTagsDocument = gql`
    query GetArticleTags {
  articleTags
}
    `;

export function useGetArticleTagsQuery(options?: Omit<Urql.UseQueryArgs<GetArticleTagsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetArticleTagsQuery, GetArticleTagsQueryVariables>({ query: GetArticleTagsDocument, ...options });
};
export const ArtworksDocument = gql`
    query Artworks($q: String, $offset: Int, $limit: Int) {
  artworks(q: $q, offset: $offset, limit: $limit) {
    id
    title
    slug_id
    feature
    created_at
    favoritesCount
    bookmarksCount
    isFavoritedByMe
    isBookmarkedByMe
    user {
      id
      handle_name
      user_files {
        file_path
      }
    }
    artwork_file {
      file_path
    }
  }
}
    `;

export function useArtworksQuery(options?: Omit<Urql.UseQueryArgs<ArtworksQueryVariables>, 'query'>) {
  return Urql.useQuery<ArtworksQuery, ArtworksQueryVariables>({ query: ArtworksDocument, ...options });
};
export const ArtworksCountDocument = gql`
    query ArtworksCount($q: String) {
  artworksCount(q: $q)
}
    `;

export function useArtworksCountQuery(options?: Omit<Urql.UseQueryArgs<ArtworksCountQueryVariables>, 'query'>) {
  return Urql.useQuery<ArtworksCountQuery, ArtworksCountQueryVariables>({ query: ArtworksCountDocument, ...options });
};
export const GetAuthArtworkRanksDocument = gql`
    query getAuthArtworkRanks($artwork_id: String) {
  getAuthArtworkRanks(artwork_id: $artwork_id) {
    id
    artwork_id
    user_id
    rank_id
  }
}
    `;

export function useGetAuthArtworkRanksQuery(options?: Omit<Urql.UseQueryArgs<GetAuthArtworkRanksQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAuthArtworkRanksQuery, GetAuthArtworkRanksQueryVariables>({ query: GetAuthArtworkRanksDocument, ...options });
};
export const ArtworkDocument = gql`
    query Artwork($slug_id: String!) {
  artwork(slug_id: $slug_id) {
    id
    slug_id
    title
    likes
    bads
    feature
    deleted
    created_at
    favoritesCount
    bookmarksCount
    isFavoritedByMe
    isBookmarkedByMe
    user {
      id
      handle_name
      user_files {
        file_path
      }
    }
    artwork_file {
      file_path
    }
    comments {
      body
      created_at
      user {
        id
        handle_name
        user_files {
          file_path
        }
      }
    }
  }
}
    `;

export function useArtworkQuery(options: Omit<Urql.UseQueryArgs<ArtworkQueryVariables>, 'query'>) {
  return Urql.useQuery<ArtworkQuery, ArtworkQueryVariables>({ query: ArtworkDocument, ...options });
};
export const GetArtworkRanksDocument = gql`
    query getArtworkRanks($artwork_id: String!) {
  getArtworkRanks(artwork_id: $artwork_id) {
    id
    rank_id
  }
}
    `;

export function useGetArtworkRanksQuery(options: Omit<Urql.UseQueryArgs<GetArtworkRanksQueryVariables>, 'query'>) {
  return Urql.useQuery<GetArtworkRanksQuery, GetArtworkRanksQueryVariables>({ query: GetArtworkRanksDocument, ...options });
};
export const GetReportReasonsDocument = gql`
    query GetReportReasons {
  getReportReasons {
    id
    name
    rank_type_id
  }
}
    `;

export function useGetReportReasonsQuery(options?: Omit<Urql.UseQueryArgs<GetReportReasonsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetReportReasonsQuery, GetReportReasonsQueryVariables>({ query: GetReportReasonsDocument, ...options });
};
export const GetArtworkCommentsDocument = gql`
    query getArtworkComments($artwork_id: String!) {
  getArtworkComments(artwork_id: $artwork_id) {
    id
    body
    artwork_id
    slug_id
    created_at
    user {
      id
      handle_name
      user_files {
        file_path
      }
    }
  }
}
    `;

export function useGetArtworkCommentsQuery(options: Omit<Urql.UseQueryArgs<GetArtworkCommentsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetArtworkCommentsQuery, GetArtworkCommentsQueryVariables>({ query: GetArtworkCommentsDocument, ...options });
};
export const GetNotificationsDocument = gql`
    query GetNotifications($limit: Int, $offset: Int, $onlyUnread: Boolean) {
  notifications(limit: $limit, offset: $offset, onlyUnread: $onlyUnread) {
    id
    slug_id
    type
    title
    message
    is_read
    created_at
    actor {
      id
      name
      handle_name
    }
    artwork {
      id
      slug_id
      title
    }
    comment {
      id
      slug_id
      body
    }
  }
}
    `;

export function useGetNotificationsQuery(options?: Omit<Urql.UseQueryArgs<GetNotificationsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>({ query: GetNotificationsDocument, ...options });
};
export const GetNotificationDocument = gql`
    query GetNotification($slug_id: String!) {
  notification(slug_id: $slug_id) {
    id
    slug_id
    type
    title
    message
    is_read
    created_at
    actor {
      id
      name
      handle_name
    }
    artwork {
      id
      slug_id
      title
      user {
        name
        handle_name
      }
    }
    comment {
      id
      slug_id
      body
      artwork {
        title
      }
    }
  }
}
    `;

export function useGetNotificationQuery(options: Omit<Urql.UseQueryArgs<GetNotificationQueryVariables>, 'query'>) {
  return Urql.useQuery<GetNotificationQuery, GetNotificationQueryVariables>({ query: GetNotificationDocument, ...options });
};
export const GetUnreadNotificationsCountDocument = gql`
    query GetUnreadNotificationsCount {
  unreadNotificationsCount
}
    `;

export function useGetUnreadNotificationsCountQuery(options?: Omit<Urql.UseQueryArgs<GetUnreadNotificationsCountQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUnreadNotificationsCountQuery, GetUnreadNotificationsCountQueryVariables>({ query: GetUnreadNotificationsCountDocument, ...options });
};
export const UserProfileDocument = gql`
    query UserProfile($handle_name: String!) {
  UserProfile(handle_name: $handle_name) {
    id
    name
    name_kana
    handle_name
    introduction
    birthday
    phone_number
    address
    email
    created_at
    user_files {
      purpose_id
      file_path
    }
    artworks {
      slug_id
      title
      likes
      bads
      created_at
      artwork_file {
        file_path
      }
    }
    comments {
      body
      created_at
      artwork {
        slug_id
        title
      }
    }
    following {
      followed_by_id
    }
  }
}
    `;

export function useUserProfileQuery(options: Omit<Urql.UseQueryArgs<UserProfileQueryVariables>, 'query'>) {
  return Urql.useQuery<UserProfileQuery, UserProfileQueryVariables>({ query: UserProfileDocument, ...options });
};
export const DashboardDocument = gql`
    query Dashboard($handle_name: String!) {
  UserProfile(handle_name: $handle_name) {
    name
    artworks {
      slug_id
      title
      favoritesCount
      created_at
      artwork_file {
        file_path
      }
    }
    comments {
      body
      created_at
      artwork {
        slug_id
        title
      }
    }
    following {
      followed_by_id
    }
  }
  getMyTotalFavorites
  getMyTotalBookmarks
  getMyFavoritesGiven
  getMyBookmarksGiven
}
    `;

export function useDashboardQuery(options: Omit<Urql.UseQueryArgs<DashboardQueryVariables>, 'query'>) {
  return Urql.useQuery<DashboardQuery, DashboardQueryVariables>({ query: DashboardDocument, ...options });
};
export const MeDocument = gql`
    query me {
  me {
    id
    handle_name
    email
    role
    user_files {
      file_path
    }
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const GetFollowingDocument = gql`
    query getFollowing {
  getFollowingUser {
    handle_name
    introduction
    user_files {
      file_path
    }
  }
}
    `;

export function useGetFollowingQuery(options?: Omit<Urql.UseQueryArgs<GetFollowingQueryVariables>, 'query'>) {
  return Urql.useQuery<GetFollowingQuery, GetFollowingQueryVariables>({ query: GetFollowingDocument, ...options });
};
export const GetFollowedByDocument = gql`
    query getFollowedBy {
  getFollowedByUser {
    handle_name
    introduction
    user_files {
      file_path
    }
  }
}
    `;

export function useGetFollowedByQuery(options?: Omit<Urql.UseQueryArgs<GetFollowedByQueryVariables>, 'query'>) {
  return Urql.useQuery<GetFollowedByQuery, GetFollowedByQueryVariables>({ query: GetFollowedByDocument, ...options });
};
export const AdminUsersListDocument = gql`
    query AdminUsersList($page: Int, $limit: Int, $search: String) {
  adminUsersList(page: $page, limit: $limit, search: $search) {
    users {
      id
      handle_name
      name
      name_kana
      email
      phone_number
      address
      introduction
      birthday
      role
      created_at
      updated_at
    }
    totalCount
    hasNextPage
    hasPreviousPage
  }
}
    `;

export function useAdminUsersListQuery(options?: Omit<Urql.UseQueryArgs<AdminUsersListQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminUsersListQuery, AdminUsersListQueryVariables>({ query: AdminUsersListDocument, ...options });
};
export const AdminUserDetailDocument = gql`
    query AdminUserDetail($id: String!) {
  adminUserDetail(id: $id) {
    id
    handle_name
    name
    name_kana
    email
    phone_number
    address
    introduction
    birthday
    role
    created_at
    updated_at
    user_files {
      purpose_id
      file_path
    }
    artworks {
      slug_id
      title
      created_at
    }
    comments {
      body
      created_at
      artwork {
        slug_id
        title
      }
    }
  }
}
    `;

export function useAdminUserDetailQuery(options: Omit<Urql.UseQueryArgs<AdminUserDetailQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminUserDetailQuery, AdminUserDetailQueryVariables>({ query: AdminUserDetailDocument, ...options });
};