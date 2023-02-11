namespace phasereditor2d.ninepatch {

    export function drawNinePatch(config: {
        obj: INinePatch,
        rt: Phaser.GameObjects.RenderTexture,
        brush: Phaser.GameObjects.TileSprite,
        textureImage: Phaser.GameObjects.Image,
        scene: Phaser.Scene,
    }) {

        const { obj, rt, brush, textureImage, scene } = config;

        rt.clear();


        if (!scene.textures.getFrame(obj.textureKey, obj.textureFrame)) {

            const gr = new Phaser.GameObjects.Graphics(scene);

            gr.fillStyle(0);
            gr.fillRect(0, 0, obj.width, obj.height);
            gr.lineStyle(2, 0x00ff00);
            gr.strokeRect(0, 0, obj.width, obj.height);
            gr.strokeLineShape(new Phaser.Geom.Line(0, 0, obj.width, obj.height));

            rt.draw(gr);

            return;
        }

        rt.beginDraw();

        const texWidth = textureImage.width;
        const texHeight = textureImage.height;

        const ml = obj.marginLeft;
        const mt = obj.marginTop;
        const mr = obj.marginRight;
        const mb = obj.marginBottom;

        // center
        if (obj.drawCenter) {

            brush.setSize(texWidth - ml - mr, texHeight - mt - mb);
            brush.setTilePosition(ml, mt);
            brush.setDisplaySize(obj.width - ml - mr, obj.height - mt - mb);
            rt.batchDraw(brush, ml, mt);
        }

        // top
        brush.setSize(texWidth - ml - mr, mt);
        brush.setTilePosition(ml, 0);
        brush.setDisplaySize(obj.width - ml - mr, mt);
        rt.batchDraw(brush, ml, 0);

        // right
        brush.setSize(mr, texHeight - mt - mb);
        brush.setTilePosition(texWidth - mr, mt);
        brush.setDisplaySize(mr, obj.height - mt - mb);
        rt.batchDraw(brush, obj.width - mr, mt);

        // bottom
        brush.setSize(texWidth - ml - mr, mb);
        brush.setTilePosition(ml, texHeight - mb);
        brush.setDisplaySize(obj.width - ml - mr, mb);
        rt.batchDraw(brush, ml, obj.height - mb);

        // left
        brush.setSize(ml, texHeight - mt - mb);
        brush.setTilePosition(0, mt);
        brush.setDisplaySize(ml, obj.height - mt - mb);
        rt.batchDraw(brush, 0, mt);

        brush.setScale(1, 1);

        // left/top
        brush.setSize(ml, mt);
        brush.setTilePosition(0, 0);
        rt.batchDraw(brush);

        // right/top
        brush.setSize(mr, mt);
        brush.setTilePosition(texWidth - mr, 0);
        rt.batchDraw(brush, obj.width - mr, 0);

        // right/bottom
        brush.setSize(mr, mb);
        brush.setTilePosition(texWidth - mr, texHeight - mb);
        rt.batchDraw(brush, obj.width - mr, obj.height - mb);

        // left/bottom
        brush.setSize(ml, mb);
        brush.setTilePosition(0, texHeight - mb);
        rt.batchDraw(brush, 0, obj.height - mb);

        rt.endDraw();
    }
}
