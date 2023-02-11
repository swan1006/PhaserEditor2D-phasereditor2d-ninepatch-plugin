namespace phasereditor2d.ninepatch.container {

    import controls = colibri.ui.controls;
    import sceneobjects = phasereditor2d.scene.ui.sceneobjects;

    export class NinePatchContainerSection extends scene.ui.sceneobjects.SceneGameObjectSection<INinePatch> {

        static SECTION_ID = "phasereditor2d.ninepatch.container.NinePatchContainerSection";

        constructor(page: controls.properties.PropertyPage) {
            super(page, NinePatchContainerSection.SECTION_ID, "Nine Patch Container", false, false);
        }

        createForm(parent: HTMLDivElement) {

            const comp = this.createGridElement(parent);
            comp.style.gridTemplateColumns = "auto auto 1fr";

            this.createPropertyFloatRow(comp, NinePatchContainerComponent.ninePatchContainerOriginX);

            this.createPropertyFloatRow(comp, NinePatchContainerComponent.ninePatchContainerOriginY);

            this.createPropertyBoolean(comp, NinePatchContainerComponent.ninePatchContainerTintFill);

            this.createPropertyColorRow(comp, NinePatchContainerComponent.ninePatchContainerTint, false);
        }

        canEdit(obj: any, n: number): boolean {

            return sceneobjects.GameObjectEditorSupport
                .hasObjectComponent(obj, NinePatchContainerComponent);
        }

        canEditNumber(n: number): boolean {

            return n > 0;
        }

        getSectionHelpPath() {
            // return "scene-editor/tile-sprite-object.html#tile-sprite-properties";
            // TODO
            return "";
        }
    }
}