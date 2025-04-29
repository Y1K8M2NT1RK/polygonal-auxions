/* eslint-disable */
import type { Prisma, User, AuthPayload, Follow, Artwork, ArtworkFile, ArtworkGizmo, Comment, ArtworkRanks, Ranks, RankTypes } from "../../../../prisma/generated/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "auth_payload" | "artworks" | "artwork_ranks" | "comments" | "followed_by" | "following";
        ListRelations: "artworks" | "artwork_ranks" | "comments" | "followed_by" | "following";
        Relations: {
            auth_payload: {
                Shape: AuthPayload | null;
                Name: "AuthPayload";
                Nullable: true;
            };
            artworks: {
                Shape: Artwork[];
                Name: "Artwork";
                Nullable: false;
            };
            artwork_ranks: {
                Shape: ArtworkRanks[];
                Name: "ArtworkRanks";
                Nullable: false;
            };
            comments: {
                Shape: Comment[];
                Name: "Comment";
                Nullable: false;
            };
            followed_by: {
                Shape: Follow[];
                Name: "Follow";
                Nullable: false;
            };
            following: {
                Shape: Follow[];
                Name: "Follow";
                Nullable: false;
            };
        };
    };
    AuthPayload: {
        Name: "AuthPayload";
        Shape: AuthPayload;
        Include: Prisma.AuthPayloadInclude;
        Select: Prisma.AuthPayloadSelect;
        OrderBy: Prisma.AuthPayloadOrderByWithRelationInput;
        WhereUnique: Prisma.AuthPayloadWhereUniqueInput;
        Where: Prisma.AuthPayloadWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    Follow: {
        Name: "Follow";
        Shape: Follow;
        Include: Prisma.FollowInclude;
        Select: Prisma.FollowSelect;
        OrderBy: Prisma.FollowOrderByWithRelationInput;
        WhereUnique: Prisma.FollowWhereUniqueInput;
        Where: Prisma.FollowWhereInput;
        Create: {};
        Update: {};
        RelationName: "followedBy" | "following";
        ListRelations: never;
        Relations: {
            followedBy: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            following: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    Artwork: {
        Name: "Artwork";
        Shape: Artwork;
        Include: Prisma.ArtworkInclude;
        Select: Prisma.ArtworkSelect;
        OrderBy: Prisma.ArtworkOrderByWithRelationInput;
        WhereUnique: Prisma.ArtworkWhereUniqueInput;
        Where: Prisma.ArtworkWhereInput;
        Create: {};
        Update: {};
        RelationName: "user" | "artwork_file" | "artwork_ranks" | "comments";
        ListRelations: "artwork_file" | "artwork_ranks" | "comments";
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            artwork_file: {
                Shape: ArtworkFile[];
                Name: "ArtworkFile";
                Nullable: false;
            };
            artwork_ranks: {
                Shape: ArtworkRanks[];
                Name: "ArtworkRanks";
                Nullable: false;
            };
            comments: {
                Shape: Comment[];
                Name: "Comment";
                Nullable: false;
            };
        };
    };
    ArtworkFile: {
        Name: "ArtworkFile";
        Shape: ArtworkFile;
        Include: Prisma.ArtworkFileInclude;
        Select: Prisma.ArtworkFileSelect;
        OrderBy: Prisma.ArtworkFileOrderByWithRelationInput;
        WhereUnique: Prisma.ArtworkFileWhereUniqueInput;
        Where: Prisma.ArtworkFileWhereInput;
        Create: {};
        Update: {};
        RelationName: "artwork" | "artwork_gizmo";
        ListRelations: "artwork_gizmo";
        Relations: {
            artwork: {
                Shape: Artwork;
                Name: "Artwork";
                Nullable: false;
            };
            artwork_gizmo: {
                Shape: ArtworkGizmo[];
                Name: "ArtworkGizmo";
                Nullable: false;
            };
        };
    };
    ArtworkGizmo: {
        Name: "ArtworkGizmo";
        Shape: ArtworkGizmo;
        Include: Prisma.ArtworkGizmoInclude;
        Select: Prisma.ArtworkGizmoSelect;
        OrderBy: Prisma.ArtworkGizmoOrderByWithRelationInput;
        WhereUnique: Prisma.ArtworkGizmoWhereUniqueInput;
        Where: Prisma.ArtworkGizmoWhereInput;
        Create: {};
        Update: {};
        RelationName: "artwork_file";
        ListRelations: never;
        Relations: {
            artwork_file: {
                Shape: ArtworkFile;
                Name: "ArtworkFile";
                Nullable: false;
            };
        };
    };
    Comment: {
        Name: "Comment";
        Shape: Comment;
        Include: Prisma.CommentInclude;
        Select: Prisma.CommentSelect;
        OrderBy: Prisma.CommentOrderByWithRelationInput;
        WhereUnique: Prisma.CommentWhereUniqueInput;
        Where: Prisma.CommentWhereInput;
        Create: {};
        Update: {};
        RelationName: "user" | "artwork";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User | null;
                Name: "User";
                Nullable: true;
            };
            artwork: {
                Shape: Artwork;
                Name: "Artwork";
                Nullable: false;
            };
        };
    };
    ArtworkRanks: {
        Name: "ArtworkRanks";
        Shape: ArtworkRanks;
        Include: Prisma.ArtworkRanksInclude;
        Select: Prisma.ArtworkRanksSelect;
        OrderBy: Prisma.ArtworkRanksOrderByWithRelationInput;
        WhereUnique: Prisma.ArtworkRanksWhereUniqueInput;
        Where: Prisma.ArtworkRanksWhereInput;
        Create: {};
        Update: {};
        RelationName: "user" | "artwork" | "ranks";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            artwork: {
                Shape: Artwork;
                Name: "Artwork";
                Nullable: false;
            };
            ranks: {
                Shape: Ranks;
                Name: "Ranks";
                Nullable: false;
            };
        };
    };
    Ranks: {
        Name: "Ranks";
        Shape: Ranks;
        Include: Prisma.RanksInclude;
        Select: Prisma.RanksSelect;
        OrderBy: Prisma.RanksOrderByWithRelationInput;
        WhereUnique: Prisma.RanksWhereUniqueInput;
        Where: Prisma.RanksWhereInput;
        Create: {};
        Update: {};
        RelationName: "artwork_ranks" | "rank_type";
        ListRelations: "artwork_ranks";
        Relations: {
            artwork_ranks: {
                Shape: ArtworkRanks[];
                Name: "ArtworkRanks";
                Nullable: false;
            };
            rank_type: {
                Shape: RankTypes;
                Name: "RankTypes";
                Nullable: false;
            };
        };
    };
    RankTypes: {
        Name: "RankTypes";
        Shape: RankTypes;
        Include: Prisma.RankTypesInclude;
        Select: Prisma.RankTypesSelect;
        OrderBy: Prisma.RankTypesOrderByWithRelationInput;
        WhereUnique: Prisma.RankTypesWhereUniqueInput;
        Where: Prisma.RankTypesWhereInput;
        Create: {};
        Update: {};
        RelationName: "ranks";
        ListRelations: "ranks";
        Relations: {
            ranks: {
                Shape: Ranks[];
                Name: "Ranks";
                Nullable: false;
            };
        };
    };
}