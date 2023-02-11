
namespace phasereditor2d.ninepatch.renderTexture {

    import sceneobjects = scene.ui.sceneobjects;

    export class NinePatchRenderTextureEditorSupport extends sceneobjects.BaseImageEditorSupport<NinePatchRenderTexture> {

        constructor(obj: NinePatchRenderTexture, scene: phasereditor2d.scene.ui.Scene) {
            super(NinePatchRenderTextureExtension.getInstance(), obj, scene);

            this.addComponent(
                new sceneobjects.SizeComponent(obj),
                new NinePatchComponent(obj));
        }

        getPropertyDefaultValue(prop: sceneobjects.IProperty<any>) {

            if (prop === sceneobjects.OriginComponent.originX || prop === sceneobjects.OriginComponent.originY) {

                return 0;
            }

            return super.getPropertyDefaultValue(prop);
        }

        setInteractive() {

            this.getObject().setInteractive();
        }
    }
}