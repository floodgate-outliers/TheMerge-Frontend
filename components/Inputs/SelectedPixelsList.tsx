import Image from 'next/image';
import { FC, useCallback, useEffect, useState } from 'react';
import { RgbColor } from 'react-colorful';
import {
    usePixelCanvasContext,
    XYCoordinates,
} from '../../contexts/PixelCanvasContext';
import ApiClient from '../../utils/ApiClient';
import { PixelInfoSection } from '../Displays/PixelInfo';

type SelectedPixelsListItemProps = {
    index: number;
    coordinates: XYCoordinates;
    color: RgbColor;
};

const SelectedPixelsListItem: FC<SelectedPixelsListItemProps> = ({
    index,
    coordinates,
    color,
}) => {
    const { canvasRef, selectedPixelsList, setSelectedPixelsList, drawPixel } =
        usePixelCanvasContext();

    const deleteSelectedPixelHandler = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const selectedPixel = selectedPixelsList[index];
        const newSelectedPixelsList = [...selectedPixelsList];
        newSelectedPixelsList.splice(index, 1);
        setSelectedPixelsList([...newSelectedPixelsList]);
        ApiClient.getCoordinateData(
            selectedPixel.coordinates.x,
            selectedPixel.coordinates.y
        ).then((cd) => {
            if (!cd) return;
            drawPixel(
                selectedPixel.coordinates.x,
                selectedPixel.coordinates.y,
                canvas,
                {
                    r: cd.color.R,
                    g: cd.color.G,
                    b: cd.color.B,
                }
            );
        });
    };

    return (
        <div key={index} className="flex flex-col justify-center text-center">
            <div
                className={`h-16 w-16 mt-3 border-4 border-black`}
                style={{
                    backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                }}
            />
            <p className="text-sm">
                ({coordinates.x}, {coordinates.y})
            </p>
            <button
                onClick={() => deleteSelectedPixelHandler(index)}
                className="text-red-400"
            >
                Delete
            </button>
        </div>
    );
};

export const SelectedPixelsList: FC = () => {
    const {
        canvasRef,
        drawPixel,

        selectedColor,
        selectedCoordinates,
        selectedPixelsList,
        setSelectedPixelsList,
    } = usePixelCanvasContext();

    const [showPopup, setShowPopup] = useState(false);

    return (
        <>
            <PixelInfoSection
                name={`Selected Pixels (${selectedPixelsList.length})`}
                onClick={() => setShowPopup(true)}
            >
                <div />
            </PixelInfoSection>
            {showPopup && (
                <div className="absolute top-0 bottom-0 left-0 right-0 backdrop-blur flex flex-row justify-center items-center z-10">
                    <div className="bg-white px-20 pt-10 pb-10 rounded-lg width-clamp ">
                        <div className="flex flex-row items-start justify-between">
                            <p className="mb-5 text-2xl font-semibold">
                                Selected pixels
                            </p>
                            <button onClick={() => setShowPopup(false)}>
                                <Image
                                    width={24}
                                    height={24}
                                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8cGF0aCBkPSJtMzc1LjcyIDMxMC44NiAxNDUuOTMtMTQ1LjkzYzQzLjA1NS00My4wNTUgMTA3LjkxIDIyLjM2MyA2NC44NTkgNjUuNDE4bC0xNDUuMzggMTQ1LjM4IDE0NS4zOCAxNDUuOTNjNDMuMDU1IDQzLjA1NS0yMS44MDUgMTA3LjkxLTY0Ljg1OSA2NC44NTlsLTE0NS45My0xNDUuMzgtMTQ1LjM4IDE0NS4zOGMtNDMuMDU1IDQzLjA1NS0xMDguNDctMjEuODA1LTY1LjQxOC02NC44NTlsMTQ1LjkzLTE0NS45My0xNDUuOTMtMTQ1LjM4Yy00My4wNTUtNDMuMDU1IDIyLjM2My0xMDguNDcgNjUuNDE4LTY1LjQxOHoiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8L3N2Zz4K"
                                    alt="close"
                                />
                            </button>
                        </div>
                        <div className="flex flex-row flex-wrap gap-x-10 gap-y-5 max-w-[500px] max-h-[500px] overflow-auto">
                            {selectedPixelsList.length === 0 ? (
                                <p className="text-xl">
                                    No pixels have been selected
                                </p>
                            ) : (
                                selectedPixelsList.map(
                                    ({ coordinates, color }, index) => (
                                        <SelectedPixelsListItem
                                            key={`${coordinates.x}-${coordinates.y}`}
                                            index={index}
                                            coordinates={coordinates}
                                            color={color}
                                        />
                                    )
                                )
                            )}
                        </div>
                        {/* <button
                onClick={addToListHandler}
                className="px-2 py-2 border-2 border-black"
            >
                Add to list
            </button> */}
                    </div>
                </div>
            )}
        </>
    );
};
