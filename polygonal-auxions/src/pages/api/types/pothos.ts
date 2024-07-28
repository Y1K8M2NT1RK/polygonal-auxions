/* eslint-disable */
import type { Prisma, User, Artwork, ArtworkFile, ArtworkGizmo, Comment } from ".prisma/client";
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
        RelationName: "artworks" | "comments";
        ListRelations: "artworks" | "comments";
        Relations: {
            artworks: {
                Shape: Artwork[];
                Name: "Artwork";
                Nullable: false;
            };
            comments: {
                Shape: Comment[];
                Name: "Comment";
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
        RelationName: "user" | "artwork_file" | "comments";
        ListRelations: "artwork_file" | "comments";
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
}