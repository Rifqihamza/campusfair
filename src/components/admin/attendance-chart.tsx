"use client";

import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

type AttendanceChartProps = {
    insideVenue: number;
    checkedOut: number;
};

export function AttendanceChart({
    insideVenue,
    checkedOut,
}: AttendanceChartProps) {
    const data = [
        {
            name: "Masih di Venue",
            value: insideVenue,
        },
        {
            name: "Sudah Check-out",
            value: checkedOut,
        },
    ];

    const hasData = data.some(
        (item) => item.value > 0,
    );

    return (
        <div className="rounded-3xl border-2 border-navy bg-cream p-6 shadow-[6px_6px_0_#0B1F3A] sm:p-8">
            <div className="mb-4">
                <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-navy/60">
                    VENUE STATUS
                </p>

                <h3 className="mt-1 font-display text-3xl leading-none text-navy sm:text-4xl">
                    Status Peserta
                </h3>

                <p className="mt-2 font-body text-sm font-semibold text-navy/60">
                    Perbandingan peserta yang masih di venue dan sudah keluar.
                </p>
            </div>

            {!hasData ? (
                <div className="flex min-h-64 items-center justify-center">
                    <p className="font-body text-sm font-semibold text-navy/60">
                        Belum ada data kehadiran.
                    </p>
                </div>
            ) : (
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={95}
                                innerRadius={55}
                                paddingAngle={3}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`${entry.name}-${index}`}
                                    />
                                ))}
                            </Pie>

                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}