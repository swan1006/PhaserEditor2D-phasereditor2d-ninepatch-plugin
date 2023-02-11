namespace phasereditor2d.ninepatch {

    export const ICON_NINEPATCH = "ninepatch";
    export const ICON_NINEPATCH_IMAGE = "ninepatch-image";
    export const ICON_NINEPATCH_CONTAINER = "ninepatch-container";
    export const CAT_NINEPATCH = "phasereditor2d.ninepatch.category";
    export const CMD_CREATE_NINEPATCH_USER_FILES = "phasereditor2d.ninepatch.CreateNinePatchUserFiles";

    export class NinePatchPlugin extends colibri.Plugin {

        private static _instance = new NinePatchPlugin();

        static getInstance() {

            return this._instance;
        }

        constructor() {
            super("phasereditor2d.ninepatch");
        }

        registerExtensions(reg: colibri.ExtensionRegistry) {

            const VER = "1.1.0";

            console.log(`%c %c phasereditor2d-ninepatch-plugin %c v${VER} %c %c https://github.com/PhaserEditor2D/phasereditor2d-ninepatch-plugin `,
                "background-color:brown",
                "background-color:#3f3f3f;color:whitesmoke",
                "background-color:orange;color:black",
                "background-color:brown",
                "background-color:silver",
            );

            reg.addExtension(colibri.ui.ide.IconLoaderExtension.withPluginFiles(this, [
                ICON_NINEPATCH, ICON_NINEPATCH_IMAGE, ICON_NINEPATCH_CONTAINER
            ]));

            reg.addExtension(renderTexture.NinePatchRenderTextureExtension.getInstance());
            reg.addExtension(image.NinePatchImageExtension.getInstance());
            reg.addExtension(container.NinePatchContainerExtension.getInstance());

            reg.addExtension(new scene.ui.editor.properties.SceneEditorPropertySectionExtension(
                page => new NinePatchSection(page),
                page => new container.NinePatchContainerSection(page),
            ));

            reg.addExtension(new colibri.ui.ide.PluginResourceLoaderExtension(() =>

                NinePatchCodeResources.getInstance().preload()
            ));

            NinePatchCodeResources.getInstance().registerCommands(CAT_NINEPATCH, "Nine Patch", reg);

            // migrations

            reg.addExtension(new renderTexture.NinePatchRenderTextureMigrations());
        }
    }

    if (phasereditor2d.ide.VER < "3.33.2") {

        alert("The 'phasereditor2d-ninepatch-plugin' cannot be installed."
            + "\nIt requires Phaser Editor 2D v3.33.2 or a newer version.")

    } else {

        colibri.Platform.addPlugin(NinePatchPlugin.getInstance());
    }
}