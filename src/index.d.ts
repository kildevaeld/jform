import { Form } from './Form';
import * as ed from './Editors';
export default Form;
export * from './Form';
export declare module editors {
    var Editor: typeof ed.Editor;
    function extend(name: string, prototype: any): ed.IEditor;
}
