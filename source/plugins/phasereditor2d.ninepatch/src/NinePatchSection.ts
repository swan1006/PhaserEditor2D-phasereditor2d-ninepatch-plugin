namespace phasereditor2d.ninepatch {

    import controls = colibri.ui.controls;
    import sceneobjects = phasereditor2d.scene.ui.sceneobjects;

    export class NinePatchSection extends scene.ui.sceneobjects.SceneGameObjectSection<INinePatch> {

        static SECTION_ID = "phasereditor2d.ninepatch.NinePatchSection";

        constructor(page: controls.properties.PropertyPage) {
            super(page, NinePatchSection.SECTION_ID, "Nine Patch", false, false);
        }

        createForm(parent: HTMLDivElement) {

            const comp = this.createGridElementWithPropertiesXY(parent);

            this.createPropertyXYRow(comp, NinePatchComponent.marginHorizontal);
            this.createPropertyXYRow(comp, NinePatchComponent.marginVertical);

            const field = this.createPropertyBoolean(comp, NinePatchComponent.drawCenter);
            field.labelElement.style.gridColumn = "2 / span 2";
        }

        canEdit(obj: any, n: number): boolean {

            return sceneobjects.GameObjectEditorSupport
                .hasObjectComponent(obj, NinePatchComponent);
        }

        canEditNumber(n: number): boolean {

            return n > 0;
        }

        getSectionHelpPath() {
            // return "scene-editor/tile-sprite-object.html#tile-sprite-properties";
            // TODO
            return "";
        }

        createMenu(menu: controls.Menu) {

            this.createToolMenuItem(menu, sceneobjects.SizeTool.ID);

            menu.addSeparator();

            super.createMenu(menu);
        }
    }
}