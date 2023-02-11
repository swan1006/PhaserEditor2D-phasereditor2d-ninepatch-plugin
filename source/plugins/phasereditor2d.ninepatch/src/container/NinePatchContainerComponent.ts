namespace phasereditor2d.ninepatch.container {

    import sceneobjects = scene.ui.sceneobjects;

    export class NinePatchContainerComponent extends sceneobjects.Component<NinePatchContainer> {

        static ninePatchContainerOriginX = sceneobjects.SimpleProperty("ninePatchContainerOriginX", 0.5, "Origin X", "Container's origin X.", false);
        static ninePatchContainerOriginY = sceneobjects.SimpleProperty("ninePatchContainerOriginY", 0.5, "Origin Y", "Container's origin Y.", false);
        static ninePatchContainerTintFill = sceneobjects.SimpleProperty("ninePatchContainerTintFill", false, "Tint Fill", "Tint fill?", false);
        static ninePatchContainerTint = sceneobjects.TintProperty("ninePatchContainerTint", "Tint", "The tint of every image in the ninepatch container.");

        constructor(obj: NinePatchContainer) {
            super(obj, [
                NinePatchContainerComponent.ninePatchContainerOriginX,
                NinePatchContainerComponent.ninePatchContainerOriginY,
                NinePatchContainerComponent.ninePatchContainerTintFill,
                NinePatchContainerComponent.ninePatchContainerTint
            ]);
        }

        buildSetObjectPropertiesCodeDOM(args: scene.ui.sceneobjects.ISetObjectPropertiesCodeDOMArgs): void {

            this.buildSetObjectPropertyCodeDOM_FloatProperty(args,
                NinePatchContainerComponent.ninePatchContainerOriginX,
                NinePatchContainerComponent.ninePatchContainerOriginY,
            );

            this.buildSetObjectPropertyCodeDOM_BooleanProperty(args, NinePatchContainerComponent.ninePatchContainerTintFill);
            this.buildSetObjectPropertyCodeDOM_FloatProperty(args, NinePatchContainerComponent.ninePatchContainerTint);
        }
    }
}