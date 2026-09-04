
"use client"


import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
    type PointerEvent,
} from "react";

import "@/app/globals.css";

type DriftWallItem = {
    image: string;
    title?: string;
    href?: string;
};

type DriftWallProps = {
    items?: DriftWallItem[];
    columns?: number;
    tileWidth?: number;
    tileHeight?: number;
    gap?: number;
    radius?: number;
    tilt?: number;
    turn?: number;
    roll?: number;
    perspective?: number;
    depth?: number;
    speed?: number;
    direction?: "up" | "down";
    variance?: number;
    parallax?: number;
    pauseOnHover?: boolean;
    lift?: number;
    fade?: number;
    dim?: number;
    grayscale?: boolean;
    overlayColor?: string;
    className?: string;
    style?: CSSProperties;
};

type ColumnMeta = {
    copyHeight: number;
    copies: number;
};

type PointerPosition = {
    x: number;
    y: number;
};

const DEFAULT_ITEMS: DriftWallItem[] = Array.from(
    { length: 15 },
    (_, i) => {
        const ids = [
            1015,
            1025,
            1039,
            1043,
            1044,
            1050,
            1062,
            1069,
            1074,
            1080,
            1084,
            106,
            110,
            133,
            164,
        ];

        return {
            image: `https://picsum.photos/id/${ids[i % ids.length]
                }/600/400`,
            title: `Tile ${i + 1}`,
            href: undefined,
        };
    },
);

const prefersReducedMotion = (): boolean =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;

const columnFactor = (
    index: number,
    variance: number,
): number => {
    const pseudo =
        ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;

    return 1 + variance * pseudo;
};

