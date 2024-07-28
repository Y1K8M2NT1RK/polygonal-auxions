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
  bads: Scalars['Int']['output'];
  comments: Array<Comment>;
  created_at: Scalars['Date']['output'];
  feature: Scalars['String']['output'];
  likes: Scalars['Int']['output'];
  slug_id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  user: User;
  user_id: Scalars['ID']['output'];
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

export type Mutation = {
  __typename?: 'Mutation';
  addArtwork: MutationAddArtworkResult;
  validateUser: MutationValidateUserResult;
};


export type MutationAddArtworkArgs = {
  feature: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationValidateUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationAddArtworkResult = MutationAddArtworkSuccess | ZodError;

export type MutationAddArtworkSuccess = {
  __typename?: 'MutationAddArtworkSuccess';
  data: Artwork;
};

export type MutationValidateUserResult = MutationValidateUserSuccess | ZodError;

export type MutationValidateUserSuccess = {
  __typename?: 'MutationValidateUserSuccess';
  data: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  artwork: Artwork;
  artworks: Array<Artwork>;
  user: User;
};


export type QueryArtworkArgs = {
  slug_id: Scalars['String']['input'];
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
  handle_name: Scalars['String']['output'];
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

export type AddArtworkMutationVariables = Exact<{
  title: Scalars['String']['input'];
  feature: Scalars['String']['input'];
}>;


export type AddArtworkMutation = { __typename?: 'Mutation', addArtwork: { __typename: 'MutationAddArtworkSuccess' } | { __typename: 'ZodError', message: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', validateUser: { __typename: 'MutationValidateUserSuccess' } | { __typename: 'ZodError', message: string, fieldErrors: Array<{ __typename?: 'ZodFieldError', message: string }> } };

export type ArtworksQueryVariables = Exact<{ [key: string]: never; }>;


export type ArtworksQuery = { __typename?: 'Query', artworks: Array<{ __typename?: 'Artwork', title: string, slug_id: string, feature: string, created_at: any, user: { __typename?: 'User', handle_name: string } }> };

export type ArtworkQueryVariables = Exact<{
  slug_id: Scalars['String']['input'];
}>;


export type ArtworkQuery = { __typename?: 'Query', artwork: { __typename?: 'Artwork', slug_id: string, title: string, likes: number, bads: number, feature: string, created_at: any, user: { __typename?: 'User', handle_name: string }, comments: Array<{ __typename?: 'Comment', body: string, created_at: any, user: { __typename?: 'User', handle_name: string } }> } };

export type UserQueryVariables = Exact<{
  handle_name: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', name: string, name_kana?: string | null, handle_name: string, introduction: string, address: string, email: string, created_at: any, artworks: Array<{ __typename?: 'Artwork', slug_id: string, title: string, likes: number, bads: number, created_at: any }>, comments: Array<{ __typename?: 'Comment', body: string, created_at: any, artwork: { __typename?: 'Artwork', slug_id: string, title: string } }> } };


export const AddArtworkDocument = gql`
    mutation AddArtwork($title: String!, $feature: String!) {
  addArtwork(feature: $feature, title: $title) {
    __typename
    ... on MutationAddArtworkSuccess {
      __typename
    }
    ... on ZodError {
      __typename
      message
    }
  }
}
    `;

export function useAddArtworkMutation() {
  return Urql.useMutation<AddArtworkMutation, AddArtworkMutationVariables>(AddArtworkDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  validateUser(email: $email, password: $password) {
    ... on MutationValidateUserSuccess {
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

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const ArtworksDocument = gql`
    query Artworks {
  artworks {
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
export const ArtworkDocument = gql`
    query Artwork($slug_id: String!) {
  artwork(slug_id: $slug_id) {
    slug_id
    title
    likes
    bads
    feature
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
export const UserDocument = gql`
    query User($handle_name: String!) {
  user(handle_name: $handle_name) {
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
  }
}
    `;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery, UserQueryVariables>({ query: UserDocument, ...options });
};