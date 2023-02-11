// version
/*import Phaser from "phaser";*/
/*export default */class NinePatchImage extends Phaser.GameObjects.Image {

    private _settingCacheTexture = false;

    textureKey: string;
    textureFrame: string | number | undefined;
    drawCenter = true;
    marginLeft = 20;
    marginTop = 20;
    marginRight = 20;
    marginBottom = 20;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, key: string, frame?: string | number) {
        super(scene, x, y, key, frame);

        this.width = width;
        this.height = height;
        this.textureKey = key;
        this.textureFrame = frame;

        this.scene.events.once("update", () => this.redraw());
    }

    redraw(): void {

        const hashKey = [
            "!NinePatchImage",
            this.width,
            this.height,
            this.marginLeft,
            this.marginRight,
            this.marginTop,
            this.marginBottom,
            this.drawCenter,
            this.textureKey,
            this.textureFrame,
        ].join(",");

        if (this.scene.textures.exists(hashKey)) {

            // console.log(`NinePatchImage.getFromCache(${hashKey})`);

        } else {

            // console.log(`NinePatchImage.generateTexture(${hashKey})`);

            this.drawNinePatch(hashKey);
        }

        this._settingCacheTexture = true;
        this.setTexture(hashKey);
        this._settingCacheTexture = false;
    }

    setMargin(left: number, top: number, right: number, bottom: number): void {

        this.marginLeft = left;
        this.marginTop = top;
        this.marginRight = right;
        this.marginBottom = bottom;

        this.redraw();
    }

    setTexture(key: string, frame?: string | number): this {

        if (!this._settingCacheTexture) {

            this.textureKey = key;
            this.textureFrame = frame;
        }

        return super.setTexture(key, frame);
    }

    private drawNinePatch(hashKey: string) {

        const rt = new Phaser.GameObjects.RenderTexture(
            this.scene, 0, 0, this.width, this.height);

        const brush = new Phaser.GameObjects.TileSprite(
            this.scene, 0, 0, this.width, this.height, this.textureKey, this.textureFrame);
        brush.setOrigin(0, 0);

        const textureImage = new Phaser.GameObjects.Image(
            this.scene, 0, 0, this.textureKey, this.textureFrame);

        if (!this.scene.textures.getFrame(this.textureKey, this.textureFrame)) {

            const gr = new Phaser.GameObjects.Graphics(this.scene);

            gr.fillStyle(0);
            gr.fillRect(0, 0, this.width, this.height);
            gr.lineStyle(2, 0x00ff00);
            gr.strokeRect(0, 0, this.width, this.height);
            gr.strokeLineShape(new Phaser.Geom.Line(0, 0, this.width, this.height));

            rt.draw(gr);

            return;
        }

        rt.beginDraw();

        const texWidth = textureImage.width;
        const texHeight = textureImage.height;

        const ml = this.marginLeft;
        const mt = this.marginTop;
        const mr = this.marginRight;
        const mb = this.marginBottom;

        // center
        if (this.drawCenter) {

            brush.setSize(texWidth - ml - mr, texHeight - mt - mb);
            brush.setTilePosition(ml, mt);
            brush.setDisplaySize(this.width - ml - mr, this.height - mt - mb);
            rt.batchDraw(brush, ml, mt);
        }

        // top
        brush.setSize(texWidth - ml - mr, mt);
        brush.setTilePosition(ml, 0);
        brush.setDisplaySize(this.width - ml - mr, mt);
        rt.batchDraw(brush, ml, 0);

        // right
        brush.setSize(mr, texHeight - mt - mb);
        brush.setTilePosition(texWidth - mr, mt);
        brush.setDisplaySize(mr, this.height - mt - mb);
        rt.batchDraw(brush, this.width - mr, mt);

        // bottom
        brush.setSize(texWidth - ml - mr, mb);
        brush.setTilePosition(ml, texHeight - mb);
        brush.setDisplaySize(this.width - ml - mr, mb);
        rt.batchDraw(brush, ml, this.height - mb);

        // left
        brush.setSize(ml, texHeight - mt - mb);
        brush.setTilePosition(0, mt);
        brush.setDisplaySize(ml, this.height - mt - mb);
        rt.batchDraw(brush, 0, mt);

        brush.setScale(1, 1);

        // left/top
        brush.setSize(ml, mt);
        brush.setTilePosition(0, 0);
        rt.batchDraw(brush);

        // right/top
        brush.setSize(mr, mt);
        brush.setTilePosition(texWidth - mr, 0);
        rt.batchDraw(brush, this.width - mr, 0);

        // right/bottom
        brush.setSize(mr, mb);
        brush.setTilePosition(texWidth - mr, texHeight - mb);
        rt.batchDraw(brush, this.width - mr, this.height - mb);

        // left/bottom
        brush.setSize(ml, mb);
        brush.setTilePosition(0, texHeight - mb);
        rt.batchDraw(brush, 0, this.height - mb);

        rt.endDraw();

        rt.saveTexture(hashKey);

        rt.destroy();
        brush.destroy();
        textureImage.destroy();
    }
}