const DriftWall = ({
    items = DEFAULT_ITEMS,
    columns = 5,
    tileWidth = 200,
    tileHeight = 132,
    gap = 18,
    radius = 14,
    tilt = 16,
    turn = -14,
    roll = 0,
    perspective = 1200,
    depth = 120,
    speed = 42,
    direction = "up",
    variance = 0.45,
    parallax = 0.6,
    pauseOnHover = false,
    lift = 64,
    fade = 0.6,
    dim = 0.55,
    grayscale = false,
    overlayColor = "#060010",
    className = "",
    style,
}: DriftWallProps) => {
    const containerRef =
        useRef<HTMLDivElement | null>(null);

    const planeRef =
        useRef<HTMLDivElement | null>(null);

    const trackRefs =
        useRef<(HTMLDivElement | null)[]>([]);

    const rafRef =
        useRef<number | null>(null);

    const offsetsRef =
        useRef<number[]>([]);

    const velocitiesRef =
        useRef<number[]>([]);

    const hoveredColRef =
        useRef<number>(-1);

    const wallHoveredRef =
        useRef<boolean>(false);

    const pointerRef =
        useRef<PointerPosition>({
            x: 0,
            y: 0,
        });

    const pointerDampedRef =
        useRef<PointerPosition>({
            x: 0,
            y: 0,
        });

    const lastTsRef =
        useRef<number | null>(null);

    const [containerHeight, setContainerHeight] =
        useState<number>(600);

    const [activeId, setActiveId] =
        useState<string | null>(null);

    const activeIdRef =
        useRef<string | null>(null);

    const [reduced, setReduced] =
        useState<boolean>(() => prefersReducedMotion());

    useEffect(() => {
        const mq = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );

        const onChange = (
            event: MediaQueryListEvent,
        ) => {
            setReduced(event.matches);
        };

        mq.addEventListener("change", onChange);

        return () =>
            mq.removeEventListener(
                "change",
                onChange,
            );
    }, []);

    const columnItems = useMemo<
        DriftWallItem[][]
    >(() => {
        const cols: DriftWallItem[][] =
            Array.from(
                { length: columns },
                () => [],
            );

        items.forEach((item, index) => {
            cols[index % columns].push(item);
        });

        return cols.map((col) =>
            col.length ? col : items.slice(0, 1),
        );
    }, [items, columns]);

    const columnMeta = useMemo<ColumnMeta[]>(
        () => {
            const unit = tileHeight + gap;

            return columnItems.map((col) => {
                const copyHeight = Math.max(
                    unit,
                    col.length * unit,
                );

                const copies = Math.max(
                    2,
                    Math.ceil(
                        (containerHeight * 1.6) /
                        copyHeight,
                    ) + 1,
                );

                return {
                    copyHeight,
                    copies,
                };
            });
        },
        [
            columnItems,
            tileHeight,
            gap,
            containerHeight,
        ],
    );

    useLayoutEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const resizeObserver =
            new ResizeObserver(
                ([entry]) => {
                    setContainerHeight(
                        entry.contentRect.height ||
                        600,
                    );
                },
            );

        resizeObserver.observe(
            containerRef.current,
        );

        return () =>
            resizeObserver.disconnect();
    }, []);

    const baseVelocities = useMemo<number[]>(
        () => {
            const dirSign =
                direction === "up" ? 1 : -1;

            return columnItems.map(
                (_, columnIndex) => {
                    const altSign =
                        columnIndex % 2 === 0
                            ? 1
                            : -1;

                    return (
                        speed *
                        columnFactor(
                            columnIndex,
                            variance,
                        ) *
                        dirSign *
                        altSign
                    );
                },
            );
        },
        [
            columnItems,
            speed,
            direction,
            variance,
        ],
    );

    useEffect(() => {
        offsetsRef.current =
            columnMeta.map(
                (meta, columnIndex) =>
                    meta.copyHeight *
                    ((columnIndex * 0.37) % 1),
            );

        velocitiesRef.current =
            columnItems.map(() => 0);
    }, [columnMeta, columnItems]);

    const applyPlaneTransform =
        useCallback(
            (px: number, py: number) => {
                const plane =
                    planeRef.current;

                if (!plane) {
                    return;
                }

                plane.style.transform =
                    `translate(-50%, -50%) scale(1.18) ` +
                    `rotateX(${tilt + py}deg) ` +
                    `rotateY(${turn + px}deg) ` +
                    `rotateZ(${roll}deg) ` +
                    `translateZ(${-depth}px)`;
            },
            [tilt, turn, roll, depth],
        );

    useEffect(() => {
        const animate = (timestamp: number) => {
            if (
                lastTsRef.current === null
            ) {
                lastTsRef.current = timestamp;
            }

            const dt = Math.min(
                0.05,
                Math.max(
                    0,
                    timestamp -
                    lastTsRef.current,
                ) / 1000,
            );

            lastTsRef.current = timestamp;

            const maxTilt = parallax * 8;

            const targetX =
                pointerRef.current.x *
                maxTilt;

            const targetY =
                -pointerRef.current.y *
                maxTilt;

            const damp =
                1 - Math.exp(-dt / 0.12);

            pointerDampedRef.current.x +=
                (targetX -
                    pointerDampedRef.current
                        .x) *
                damp;

            pointerDampedRef.current.y +=
                (targetY -
                    pointerDampedRef.current
                        .y) *
                damp;

            applyPlaneTransform(
                pointerDampedRef.current.x,
                pointerDampedRef.current.y,
            );

            if (!reduced) {
                for (
                    let columnIndex = 0;
                    columnIndex <
                    trackRefs.current.length;
                    columnIndex++
                ) {
                    const meta =
                        columnMeta[
                        columnIndex
                        ];

                    if (!meta) {
                        continue;
                    }

                    const paused =
                        wallHoveredRef.current &&
                        pauseOnHover;

                    const factor =
                        paused ||
                            hoveredColRef.current ===
                            columnIndex
                            ? 0
                            : 1;

                    const target =
                        baseVelocities[
                        columnIndex
                        ] * factor;

                    const ease =
                        1 -
                        Math.exp(
                            -dt /
                            (target === 0
                                ? 0.16
                                : 0.28),
                        );

                    velocitiesRef.current[
                        columnIndex
                    ] +=
                        (target -
                            velocitiesRef.current[
                            columnIndex
                            ]) *
                        ease;

                    let next =
                        (offsetsRef.current[
                            columnIndex
                        ] ?? 0) +
                        velocitiesRef.current[
                        columnIndex
                        ] *
                        dt;

                    next =
                        ((next %
                            meta.copyHeight) +
                            meta.copyHeight) %
                        meta.copyHeight;

                    offsetsRef.current[
                        columnIndex
                    ] = next;

                    const element =
                        trackRefs.current[
                        columnIndex
                        ];

                    if (element) {
                        element.style.transform =
                            `translate3d(0, ${-next}px, 0)`;
                    }
                }
            } else {
                for (
                    let columnIndex = 0;
                    columnIndex <
                    trackRefs.current.length;
                    columnIndex++
                ) {
                    const element =
                        trackRefs.current[
                        columnIndex
                        ];

                    const meta =
                        columnMeta[
                        columnIndex
                        ];

                    if (element && meta) {
                        element.style.transform =
                            `translate3d(0, ${-(offsetsRef.current[columnIndex] ?? 0)}px, 0)`;
                    }
                }
            }

            rafRef.current =
                requestAnimationFrame(
                    animate,
                );
        };

        rafRef.current =
            requestAnimationFrame(
                animate,
            );

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(
                    rafRef.current,
                );
            }

            rafRef.current = null;
            lastTsRef.current = null;
        };
    }, [
        baseVelocities,
        columnMeta,
        pauseOnHover,
        parallax,
        reduced,
        applyPlaneTransform,
    ]);

    const activate = useCallback(
        (id: string, index: number) => {
            activeIdRef.current = id;
            hoveredColRef.current = index;
            setActiveId(id);
        },
        [],
    );

    const release = useCallback(() => {
        activeIdRef.current = null;
        hoveredColRef.current = -1;
        setActiveId(null);
    }, []);

    const handlePointerMove =
        useCallback(
            (
                event: PointerEvent<HTMLDivElement>,
            ) => {
                const rect =
                    containerRef.current?.getBoundingClientRect();

                if (!rect) {
                    return;
                }

                if (
                    parallax > 0 &&
                    !reduced
                ) {
                    pointerRef.current = {
                        x:
                            (event.clientX -
                                rect.left) /
                            rect.width -
                            0.5,
                        y:
                            (event.clientY -
                                rect.top) /
                            rect.height -
                            0.5,
                    };
                }

                const hit =
                    document.elementFromPoint(
                        event.clientX,
                        event.clientY,
                    );

                const tile =
                    hit?.closest?.(
                        "[data-tile-id]",
                    );

                if (!tile) {
                    return;
                }

                const id =
                    tile.getAttribute(
                        "data-tile-id",
                    );

                if (!id) {
                    return;
                }

                if (
                    id ===
                    activeIdRef.current
                ) {
                    return;
                }

                activeIdRef.current = id;

                hoveredColRef.current =
                    Number(
                        tile.getAttribute(
                            "data-col",
                        ),
                    );

                setActiveId(id);
            },
            [parallax, reduced],
        );

    const handlePointerLeaveWall =
        useCallback(() => {
            wallHoveredRef.current = false;

            pointerRef.current = {
                x: 0,
                y: 0,
            };

            release();
        }, [release]);

    const cssVars = useMemo(
        () => ({
            "--dw-tile-w": `${tileWidth}px`,
            "--dw-tile-h": `${tileHeight}px`,
            "--dw-gap": `${gap}px`,
            "--dw-radius": `${radius}px`,
            "--dw-perspective": `${perspective}px`,
            "--dw-lift": `${lift}px`,
            "--dw-dim": dim,
            "--dw-gray": grayscale ? 1 : 0,
            "--dw-overlay": overlayColor,
            "--dw-edge": `${Math.max(
                0,
                (1 - fade) * 100,
            )}%`,
            ...style,
        }),
        [
            tileWidth,
            tileHeight,
            gap,
            radius,
            perspective,
            lift,
            dim,
            grayscale,
            overlayColor,
            fade,
            style,
        ],
    );

    const renderTile = (
        item: DriftWallItem,
        id: string,
        columnIndex: number,
    ) => {
        const inner = (
            <span className="drift-wall__inner">
                <img
                    src={item.image}
                    alt={item.title ?? ""}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                />

                <span
                    className="drift-wall__overlay"
                    aria-hidden="true"
                />
            </span>
        );

        const commonProps = {
            className: `drift-wall__tile${activeId === id
                ? " is-active"
                : ""
                }`,
            "data-tile-id": id,
            "data-col": columnIndex,
            onFocus: () =>
                activate(
                    id,
                    columnIndex,
                ),
            onBlur: release,
        };

        if (item.href) {
            return (
                <a
                    key={id}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    {...commonProps}
                >
                    {inner}
                </a>
            );
        }

        return (
            <div
                key={id}
                tabIndex={0}
                role="button"
                aria-label={
                    item.title ?? "tile"
                }
                {...commonProps}
            >
                {inner}
            </div>
        );
    };

    const rootClass = [
        "drift-wall",
        reduced
            ? "drift-wall--reduced"
            : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            ref={containerRef}
            className={rootClass}
            style={cssVars}
            onPointerMove={
                handlePointerMove
            }
            onPointerEnter={() => {
                wallHoveredRef.current =
                    true;
            }}
            onPointerLeave={
                handlePointerLeaveWall
            }
            role="group"
            aria-label="Drifting wall of tiles"
        >
            <div
                ref={planeRef}
                className="drift-wall__plane"
            >
                {columnItems.map(
                    (column, columnIndex) => {
                        const meta =
                            columnMeta[
                            columnIndex
                            ];

                        const copies =
                            Array.from({
                                length: meta.copies,
                            });

                        return (
                            <div
                                className="drift-wall__col"
                                key={`col-${columnIndex}`}
                            >
                                <div
                                    className="drift-wall__track"
                                    ref={(element) => {
                                        trackRefs.current[
                                            columnIndex
                                        ] =
                                            element;
                                    }}
                                >
                                    {copies.map(
                                        (
                                            _,
                                            copyIndex,
                                        ) =>
                                            column.map(
                                                (
                                                    item,
                                                    itemIndex,
                                                ) =>
                                                    renderTile(
                                                        item,
                                                        `${columnIndex}-${copyIndex}-${itemIndex}`,
                                                        columnIndex,
                                                    ),
                                            ),
                                    )}
                                </div>
                            </div>
                        );
                    },
                )}
            </div>
        </div>
    );
};

export default DriftWall;