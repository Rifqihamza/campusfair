import { LoadingOverlay } from "@/components/shared/loading-overlay";

export default function Loading() {
    return (
        <LoadingOverlay
            show
            message="Memuat dashboard..."
        />
    );
}