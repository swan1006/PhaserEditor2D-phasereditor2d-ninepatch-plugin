// version
/*import Phaser from "phaser";*/
/*import NinePatchContainer from "./NinePatchContainer";*/
/*export default */function registerNinePatchContainerFactory() {

    Phaser.GameObjects.GameObjectFactory.register("ninePatchContainer",
        function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, width: number, height: number, key: string, frame?: string | number) {

            return this.displayList.add(new NinePatchContainer(this.scene, x, y, width, height, key, frame));
        });
}