import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect } from 'wagmi';
import { useEffect, useRef } from 'react';

const Home: NextPage = () => {
    const { data } = useAccount();
    const { isConnected } = useConnect();

    const canvasRef = useRef(null);

    const DisplayNameComp = () => {
        if (isConnected && data) {
            return <div>Your address is: {data.address}</div>;
        } else {
            return <></>;
        }
    };

    const colorRandomPixel = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        var id = context.getImageData(0, 0, 1, 1);

        var cw = canvas.width;
        var ch = canvas.height;

        var x = Math.floor(Math.random() * cw);
        var y = Math.floor(Math.random() * ch);
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);

        id.data[0] = r;
        id.data[1] = g;
        id.data[2] = b;
        context.putImageData(id, x, y);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        //Our first draw
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <Head>
                <title>The Merge Canvas</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="p-4 bg-white flex flex-row justify-between">
                <div className="font-xl">The Merge Canvas </div>
                <div>
                    <ConnectButton
                    // chainStatus="none"
                    // showBalance={false}
                    // accountStatus="address"
                    />
                </div>
            </header>
            <main className="flex-grow bg-green-500 p-4">
                <div className="flex-row justify-center mx-auto w-1/2">
                    <canvas
                        id="myCanvas"
                        width="500"
                        height="500"
                        className="border-2 border-black mx-auto"
                        ref={canvasRef}
                    ></canvas>

                    <div className="flex justify-center mt-4">
                        <button
                            onClick={colorRandomPixel}
                            className="mx-auto border-2 rounded-md p-2 border-blue-700 text-xl"
                        >
                            Color random pixel
                        </button>
                    </div>
                </div>

                <DisplayNameComp />
            </main>
            <footer className="p-4 bg-white text-center">
                The Merge Canvas built with ❤️ by Outliers
            </footer>
        </div>
    );
};

export default Home;
