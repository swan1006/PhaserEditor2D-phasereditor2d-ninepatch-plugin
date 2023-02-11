namespace phasereditor2d.ninepatch.renderTexture {

    export class NinePatchRenderTexture extends Phaser.GameObjects.RenderTexture implements scene.ui.sceneobjects.ISceneGameObject {

        private _editorSupport: NinePatchRenderTextureEditorSupport;

        private _key: string;
        private _frame: string | number | undefined;
        private _drawCenter = true;
        private _marginLeft = 20;
        private _marginTop = 20;
        private _marginRight = 20;
        private _marginBottom = 20;
        private _brush: Phaser.GameObjects.TileSprite;
        private _dirty: boolean;
        private _updateListener: () => void;
        private _textureImage: Phaser.GameObjects.Image;

        constructor(scene: scene.ui.Scene, x: number, y: number, width: number, height: number, key?: string, frame?: string | number) {
            super(scene, x, y, width, height);

            this._editorSupport = new NinePatchRenderTextureEditorSupport(this, scene);

            this._key = key;
            this._frame = frame;

            this._brush = new Phaser.GameObjects.TileSprite(scene, 0, 0, 1, 1, key, frame);
            this._brush.setOrigin(0, 0);
            this._textureImage = new Phaser.GameObjects.Image(scene, 0, 0, key, frame);

            this._updateListener = () => {

                if (this._dirty) {

                    this.redraw();
                }
            };

            this.scene.events.on("update", this._updateListener);
        }

        destroy() {

            this.scene?.events?.removeListener("update", this._updateListener);

            this._brush.destroy();
            this._textureImage.destroy();

            super.destroy();
        }

        getEditorSupport(): scene.ui.sceneobjects.GameObjectEditorSupport<scene.ui.sceneobjects.ISceneGameObject> {

            return this._editorSupport;
        }

        private redraw() {

            this._dirty = false;

            drawNinePatch({
                obj: this,
                rt: this,
                brush: this._brush,
                textureImage: this._textureImage,
                scene: this.scene
            });
        }

        setSize(width: number, height: number): this {

            super.setSize(width, height);

            this.redraw();

            return this;
        }

        set drawCenter(drawCenter: boolean) {

            this._dirty = this._dirty || drawCenter !== this._drawCenter;

            this._drawCenter = drawCenter;
        }

        get drawCenter() {

            return this._drawCenter;
        }

        set marginLeft(marginLeft: number) {

            this._dirty = this._dirty || marginLeft !== this._marginLeft;

            this._marginLeft = marginLeft;
        }

        get marginLeft() {

            return this._marginLeft;
        }

        set marginTop(marginTop: number) {

            this._dirty = this._dirty || marginTop !== this._marginTop;

            this._marginTop = marginTop;
        }

        get marginTop() {

            return this._marginTop;
        }

        set marginRight(marginRight: number) {

            this._dirty = this._dirty || marginRight !== this._marginRight;

            this._marginRight = marginRight;
        }

        get marginRight() {

            return this._marginRight;
        }

        set marginBottom(marginBottom: number) {

            this._dirty = this._dirty || marginBottom !== this._marginBottom;

            this._marginBottom = marginBottom;
        }

        get marginBottom() {

            return this._marginBottom;
        }

        setTexture(key: string, frame?: string | number) {

            this._dirty = this._dirty || key !== this._key || frame !== this._frame;

            this._key = key;
            this._frame = frame;

            this._brush.setTexture(this._key, this._frame);
            this._textureImage.setTexture(this._key, this._frame);
        }

        get textureKey() {

            return this._key;
        }

        get textureFrame() {

            return this._frame;
        }
    }
}