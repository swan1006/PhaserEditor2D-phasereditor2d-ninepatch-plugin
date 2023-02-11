// v1.2.0

class NinePatch extends Phaser.GameObjects.RenderTexture {

    textureKey: string;
    textureFrame: string | number | undefined;
    drawCenter = true;
    marginLeft = 20;
    marginTop = 20;
    marginRight = 20;
    marginBottom = 20;
    private _brush: Phaser.GameObjects.TileSprite;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, key: string, frame?: string | number) {
        super(scene, x, y, width, height);

        this.textureKey = key;
        this.textureFrame = frame;

        this._brush = new Phaser.GameObjects.TileSprite(scene, 0, 0, 1, 1, key, frame);
        this._brush.setOrigin(0, 0);

        this.scene.events.once("update", this.redraw, this);
    }

    redraw(): void {
        
        this.clear();

        if (!this._brush || this._brush.texture.key === "__DEFAULT" || this._brush.texture.key === "__MISSING") {

            const gr = new Phaser.GameObjects.Graphics(this.scene);

            gr.fillStyle(0);
            gr.fillRect(0, 0, this.width, this.height);
            gr.lineStyle(2, 0x00ff00);
            gr.strokeRect(0, 0, this.width, this.height);
            gr.strokeLineShape(new Phaser.Geom.Line(0, 0, this.width, this.height));

            this.draw(gr);

            return;
        }

        this._brush.setTexture(this.textureKey, this.textureFrame);

        this.beginDraw();

        const tex = this.scene.textures.getFrame(this.textureKey, this.textureFrame);
        const texWidth = tex.width;
        const texHeight = tex.height;

        const ml = this.marginLeft;
        const mt = this.marginTop;
        const mr = this.marginRight;
        const mb = this.marginBottom;

        // center
        if (this.drawCenter) {

            this._brush.setSize(texWidth - ml - mr, texHeight - mt - mb);
            this._brush.setTilePosition(ml, mt);
            this._brush.setDisplaySize(this.width - ml - mr, this.height - mt - mb);
            this.batchDraw(this._brush, ml, mt);
        }

        // top
        this._brush.setSize(texWidth - ml - mr, mt);
        this._brush.setTilePosition(ml, 0);
        this._brush.setDisplaySize(this.width - ml - mr, mt);
        this.batchDraw(this._brush, ml, 0);

        // right
        this._brush.setSize(mr, texHeight - mt - mb);
        this._brush.setTilePosition(texWidth - mr, mt);
        this._brush.setDisplaySize(mr, this.height - mt - mb);
        this.batchDraw(this._brush, this.width - mr, mt);

        // bottom
        this._brush.setSize(texWidth - ml - mr, mb);
        this._brush.setTilePosition(ml, texHeight - mb);
        this._brush.setDisplaySize(this.width - ml - mr, mb);
        this.batchDraw(this._brush, ml, this.height - mb);

        // left
        this._brush.setSize(ml, texHeight - mt - mb);
        this._brush.setTilePosition(0, mt);
        this._brush.setDisplaySize(ml, this.height - mt - mb);
        this.batchDraw(this._brush, 0, mt);

        this._brush.setScale(1, 1);

        // left/top
        this._brush.setSize(ml, mt);
        this._brush.setTilePosition(0, 0);
        this.batchDraw(this._brush);

        // right/top
        this._brush.setSize(mr, mt);
        this._brush.setTilePosition(texWidth - mr, 0);
        this.batchDraw(this._brush, this.width - mr, 0);

        // right/bottom
        this._brush.setSize(mr, mb);
        this._brush.setTilePosition(texWidth - mr, texHeight - mb);
        this.batchDraw(this._brush, this.width - mr, this.height - mb);

        // left/bottom
        this._brush.setSize(ml, mb);
        this._brush.setTilePosition(0, texHeight - mb);
        this.batchDraw(this._brush, 0, this.height - mb);

        this.endDraw();
    }

    setMargin(left: number, top: number, right: number, bottom: number): void {

        this.marginLeft = left;
        this.marginTop = top;
        this.marginRight = right;
        this.marginBottom = bottom;

        this.redraw();
    }

    setTexture(key: string, frame?: string | number): this {

        this.textureKey = key;
        this.textureFrame = frame;

        this.redraw();

        return this;
    }
    destroy() {
        this.scene.events.off("update", this.redraw, this);

        super.destroy()
    }
}