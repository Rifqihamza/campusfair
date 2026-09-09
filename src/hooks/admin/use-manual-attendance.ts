"use client";

import { useEffect, useState, useCallback } from "react";

type AttendanceType = "CHECK_IN" | "CHECK_OUT";

type Participant = {
    id: string;
    participantCode: string;
    participant: {
        name: string;
        class: string | null;
        major: string | null;
        school: string;
        user: {
            email: string;
        };
    };
    attendanceLogs: {
        type: AttendanceType;
        scannedAt: string;
    }[];
};

export function useManualAttendance(eventId: string) {
    const [query, setQuery] = useState("");
    const [participants, setParticipants] = useState<
        Participant[]
    >([]);
    const [loading, setLoading] = useState(false);
    const [processingId, setProcessingId] =
        useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(
        null,
    );
    const [error, setError] = useState<string | null>(null);

    const searchParticipants = useCallback(
        async (
            searchQuery: string,
            signal?: AbortSignal,
        ) => {
            const search = searchQuery.trim();

            if (!search) {
                setParticipants([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `/api/admin/attendance/${eventId}/participants?query=${encodeURIComponent(search)}`,
                    { signal },
                );

                if (!response.ok) {
                    throw new Error(
                        "Gagal mencari peserta.",
                    );
                }

                const data = (await response.json()) as {
                    participants: Participant[];
                };

                setParticipants(data.participants);
            } catch (error) {
                if (
                    error instanceof DOMException &&
                    error.name === "AbortError"
                ) {
                    return;
                }

                setError(
                    "Gagal mencari peserta. Silakan coba lagi.",
                );
                setParticipants([]);
            } finally {
                if (!signal?.aborted) {
                    setLoading(false);
                }
            }
        },
        [eventId],
    );

    useEffect(() => {
        const controller = new AbortController();

        const timeout = setTimeout(() => {
            void searchParticipants(
                query,
                controller.signal,
            );
        }, 300);

        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
    }, [query, searchParticipants]);

    async function handleAttendance(
        eventParticipantId: string,
        type: AttendanceType,
    ) {
        if (processingId) return;

        setProcessingId(eventParticipantId);
        setMessage(null);
        setError(null);

        try {
            const response = await fetch(
                `/api/admin/attendance/${eventId}/manual`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        eventParticipantId,
                        type,
                    }),
                },
            );

            const data = (await response.json()) as {
                message?: string;
            };

            if (!response.ok) {
                throw new Error(
                    data.message ??
                    "Gagal mencatat kehadiran.",
                );
            }

            setMessage(
                data.message ??
                (type === "CHECK_IN"
                    ? "Check-in berhasil dicatat."
                    : "Check-out berhasil dicatat."),
            );

            await searchParticipants(query);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Gagal mencatat kehadiran.",
            );
        } finally {
            setProcessingId(null);
        }
    }

    return {
        query,
        setQuery,
        participants,
        loading,
        processingId,
        message,
        error,
        handleAttendance,
    };
}