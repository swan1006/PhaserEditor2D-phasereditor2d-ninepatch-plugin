interface INinePatch {

    marginLeft: number;
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    textureKey: string;
    textureFrame: string | number | undefined;
    drawCenter: boolean;
    flipX: boolean;
    flipY: boolean;
    setMargin(left: number, top: number, right: number, bottom: number): void;
    setTexture(key: string, frame?: string | number): this;
    updateDisplayOrigin(): this;
    redraw(): void;
}

interface NinePatch extends Phaser.GameObjects.RenderTexture, INinePatch {

}

interface NinePatchImage extends Phaser.GameObjects.Image, INinePatch {

}

interface NinePatchContainer extends Phaser.GameObjects.Container, INinePatch {

    ninePatchContainterTintFill: boolean;
    ninePatchContainerTint: number;
    ninePatchContainerOriginX: number;
    ninePatchContainerOriginY: number;
}

declare namespace Phaser.GameObjects {

    export interface GameObjectFactory {

        ninePatch(x: number, y: number, width: number, height: number, key: string, frame?: string | number): NinePatch;
        ninePatchImage(x: number, y: number, width: number, height: number, key: string, frame?: string | number): NinePatchImage;
        ninePatchContainer(x: number, y: number, width: number, height: number, key: string, frame?: string | number): NinePatchContainer;
    }
}