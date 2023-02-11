// v1.2.0


function registerNinePatchFactory() {

    Phaser.GameObjects.GameObjectFactory.register("ninePatch",
        function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, width: number, height: number, key: string, frame?: string | number) {

            return this.displayList.add(new NinePatch(this.scene, x, y, width, height, key, frame));
        });
}