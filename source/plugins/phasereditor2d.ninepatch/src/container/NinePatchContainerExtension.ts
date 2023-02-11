namespace phasereditor2d.ninepatch.container {

    import sceneobjects = scene.ui.sceneobjects;

    export class NinePatchContainerExtension extends scene.ui.sceneobjects.BaseImageExtension {

        private static _instance: NinePatchContainerExtension;
        private _help: string;

        static getInstance() {

            return this._instance ? this._instance : (this._instance = new NinePatchContainerExtension());
        }

        constructor() {
            super({
                phaserTypeName: "NinePatchContainer",
                typeName: "NinePatchContainer",
                category: scene.SCENE_OBJECT_IMAGE_CATEGORY,
                icon: NinePatchPlugin.getInstance().getIconDescriptor(ICON_NINEPATCH_CONTAINER)
            });
            
            this._help = [
                "**NinePatchContainer**",
                "The **NinePatchContainer** class extends the `Phaser.GameObjects.Container` class. The idea is to group the nine patches inside a container. This implementation has the advantage of a low memory consumption and a fast rendering. Each patch is an image with a frame of the main texture.",
                "If you use the **NinePatchContainer** class in your game, you should register its factory when you create the game instance: `registerNinePatchContainerFactory();`"
            ].join("\n\n");
        }

        getHelp() {
            
            return this._help;
        }

        getCodeDOMBuilder(): scene.ui.sceneobjects.GameObjectCodeDOMBuilder {

            return new NinePatchCodeDOMBuilder("ninePatchContainer");
        }

        protected newObject(scene: scene.ui.Scene, x: number, y: number, key?: string, frame?: string): NinePatchContainer {

            const w = 200;
            const h = 100;

            return new NinePatchContainer(scene, x, y, w, h, key ?? "__MISSING", frame);
        }

        adaptDataAfterTypeConversion(serializer: scene.core.json.Serializer, originalObject: sceneobjects.ISceneGameObject, extraData: any) {

            if ("width" in originalObject && "height" in originalObject) {

                serializer.write("width", originalObject["width"]);
                serializer.write("height", originalObject["height"]);
            }
        }
    }
}