/*
  Warnings:

  - A unique constraint covering the columns `[eventParticipantId,type]` on the table `attendance_logs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "attendance_logs_eventParticipantId_type_key" ON "attendance_logs"("eventParticipantId", "type");

-- RenameIndex
ALTER INDEX "events_scannertoken_key" RENAME TO "events_scannerToken_key";
