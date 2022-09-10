import clsx from 'clsx';
import { constants } from 'ethers';
import { useEffect, useState } from 'react';

import { usePixelCanvasContext } from '../../contexts/PixelCanvasContext';
import { midEllipsis } from '../../utils/misc';
import ApiClient from '../../utils/ApiClient';
import { RgbColor } from 'react-colorful';
import PixelColorInfo from './PixelColorInfo';
import { SelectedPixelsList } from '../Inputs/SelectedPixelsList';
import { InfoItem, PixelInfoSection } from './PixelInfo';

export default function PixelLocationInfo() {
    const {
        selectedCoordinates,
        selectedColor,
        setSelectedColor,
        canvasIsEditable,
        setCanvasIsEditable,
    } = usePixelCanvasContext();

    const [price, setPrice] = useState<number>(0);
    const [owner, setOwner] = useState<string>('');
    const [prevRGB, setPrevRGB] = useState<RgbColor>({ r: 0, g: 0, b: 0 });

    useEffect(() => {
        ApiClient.getCoordinateData(
            selectedCoordinates.x,
            selectedCoordinates.y
        ).then((cd) => {
            if (!cd) return;
            setPrevRGB({ r: cd.color.R, g: cd.color.G, b: cd.color.B });
            setPrice(cd.price);
            setOwner(cd.owner);
        });
    }, [selectedCoordinates]);

    return (
        <PixelInfoSection name="Pixel Info">
            <InfoItem name="x" value={selectedCoordinates.x} />
            <InfoItem name="y" value={selectedCoordinates.y} />
            <InfoItem name="Price" value={price !== 0 ? price : '—'} />
            <InfoItem
                name="Owner"
                value={
                    owner !== '' && owner !== constants.AddressZero
                        ? midEllipsis(owner, 9)
                        : '—'
                }
            />
            <InfoItem
                name="RGB"
                value={`(${prevRGB.r},${prevRGB.g},${prevRGB.b})`}
            />
        </PixelInfoSection>
    );
}