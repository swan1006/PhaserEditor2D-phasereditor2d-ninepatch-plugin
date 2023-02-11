// v1.2.0
import Phaser from "phaser";
import NinePatchImage from "./NinePatchImage";
export default function registerNinePatchImageFactory() {
    Phaser.GameObjects.GameObjectFactory.register("ninePatchImage", function (x, y, width, height, key, frame) {
        return this.displayList.add(new NinePatchImage(this.scene, x, y, width, height, key, frame));
    });
}
