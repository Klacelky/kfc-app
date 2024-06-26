'use client';

import { useLiveWS } from '@/utils/client/useLive';

export default function LiveSvg() {
    const { gameData } = useLiveWS();

    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 1920 1080"
            version="1.1"
            style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}
        >
            <g>
                <g id="Layer1" transform="matrix(0.898559,0,0,0.898559,1382.03,20.015)">
                    <g>
                        <g transform="matrix(1.21757,0,0,1.21053,-4.28347,-27.3492)">
                            <path
                                d="M467.813,63.516C467.813,51.227 457.893,41.25 445.676,41.25L41.824,41.25C29.607,41.25 19.688,51.227 19.688,63.516L19.688,108.047C19.688,120.336 29.607,130.313 41.824,130.313L445.676,130.313C457.893,130.313 467.813,120.336 467.813,108.047L467.813,63.516Z"
                                style={{ fill: 'rgb(131,181,154)' }}
                            />
                        </g>
                        <g transform="matrix(0.17274,0,0,0.17274,127.67,-50.3874)">
                            <g id="path11536-71" transform="matrix(9.1702,0,0,9.14527,124.487,-171.193)">
                                <path
                                    d="M26.616,75.698C20.782,77.234 21.733,80.693 22.532,86.99C23.192,93.726 23.638,97.583 25.993,98.153C28.002,98.21 28.704,99.641 28.548,101.974C28.315,103.864 28.211,105.755 29.325,107.657C30.025,108.78 30.469,110.09 30.495,111.705L31.017,124.174C31.027,125.463 31.147,127.178 30.339,127.753C28.772,129.206 27.835,129.172 28.658,132.99C29.445,135.531 29.586,135.913 35.744,139.779C36.846,140.506 38.114,140.906 40.463,139.347L46.547,135.476C48.235,134.361 49.662,132.9 50.05,130.073C51.087,125.46 51.13,125.441 48.498,125.4L49.504,108.567C50.511,106.317 50.843,103.665 50.76,100.767C50.84,99.319 51.286,98.563 51.932,98.186C52.916,97.825 53.648,97.109 53.766,95.527L54.84,84.711C54.694,83.158 54.696,81.624 52.841,79.865L47.833,74.532C46.987,73.506 48.039,72.158 48.292,71.427C54.178,53.46 24.956,52.784 30.565,71.058C31.075,72.91 30.685,74.126 29.284,74.628L26.616,75.698Z"
                                    style={{
                                        fill: 'rgb(255,252,215)',
                                        fillRule: 'nonzero',
                                        stroke: 'rgb(26,41,67)',
                                        strokeWidth: '3.52px',
                                    }}
                                />
                            </g>
                            <g id="path11536-7-61" transform="matrix(9.1702,0,0,9.14527,-141.809,-171.193)">
                                <path
                                    d="M183.384,75.698C189.218,77.234 188.267,80.693 187.468,86.99C186.808,93.726 186.362,97.583 184.007,98.153C181.998,98.21 181.296,99.641 181.452,101.974C181.685,103.864 181.789,105.755 180.675,107.657C179.975,108.78 179.531,110.09 179.505,111.705L178.983,124.174C178.973,125.463 178.853,127.178 179.661,127.753C181.228,129.206 182.165,129.172 181.342,132.99C180.555,135.531 180.414,135.913 174.256,139.779C173.154,140.506 171.886,140.906 169.537,139.347L163.453,135.476C161.765,134.361 160.338,132.9 159.95,130.073C158.913,125.46 158.87,125.441 161.502,125.4L160.496,108.567C159.489,106.317 159.157,103.665 159.24,100.767C159.16,99.319 158.714,98.563 158.068,98.186C157.084,97.825 156.352,97.109 156.234,95.527L155.16,84.711C155.306,83.158 155.304,81.624 157.159,79.865L162.167,74.532C163.013,73.506 161.961,72.158 161.708,71.427C155.822,53.46 185.044,52.784 179.435,71.058C178.925,72.91 179.315,74.126 180.716,74.628L183.384,75.698Z"
                                    style={{
                                        fill: 'rgb(26,41,67)',
                                        fillRule: 'nonzero',
                                        stroke: 'rgb(255,252,215)',
                                        strokeWidth: '3.52px',
                                    }}
                                />
                            </g>
                        </g>
                        <g transform="matrix(1,0,0,1,212.596,9.83527)">
                            <text
                                x="33.523px"
                                y="97.5px"
                                style={{
                                    fontFamily: "'RushfordClean', 'Rushford Clean'",
                                    fontSize: '80.128px',
                                    fill: 'rgb(26,41,67)',
                                }}
                            >
                                {gameData?.home_score}
                            </text>
                            <text
                                x="67.177px"
                                y="97.5px"
                                style={{
                                    fontFamily: "'RushfordClean', 'Rushford Clean'",
                                    fontSize: '71.225px',
                                    fill: 'rgb(26,41,67)',
                                }}
                            >
                                -
                            </text>
                            <text
                                x="92.391px"
                                y="97.5px"
                                style={{
                                    fontFamily: "'RushfordClean', 'Rushford Clean'",
                                    fontSize: '80.128px',
                                    fill: 'rgb(26,41,67)',
                                }}
                            >
                                {gameData?.visiting_score}
                            </text>
                        </g>
                        <g transform="matrix(1,0,0,1,16.9662,6.67911)">
                            <text
                                x="152.113px"
                                y="97.5px"
                                style={{
                                    fontFamily: "'RushfordClean', 'Rushford Clean'",
                                    fontSize: '71.225px',
                                    fill: 'rgb(26,41,67)',
                                    textAnchor: 'end',
                                }}
                            >
                                {gameData?.home_team}
                            </text>
                        </g>
                        <g transform="matrix(1,0,0,1,384.142,6.67911)">
                            <text
                                x="32.813px"
                                y="97.5px"
                                style={{
                                    fontFamily: "'RushfordClean', 'Rushford Clean'",
                                    fontSize: '71.225px',
                                    fill: 'rgb(26,41,67)',
                                }}
                            >
                                {gameData?.visiting_team}
                            </text>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}
