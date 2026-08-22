/*
  Warnings:

  - You are about to drop the column `checkInToken` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `checkOutToken` on the `events` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[scannerToken]` on the table `events` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `scannerToken` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- Drop old check-in indexes
DROP INDEX IF EXISTS "events_checkInToken_key";
DROP INDEX IF EXISTS "events_checkintoken_key";

-- Drop old check-out indexes
DROP INDEX IF EXISTS "events_checkOutToken_key";
DROP INDEX IF EXISTS "events_checkouttoken_key";

-- Replace attendance tokens with scanner token
ALTER TABLE "events"
DROP COLUMN "checkInToken",
DROP COLUMN "checkOutToken",
ADD COLUMN "scannerToken" TEXT;

-- Generate scanner token for existing events
UPDATE "events"
SET "scannerToken" = gen_random_uuid()::text
WHERE "scannerToken" IS NULL;

-- Make scanner token required
ALTER TABLE "events"
ALTER COLUMN "scannerToken" SET NOT NULL;

-- Create unique scanner token index
CREATE UNIQUE INDEX "events_scannertoken_key"
ON "events"("scannerToken");