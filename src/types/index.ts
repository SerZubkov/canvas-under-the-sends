import Ball from 'models/Game/models/Ball';
import Block from 'models/Game/models/Block';
import Platform from 'models/Game/models/Platform';
import Heart from 'models/Game/models/Heart';

export type Images = {
    background: HTMLImageElement | null;
    ball: HTMLImageElement | null;
    block: HTMLImageElement | null;
    platform: HTMLImageElement | null;
    heart: HTMLImageElement | null;
};
export type Sprites = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export type KeyImages = keyof Images;

export type Game = {
    // state
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    images: Images;
    ball?: Ball;
    platform?: Platform;
    blocks?: Block;
    heart?: Heart;
    width: number;
    height: number;

    // actions

    init: () => void;
    preload: (callback: () => void) => void;
    render: () => void;
    collideBlock: () => void;
    collidePlatform: () => void;
    start: () => void;
    run: () => void;
    setEvents: () => void;
    updateController: () => void;
};
