namespace phasereditor2d.ninepatch {

    import sceneobjects = scene.ui.sceneobjects;

    export class NinePatchComponent extends sceneobjects.Component<INinePatch> {

        static marginLeft = sceneobjects.SimpleProperty("marginLeft", 20, "Left", "Margin left.", false);
        static marginRight = sceneobjects.SimpleProperty("marginRight", 20, "Right", "Margin right.", false);
        static marginTop = sceneobjects.SimpleProperty("marginTop", 20, "Top", "Margin top.", false);
        static marginBottom = sceneobjects.SimpleProperty("marginBottom", 20, "Bottom", "Margin bottom.", false);
        static marginHorizontal: sceneobjects.IPropertyXY = {
            label: "Margin",
            x: NinePatchComponent.marginLeft,
            y: NinePatchComponent.marginRight
        };
        static marginVertical: sceneobjects.IPropertyXY = {
            label: "Margin",
            x: NinePatchComponent.marginTop,
            y: NinePatchComponent.marginBottom
        };

        static drawCenter = sceneobjects.SimpleProperty("drawCenter", true, "Draw Center", "Draw center.", false);

        constructor(obj: INinePatch) {
            super(obj, [
                NinePatchComponent.marginLeft,
                NinePatchComponent.marginRight,
                NinePatchComponent.marginTop,
                NinePatchComponent.marginBottom,
                NinePatchComponent.drawCenter
            ]);
        }

        buildSetObjectPropertiesCodeDOM(args: scene.ui.sceneobjects.ISetObjectPropertiesCodeDOMArgs): void {

            this.buildSetObjectPropertyCodeDOM_FloatProperty(args,
                NinePatchComponent.marginLeft,
                NinePatchComponent.marginTop,
                NinePatchComponent.marginRight,
                NinePatchComponent.marginBottom,
            );

            this.buildSetObjectPropertyCodeDOM_BooleanProperty(args,
                NinePatchComponent.drawCenter
            );
        }
    }
}