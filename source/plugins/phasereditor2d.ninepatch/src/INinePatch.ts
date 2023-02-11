namespace phasereditor2d.ninepatch {

    export interface INinePatch extends scene.ui.sceneobjects.ISceneGameObject {

        x: number;
        y: number;
        width: number;
        height: number;
        
        drawCenter: boolean;
        marginLeft: number;
        marginRight: number;
        marginTop: number;
        marginBottom: number;
        textureKey: string;
        textureFrame: string|number;

        setTexture(key: string, frame?: string | number): void;
        setSize(width: number, height: number): this;
    }
}