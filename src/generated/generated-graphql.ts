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

export type Artwork = {
  __typename?: 'Artwork';
  artwork_ranks: Array<ArtworkRanks>;
  bads: Scalars['Int']['output'];
  comments: Array<Comment>;
  created_at: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  feature: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  likes: Scalars['Int']['output'];
  slug_id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  user: User;
  user_id: Scalars['ID']['output'];
};

export type ArtworkRanks = {
  __typename?: 'ArtworkRanks';
  artwork_id: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  rank_id: Scalars['ID']['output'];
  user_id: Scalars['ID']['output'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  accessToken: Scalars['String']['output'];
  expires_at: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  refreshToken: Scalars['String']['output'];
  user: User;
};

export type Comment = {
  __typename?: 'Comment';
  artwork: Artwork;
  body: Scalars['String']['output'];
  created_at: Scalars['Date']['output'];
  user: User;
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

export type Mutation = {
  __typename?: 'Mutation';
  addArtworkRank: ArtworkRanks;
  followOrUnfollow: Follow;
  login: MutationLoginResult;
  logout: Scalars['Boolean']['output'];
  refresh: MutationRefreshResult;
  removeArtwork: Artwork;
  removeArtworkRank: ArtworkRanks;
  upsertArtwork: MutationUpsertArtworkResult;
};


export type MutationAddArtworkRankArgs = {
  artwork_id: Scalars['String']['input'];
  rank_id: Scalars['String']['input'];
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


export type MutationUpsertArtworkArgs = {
  artwork_slug_id?: InputMaybe<Scalars['String']['input']>;
  feature: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type MutationLoginResult = MutationLoginSuccess | ZodError;

export type MutationLoginSuccess = {
  __typename?: 'MutationLoginSuccess';
  data: AuthPayload;
};

export type MutationRefreshResult = MutationRefreshSuccess | ZodError;

export type MutationRefreshSuccess = {
  __typename?: 'MutationRefreshSuccess';
  data: AuthPayload;
};

export type MutationUpsertArtworkResult = MutationUpsertArtworkSuccess | ZodError;

export type MutationUpsertArtworkSuccess = {
  __typename?: 'MutationUpsertArtworkSuccess';
  data: Artwork;
};

export type Query = {
  __typename?: 'Query';
  artwork: Artwork;
  artworks: Array<Artwork>;
  getArtworkRanks: Array<ArtworkRanks>;
  getAuthArtworkRanks: Array<ArtworkRanks>;
  me: User;
  user: User;
};


export type QueryArtworkArgs = {
  slug_id: Scalars['String']['input'];
};


export type QueryGetArtworkRanksArgs = {
  artwork_id: Scalars['String']['input'];
};


export type QueryGetAuthArtworkRanksArgs = {
  artwork_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  handle_name: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  address: Scalars['String']['output'];
  artworks: Array<Artwork>;
  comments: Array<Comment>;
  created_at: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  following: Array<Follow>;
  handle_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  introduction: Scalars['String']['output'];
  name: Scalars['String']['output'];
  name_kana?: Maybe<Scalars['String']['output']>;
  slug_id: Scalars['String']['output'];
};

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

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename: 'MutationLoginSuccess', data: { __typename?: 'AuthPayload', accessToken: string, refreshToken: string } } | { __typename: 'ZodError', message: string, fieldErrors: Array<{ __typename?: 'ZodFieldError', message: string }> } };

export type RefreshMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshMutation = { __typename?: 'Mutation', refresh: { __typename: 'MutationRefreshSuccess', data: { __typename?: 'AuthPayload', accessToken: string, refreshToken: string } } | { __typename: 'ZodError', message: string, fieldErrors: Array<{ __typename?: 'ZodFieldError', message: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type FollowOrUnfollowMutationVariables = Exact<{
  following_id: Scalars['String']['input'];
  mode: Scalars['String']['input'];
}>;


export type FollowOrUnfollowMutation = { __typename?: 'Mutation', followOrUnfollow: { __typename: 'Follow' } };

export type ArtworksQueryVariables = Exact<{ [key: string]: never; }>;


export type ArtworksQuery = { __typename?: 'Query', artworks: Array<{ __typename?: 'Artwork', id: string, title: string, slug_id: string, feature: string, created_at: any, user: { __typename?: 'User', handle_name: string } }> };

export type GetAuthArtworkRanksQueryVariables = Exact<{
  artwork_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAuthArtworkRanksQuery = { __typename?: 'Query', getAuthArtworkRanks: Array<{ __typename?: 'ArtworkRanks', id: string, artwork_id: string, user_id: string, rank_id: string }> };

export type ArtworkQueryVariables = Exact<{
  slug_id: Scalars['String']['input'];
}>;


export type ArtworkQuery = { __typename?: 'Query', artwork: { __typename?: 'Artwork', id: string, slug_id: string, title: string, likes: number, bads: number, feature: string, deleted: boolean, created_at: any, user: { __typename?: 'User', handle_name: string }, comments: Array<{ __typename?: 'Comment', body: string, created_at: any, user: { __typename?: 'User', handle_name: string } }> } };

export type GetArtworkRanksQueryVariables = Exact<{
  artwork_id: Scalars['String']['input'];
}>;


export type GetArtworkRanksQuery = { __typename?: 'Query', getArtworkRanks: Array<{ __typename?: 'ArtworkRanks', id: string, rank_id: string }> };

export type UserQueryVariables = Exact<{
  handle_name: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, name_kana?: string | null, handle_name: string, introduction: string, address: string, email: string, created_at: any, artworks: Array<{ __typename?: 'Artwork', slug_id: string, title: string, likes: number, bads: number, created_at: any }>, comments: Array<{ __typename?: 'Comment', body: string, created_at: any, artwork: { __typename?: 'Artwork', slug_id: string, title: string } }>, following: Array<{ __typename?: 'Follow', followed_by_id: string }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, handle_name: string } };


export const UpsertArtworkDocument = gql`
    mutation UpsertArtwork($title: String!, $feature: String!, $artwork_slug_id: String) {
  upsertArtwork(
    feature: $feature
    title: $title
    artwork_slug_id: $artwork_slug_id
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
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ... on MutationLoginSuccess {
      __typename
      data {
        accessToken
        refreshToken
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
export const RefreshDocument = gql`
    mutation Refresh {
  refresh {
    ... on MutationRefreshSuccess {
      __typename
      data {
        accessToken
        refreshToken
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

export function useRefreshMutation() {
  return Urql.useMutation<RefreshMutation, RefreshMutationVariables>(RefreshDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
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
export const ArtworksDocument = gql`
    query Artworks {
  artworks {
    id
    title
    slug_id
    feature
    created_at
    user {
      handle_name
    }
  }
}
    `;

export function useArtworksQuery(options?: Omit<Urql.UseQueryArgs<ArtworksQueryVariables>, 'query'>) {
  return Urql.useQuery<ArtworksQuery, ArtworksQueryVariables>({ query: ArtworksDocument, ...options });
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
    user {
      handle_name
    }
    comments {
      body
      created_at
      user {
        handle_name
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
export const UserDocument = gql`
    query User($handle_name: String!) {
  user(handle_name: $handle_name) {
    id
    name
    name_kana
    handle_name
    introduction
    address
    email
    created_at
    artworks {
      slug_id
      title
      likes
      bads
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
    following {
      followed_by_id
    }
  }
}
    `;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery, UserQueryVariables>({ query: UserDocument, ...options });
};
export const MeDocument = gql`
    query me {
  me {
    id
    handle_name
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};