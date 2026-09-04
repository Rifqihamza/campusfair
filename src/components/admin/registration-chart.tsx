"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type RegistrationData = {
    name: string;
    registrations: number;
};

type RegistrationChartProps = {
    data: RegistrationData[];
};

export function RegistrationChart({
    data,
}: RegistrationChartProps) {
    return (
        <div className="rounded-3xl border-2 border-navy bg-cream p-6 shadow-[6px_6px_0_#0B1F3A] sm:p-8">
            <div className="mb-6">
                <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-navy/60">
                    REGISTRATION ANALYSIS
                </p>

                <h3 className="mt-1 font-display text-3xl leading-none text-navy sm:text-4xl">
                    Pendaftaran per Event
                </h3>

                <p className="mt-2 font-body text-sm font-semibold text-navy/60">
                    Jumlah peserta yang terdaftar pada setiap event.
                </p>
            </div>

            {data.length === 0 ? (
                <div className="flex min-h-64 items-center justify-center">
                    <p className="font-body text-sm font-semibold text-navy/60">
                        Belum ada data pendaftaran.
                    </p>
                </div>
            ) : (
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{
                                top: 8,
                                right: 8,
                                left: 0,
                                bottom: 8,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="name"
                                tick={{
                                    fontSize: 12,
                                }}
                                tickLine={false}
                                axisLine={false}
                            />

                            <YAxis
                                allowDecimals={false}
                                tick={{
                                    fontSize: 12,
                                }}
                                tickLine={false}
                                axisLine={false}
                            />

                            <Tooltip
                                cursor={{ opacity: 0.08 }}
                            />

                            <Bar
                                dataKey="registrations"
                                name="Pendaftaran"
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}