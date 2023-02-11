namespace phasereditor2d.ninepatch.image {

    import sceneobjects = scene.ui.sceneobjects;

    export class NinePatchImage extends Phaser.GameObjects.Image implements INinePatch, sceneobjects.ISceneGameObject {

        private _editorSupport: NinePatchImageEditorSupport;
        private _settingCacheTexture = false;
        textureKey: string;
        textureFrame: string | number | undefined;
        drawCenter = true;
        marginLeft = 20;
        marginTop = 20;
        marginRight = 20;
        marginBottom = 20;
        private _hashKey: string;
        private _dirtyManager: sceneobjects.DirtyObjectManager;

        constructor(scene: scene.ui.Scene, x: number, y: number, width: number, height: number, key?: string, frame?: string | number) {
            super(scene, x, y, key, frame);

            this.width = width;
            this.height = height;

            this.textureKey = key;
            this.textureFrame = frame;

            this._editorSupport = new NinePatchImageEditorSupport(this, scene);

            this._dirtyManager = new sceneobjects.DirtyObjectManager(this);

            this._dirtyManager.addComponents(
                NinePatchComponent,
                sceneobjects.TextureComponent,
                sceneobjects.SizeComponent);

            this._dirtyManager.start(() => this.redraw());
        }

        private redraw() {

            const hashKey = this._dirtyManager.getKey();

            if (this.scene.textures.exists(hashKey)) {

                // console.log(`NinePatchImage.getFromCache(${hashKey})`);

            } else {

                // console.log(`NinePatchImage.generateTexture(${hashKey})`);

                const rt = new Phaser.GameObjects.RenderTexture(this.scene, 0, 0, this.width, this.height);
                const brush = new Phaser.GameObjects.TileSprite(this.scene, 0, 0, this.width, this.height, this.textureKey, this.textureFrame);
                brush.setOrigin(0, 0);
                const textureImage = new Phaser.GameObjects.Image(this.scene, 0, 0, this.textureKey, this.textureFrame);

                drawNinePatch({
                    obj: this,
                    rt,
                    brush,
                    textureImage,
                    scene: this.scene
                });

                brush.destroy();
                textureImage.destroy();

                rt.saveTexture(hashKey);
            }

            this._settingCacheTexture = true;
            this._hashKey = hashKey;
            this.setTexture(hashKey);
            this._settingCacheTexture = false;

            this.collectGarbage();
        }

        private collectGarbage() {

            const scene = this.scene as scene.ui.Scene;

            const usedTexture = new Set();

            scene.visitAll(obj => {

                const support = NinePatchImageEditorSupport.getEditorSupport(obj);

                if (support) {

                    const ninePatch = obj as NinePatchImage;
                    usedTexture.add(ninePatch._hashKey);
                }
            });

            for (const key of scene.textures.getTextureKeys()) {

                if (key.startsWith("NinePatchImage[")) {

                    if (!usedTexture.has(key)) {

                        // console.log("destroy " + key);

                        scene.textures.remove(key);
                    }
                }
            }
        }

        setTexture(key: string, frame?: string | number): this {

            if (!this._settingCacheTexture) {

                this.textureKey = key;
                this.textureFrame = frame;
            }

            return super.setTexture(key, frame);
        }

        getEditorSupport() {

            return this._editorSupport;
        }
    }
}