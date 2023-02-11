namespace phasereditor2d.ninepatch.renderTexture {

    export class NinePatchRenderTextureMigrations extends scene.ui.SceneDataMigrationExtension {

        async migrate(data: scene.core.json.ISceneData): Promise<void> {

            this.migrateObjects(data.displayList);
        }

        private migrateObjects(list: scene.core.json.IObjectData[]) {

            for (const obj of list) {

                if ("ninePatchWidth" in obj) {

                    obj["width"] = obj["ninePatchWidth"];

                    delete obj["ninePatchWidth"];

                    console.log(`NinePatchMigrations.ninePatchWidth: [${obj.id}]`);
                }

                if ("ninePatchHeight" in obj) {

                    obj["height"] = obj["ninePatchHeight"];

                    delete obj["ninePatchHeight"];

                    console.log(`NinePatchMigrations.ninePatchHeight: [${obj.id}]`);
                }

                if (obj.list) {

                    this.migrateObjects(obj.list);
                }
            }
        }
    }
}