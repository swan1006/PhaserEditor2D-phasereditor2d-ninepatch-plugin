namespace phasereditor2d.ninepatch {

    import code = scene.core.code;
    import sceneobjects = scene.ui.sceneobjects;

    export class NinePatchCodeDOMBuilder extends sceneobjects.BaseImageCodeDOMBuilder {

        buildCreatePrefabInstanceCodeDOM(args: sceneobjects.IBuildPrefabConstructorCodeDOMArgs) {

            const obj = args.obj as INinePatch;
            const support = obj.getEditorSupport();
            const call = args.methodCallDOM;

            call.arg(args.sceneExpr);

            this.buildCreatePrefabInstanceCodeDOM_XY_Arguments(args);

            this.buildCreatePrefabInstanceCodeDOM_Size_Arguments(args);

            if (support.isUnlockedProperty(sceneobjects.TextureComponent.texture)) {

                this.addTextureFrameArgsToObjectFactoryMethodCallDOM(
                    args.methodCallDOM, obj);
            }
        }

        buildPrefabConstructorDeclarationCodeDOM(args: sceneobjects.IBuildPrefabConstructorDeclarationCodeDOM): void {

            const ctr = args.ctrDeclCodeDOM;

            ctr.arg("x", "number", true);
            ctr.arg("y", "number", true);
            ctr.arg("width", "number", true);
            ctr.arg("height", "number", true);
            ctr.arg("texture", "string", true);
            ctr.arg("frame", "number | string", true);
        }

        buildPrefabConstructorDeclarationSupperCallCodeDOM(
            args: sceneobjects.IBuildPrefabConstructorDeclarationSupperCallCodeDOMArgs): void {

            const call = args.superMethodCallCodeDOM;

            this.buildPrefabConstructorDeclarationSupperCallCodeDOM_XYParameters(args);

            this.buildPrefabConstructorDeclarationSupperCallCodeDOM_SizeParameters(args)

            this.buildPrefabConstructorDeclarationSupperCallCodeDOM_TextureParameters(args, call);
        }

        buildCreateObjectWithFactoryCodeDOM(args: sceneobjects.IBuildObjectFactoryCodeDOMArgs): code.MethodCallCodeDOM {

            const factory = this.getFactoryMethodName();
            const obj = args.obj as INinePatch;
            const call = new code.MethodCallCodeDOM(factory, args.gameObjectFactoryExpr);

            call.argFloat(obj.x);
            call.argFloat(obj.y);
            call.argFloat(obj.width);
            call.argFloat(obj.height);

            this.addTextureFrameArgsToObjectFactoryMethodCallDOM(call, obj);

            return call;
        }
    }
}