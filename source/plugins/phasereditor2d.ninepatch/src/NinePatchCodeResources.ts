
namespace phasereditor2d.ninepatch {

    export class NinePatchCodeResources extends scene.core.code.CodeResources {

        private static _instance: NinePatchCodeResources;

        static getInstance() {

            return this._instance ? this._instance : (this._instance = new NinePatchCodeResources());
        }

        private constructor() {
            super(NinePatchPlugin.getInstance());

            for (const clsName of ["NinePatch", "NinePatchImage", "NinePatchContainer"]) {

                this.addCodeResource(clsName);
                this.addCodeResource(`register${clsName}Factory`);
            }

            this.addCodeDefsResource("ninepatch");
        }
    }
}