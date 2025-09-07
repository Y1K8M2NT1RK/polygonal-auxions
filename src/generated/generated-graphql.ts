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
};

export type AdminUsersListResponse = {
  __typename?: 'AdminUsersListResponse';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  totalCount: Scalars['Int']['output'];
  users: Array<User>;
};

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
  addUserRank: UserRanks;
  adminCreateUser: MutationAdminCreateUserResult;
  adminDeleteUser: MutationAdminDeleteUserResult;
  adminUpdateUser: MutationAdminUpdateUserResult;
  followOrUnfollow: Follow;
  issueCsrfToken: Scalars['Boolean']['output'];
  login: MutationLoginResult;
  logout: Scalars['Boolean']['output'];
  logoutAll: Scalars['Boolean']['output'];
  removeArtwork: Artwork;
  removeArtworkRank: ArtworkRanks;
  removeComment: Comment;
  requestPasswordReset: MutationRequestPasswordResetResult;
  resetPassword: MutationResetPasswordResult;
  sendEmailVerificationEmail: EmailSendResult;
  sendPasswordResetEmail: EmailSendResult;
  sendTestEmail: EmailSendResult;
  sendWelcomeEmail: EmailSendResult;
  updateMyProfile: MutationUpdateMyProfileResult;
  updatePassword: MutationUpdatePasswordResult;
  upsertArtwork: MutationUpsertArtworkResult;
  upsertComment: MutationUpsertCommentResult;
};


export type MutationAddArtworkRankArgs = {
  artwork_id: Scalars['String']['input'];
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


export type MutationFollowOrUnfollowArgs = {
  following_id: Scalars['String']['input'];
  mode: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
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

export type MutationLoginResult = CsrfError | MutationLoginSuccess | ZodError;

export type MutationLoginSuccess = {
  __typename?: 'MutationLoginSuccess';
  data: AuthPayload;
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

export type Query = {
  __typename?: 'Query';
  UserProfile: User;
  adminUserDetail: User;
  adminUsersList: AdminUsersListResponse;
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


export type GetArtworkCommentsQuery = { __typename?: 'Query', getArtworkComments: Array<{ __typename?: 'Comment', body: string, artwork_id: string, slug_id: string, created_at: any, user: { __typename?: 'User', id: string, handle_name: string, user_files: Array<{ __typename?: 'UserFiles', file_path: string }> } }> };

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