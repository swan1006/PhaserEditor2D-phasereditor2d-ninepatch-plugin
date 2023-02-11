// version
/*import Phaser from "phaser";*/
/*import NinePatch from "./NinePatch";*/
/*export default */function registerNinePatchFactory() {

    Phaser.GameObjects.GameObjectFactory.register("ninePatch",
        function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, width: number, height: number, key: string, frame?: string | number) {

            return this.displayList.add(new NinePatch(this.scene, x, y, width, height, key, frame));
        });
}