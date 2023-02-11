
namespace phasereditor2d.ninepatch.image {

    import sceneobjects = scene.ui.sceneobjects;

    export class NinePatchImageEditorSupport extends sceneobjects.BaseImageEditorSupport<NinePatchImage> {

        constructor(obj: NinePatchImage, scene: phasereditor2d.scene.ui.Scene) {
            super(NinePatchImageExtension.getInstance(), obj, scene);

            this.addComponent(
                new sceneobjects.SizeComponent(obj),
                new NinePatchComponent(obj));
        }

        setInteractive() {

            this.getObject().setInteractive(new Phaser.Geom.Rectangle(0, 0, 1, 1), (shape, x, y, obj: NinePatchImage) => {

                return x >= 0 && x <= obj.width && y >= 0 && y <= obj.height;
            });
        }
    }
}