-- DropIndex
DROP INDEX "attendance_logs_eventParticipantId_idx";

-- DropIndex
DROP INDEX "attendance_logs_eventParticipantId_type_idx";

-- DropIndex
DROP INDEX "event_participants_deletedAt_idx";

-- DropIndex
DROP INDEX "event_participants_eventId_idx";

-- DropIndex
DROP INDEX "event_participants_participantId_idx";

-- DropIndex
DROP INDEX "events_deletedAt_idx";

-- DropIndex
DROP INDEX "events_isActive_idx";

-- CreateIndex
CREATE INDEX "attendance_logs_eventParticipantId_scannedAt_idx" ON "attendance_logs"("eventParticipantId", "scannedAt");

-- CreateIndex
CREATE INDEX "event_participants_participantId_deletedAt_idx" ON "event_participants"("participantId", "deletedAt");

-- CreateIndex
CREATE INDEX "events_isActive_deletedAt_idx" ON "events"("isActive", "deletedAt");
