import { gql } from 'urql';

// GraphQL queries and mutations for reporting
export const GET_REPORT_REASONS = gql`
  query GetReportReasons {
    getReportReasons {
      id
      name
      rank_type_id
    }
  }
`;

export const ADD_ARTWORK_RANK = gql`
  mutation AddArtworkRank($artwork_id: String!, $rank_id: String!) {
    addArtworkRank(artwork_id: $artwork_id, rank_id: $rank_id) {
      __typename
    }
  }
`;

// Types for the report functionality
export type ReportReason = {
  id: string;
  name: string;
  rank_type_id: string;
};

export type GetReportReasonsQuery = {
  getReportReasons: ReportReason[];
};

export type AddArtworkRankMutation = {
  addArtworkRank: {
    __typename: string;
  };
};

export type AddArtworkRankMutationVariables = {
  artwork_id: string;
  rank_id: string;
};