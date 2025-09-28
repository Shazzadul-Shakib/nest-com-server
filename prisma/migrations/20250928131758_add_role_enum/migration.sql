-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('Customer', 'Admin');

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'Customer';
