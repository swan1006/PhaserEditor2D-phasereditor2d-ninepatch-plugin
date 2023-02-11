namespace phasereditor2d.ninepatch.image {

    import sceneobjects = scene.ui.sceneobjects;

    export class NinePatchImageExtension extends scene.ui.sceneobjects.BaseImageExtension {

        private static _instance: NinePatchImageExtension;
        private _help: string;

        static getInstance() {

            return this._instance ? this._instance : (this._instance = new NinePatchImageExtension());
        }

        constructor() {
            super({
                phaserTypeName: "NinePatchImage",
                typeName: "NinePatchImage",
                category: scene.SCENE_OBJECT_IMAGE_CATEGORY,
                icon: NinePatchPlugin.getInstance().getIconDescriptor(ICON_NINEPATCH_IMAGE)
            });

            this._help = ["**NinePatchImage**", 
            "The **NinePatchImage** class extends the `Phaser.GameObjects.Image` class. The idea is to draw the nine-patch in a texture and set this texture to the image object. It saves the generated texture in the textures cache, so if different objects share the same nine-patch properties (like margins), they will use the same texture from the cache.", 
            "Generating a new texture for an **NinePatchImage** object is expensive, but if you have a lot of nine-patch objects with the same properties, the dynamically generated texture is cached and generated once. This may boost the performance of your game and could be a much better alternative to the **NinePatch** class.",
            "If you use the **NinePatchImage** class in your game, you should register its factory when you create the game instance: `registerNinePatchImageFactory();`"].join("\n\n");
        }

        getHelp() {
            
            return this._help;
        }

        getCodeDOMBuilder(): scene.ui.sceneobjects.GameObjectCodeDOMBuilder {

            return new NinePatchCodeDOMBuilder("ninePatchImage");
        }

        protected newObject(scene: scene.ui.Scene, x: number, y: number, key?: string, frame?: string): NinePatchImage {

            const w = 200;
            const h = 100;

            if (key) {

                return new NinePatchImage(scene, x, y, w, h, key, frame);
            }

            return new NinePatchImage(scene, x, y, w, h);
        }

        adaptDataAfterTypeConversion(serializer: scene.core.json.Serializer, originalObject: sceneobjects.ISceneGameObject, extraData: any) {

            if ("width" in originalObject && "height" in originalObject) {

                serializer.write("width", originalObject["width"]);
                serializer.write("height", originalObject["height"]);
            }
        }
    }
}