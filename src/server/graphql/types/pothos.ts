/* eslint-disable */
import type { Prisma, User, UserFiles, Purpose, AuthPayload, PasswordResetToken, Follow, Artwork, ArtworkFile, ArtworkGizmo, Comment, CommentRanks, ArtworkRanks, UserRanks, Ranks, RankTypes, Notification, Article } from "@prisma/client";
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
        RelationName: "auth_payload" | "password_reset_tokens" | "user_files" | "artworks" | "artwork_ranks" | "user_ranks_reported" | "user_ranks_reporter" | "comments" | "comment_ranks" | "followed_by" | "following" | "notifications_received" | "notifications_sent" | "articles";
        ListRelations: "password_reset_tokens" | "user_files" | "artworks" | "artwork_ranks" | "user_ranks_reported" | "user_ranks_reporter" | "comments" | "comment_ranks" | "followed_by" | "following" | "notifications_received" | "notifications_sent" | "articles";
        Relations: {
            auth_payload: {
                Shape: AuthPayload | null;
                Name: "AuthPayload";
                Nullable: true;
            };
            password_reset_tokens: {
                Shape: PasswordResetToken[];
                Name: "PasswordResetToken";
                Nullable: false;
            };
            user_files: {
                Shape: UserFiles[];
                Name: "UserFiles";
                Nullable: false;
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
            user_ranks_reported: {
                Shape: UserRanks[];
                Name: "UserRanks";
                Nullable: false;
            };
            user_ranks_reporter: {
                Shape: UserRanks[];
                Name: "UserRanks";
                Nullable: false;
            };
            comments: {
                Shape: Comment[];
                Name: "Comment";
                Nullable: false;
            };
            comment_ranks: {
                Shape: CommentRanks[];
                Name: "CommentRanks";
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
            notifications_received: {
                Shape: Notification[];
                Name: "Notification";
                Nullable: false;
            };
            notifications_sent: {
                Shape: Notification[];
                Name: "Notification";
                Nullable: false;
            };
            articles: {
                Shape: Article[];
                Name: "Article";
                Nullable: false;
            };
        };
    };
    UserFiles: {
        Name: "UserFiles";
        Shape: UserFiles;
        Include: Prisma.UserFilesInclude;
        Select: Prisma.UserFilesSelect;
        OrderBy: Prisma.UserFilesOrderByWithRelationInput;
        WhereUnique: Prisma.UserFilesWhereUniqueInput;
        Where: Prisma.UserFilesWhereInput;
        Create: {};
        Update: {};
        RelationName: "user" | "purpose";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            purpose: {
                Shape: Purpose;
                Name: "Purpose";
                Nullable: false;
            };
        };
    };
    Purpose: {
        Name: "Purpose";
        Shape: Purpose;
        Include: Prisma.PurposeInclude;
        Select: Prisma.PurposeSelect;
        OrderBy: Prisma.PurposeOrderByWithRelationInput;
        WhereUnique: Prisma.PurposeWhereUniqueInput;
        Where: Prisma.PurposeWhereInput;
        Create: {};
        Update: {};
        RelationName: "user_files";
        ListRelations: "user_files";
        Relations: {
            user_files: {
                Shape: UserFiles[];
                Name: "UserFiles";
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
    PasswordResetToken: {
        Name: "PasswordResetToken";
        Shape: PasswordResetToken;
        Include: Prisma.PasswordResetTokenInclude;
        Select: Prisma.PasswordResetTokenSelect;
        OrderBy: Prisma.PasswordResetTokenOrderByWithRelationInput;
        WhereUnique: Prisma.PasswordResetTokenWhereUniqueInput;
        Where: Prisma.PasswordResetTokenWhereInput;
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
        RelationName: "user" | "artwork_file" | "artwork_ranks" | "comments" | "notifications";
        ListRelations: "artwork_file" | "artwork_ranks" | "comments" | "notifications";
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
            notifications: {
                Shape: Notification[];
                Name: "Notification";
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
        RelationName: "user" | "artwork" | "comment_ranks" | "notifications";
        ListRelations: "comment_ranks" | "notifications";
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
            comment_ranks: {
                Shape: CommentRanks[];
                Name: "CommentRanks";
                Nullable: false;
            };
            notifications: {
                Shape: Notification[];
                Name: "Notification";
                Nullable: false;
            };
        };
    };
    CommentRanks: {
        Name: "CommentRanks";
        Shape: CommentRanks;
        Include: Prisma.CommentRanksInclude;
        Select: Prisma.CommentRanksSelect;
        OrderBy: Prisma.CommentRanksOrderByWithRelationInput;
        WhereUnique: Prisma.CommentRanksWhereUniqueInput;
        Where: Prisma.CommentRanksWhereInput;
        Create: {};
        Update: {};
        RelationName: "comment" | "user" | "ranks";
        ListRelations: never;
        Relations: {
            comment: {
                Shape: Comment;
                Name: "Comment";
                Nullable: false;
            };
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            ranks: {
                Shape: Ranks;
                Name: "Ranks";
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
    UserRanks: {
        Name: "UserRanks";
        Shape: UserRanks;
        Include: Prisma.UserRanksInclude;
        Select: Prisma.UserRanksSelect;
        OrderBy: Prisma.UserRanksOrderByWithRelationInput;
        WhereUnique: Prisma.UserRanksWhereUniqueInput;
        Where: Prisma.UserRanksWhereInput;
        Create: {};
        Update: {};
        RelationName: "reported_user" | "reporter_user" | "ranks";
        ListRelations: never;
        Relations: {
            reported_user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            reporter_user: {
                Shape: User;
                Name: "User";
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
        RelationName: "artwork_ranks" | "user_ranks" | "comment_ranks" | "rank_type";
        ListRelations: "artwork_ranks" | "user_ranks" | "comment_ranks";
        Relations: {
            artwork_ranks: {
                Shape: ArtworkRanks[];
                Name: "ArtworkRanks";
                Nullable: false;
            };
            user_ranks: {
                Shape: UserRanks[];
                Name: "UserRanks";
                Nullable: false;
            };
            comment_ranks: {
                Shape: CommentRanks[];
                Name: "CommentRanks";
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
    Notification: {
        Name: "Notification";
        Shape: Notification;
        Include: Prisma.NotificationInclude;
        Select: Prisma.NotificationSelect;
        OrderBy: Prisma.NotificationOrderByWithRelationInput;
        WhereUnique: Prisma.NotificationWhereUniqueInput;
        Where: Prisma.NotificationWhereInput;
        Create: {};
        Update: {};
        RelationName: "recipient" | "actor" | "artwork" | "comment";
        ListRelations: never;
        Relations: {
            recipient: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            actor: {
                Shape: User | null;
                Name: "User";
                Nullable: true;
            };
            artwork: {
                Shape: Artwork | null;
                Name: "Artwork";
                Nullable: true;
            };
            comment: {
                Shape: Comment | null;
                Name: "Comment";
                Nullable: true;
            };
        };
    };
    Article: {
        Name: "Article";
        Shape: Article;
        Include: Prisma.ArticleInclude;
        Select: Prisma.ArticleSelect;
        OrderBy: Prisma.ArticleOrderByWithRelationInput;
        WhereUnique: Prisma.ArticleWhereUniqueInput;
        Where: Prisma.ArticleWhereInput;
        Create: {};
        Update: {};
        RelationName: "author";
        ListRelations: never;
        Relations: {
            author: {
                Shape: User | null;
                Name: "User";
                Nullable: true;
            };
        };
    };
}