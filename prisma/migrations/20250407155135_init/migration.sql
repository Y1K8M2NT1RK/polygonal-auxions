-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "slug_id" TEXT NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "name_kana" VARCHAR(50),
    "handle_name" VARCHAR(60) NOT NULL,
    "password" VARCHAR(30) NOT NULL,
    "birthday" DATE NOT NULL,
    "introduction" VARCHAR(500) NOT NULL,
    "phone_number" VARCHAR NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "address" VARCHAR(150) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_payload" (
    "id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auth_payload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follows" (
    "followed_by_id" INTEGER NOT NULL,
    "following_id" INTEGER NOT NULL,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("following_id","followed_by_id")
);

-- CreateTable
CREATE TABLE "artworks" (
    "id" SERIAL NOT NULL,
    "slug_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "bads" INTEGER NOT NULL DEFAULT 0,
    "feature" VARCHAR(1000) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "artworks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artwork_files" (
    "id" SERIAL NOT NULL,
    "artwork_id" INTEGER NOT NULL,
    "file_name" TEXT NOT NULL,
    "extension" VARCHAR(4) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "artwork_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artwork_gizmos" (
    "id" SERIAL NOT NULL,
    "artwork_file_id" INTEGER NOT NULL,
    "transportX" INTEGER NOT NULL,
    "transportY" INTEGER NOT NULL,
    "transportZ" INTEGER NOT NULL,
    "rotateX" INTEGER NOT NULL,
    "rotateY" INTEGER NOT NULL,
    "rotateZ" INTEGER NOT NULL,
    "scaleX" INTEGER NOT NULL,
    "scaleY" INTEGER NOT NULL,
    "scaleZ" INTEGER NOT NULL,

    CONSTRAINT "artwork_gizmos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "slug_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "artwork_id" INTEGER NOT NULL,
    "body" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artwork_ranks" (
    "id" SERIAL NOT NULL,
    "artwork_id" INTEGER NOT NULL,
    "rank_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "artwork_ranks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ranks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rank_type_id" INTEGER NOT NULL,

    CONSTRAINT "ranks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rank_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "rank_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_slug_id_key" ON "users"("slug_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_handle_name_key" ON "users"("handle_name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "auth_payload_user_id_key" ON "auth_payload"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "artworks_slug_id_key" ON "artworks"("slug_id");

-- CreateIndex
CREATE UNIQUE INDEX "comments_slug_id_key" ON "comments"("slug_id");

-- CreateIndex
CREATE UNIQUE INDEX "artwork_ranks_artwork_id_rank_id_user_id_key" ON "artwork_ranks"("artwork_id", "rank_id", "user_id");

-- AddForeignKey
ALTER TABLE "auth_payload" ADD CONSTRAINT "auth_payload_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followed_by_id_fkey" FOREIGN KEY ("followed_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artworks" ADD CONSTRAINT "artworks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artwork_files" ADD CONSTRAINT "artwork_files_artwork_id_fkey" FOREIGN KEY ("artwork_id") REFERENCES "artworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artwork_gizmos" ADD CONSTRAINT "artwork_gizmos_artwork_file_id_fkey" FOREIGN KEY ("artwork_file_id") REFERENCES "artwork_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_artwork_id_fkey" FOREIGN KEY ("artwork_id") REFERENCES "artworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artwork_ranks" ADD CONSTRAINT "artwork_ranks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artwork_ranks" ADD CONSTRAINT "artwork_ranks_artwork_id_fkey" FOREIGN KEY ("artwork_id") REFERENCES "artworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artwork_ranks" ADD CONSTRAINT "artwork_ranks_rank_id_fkey" FOREIGN KEY ("rank_id") REFERENCES "ranks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ranks" ADD CONSTRAINT "ranks_rank_type_id_fkey" FOREIGN KEY ("rank_type_id") REFERENCES "rank_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
