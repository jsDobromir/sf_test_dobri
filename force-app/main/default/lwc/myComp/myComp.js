import { LightningElement } from "lwc";

export default class MyComp extends LightningElement {
    connectedCallback() {
        var c = "this should be fixed";
        var b = "bad format";
        const retStr = c + ", " + b;
        return retStr;
    }

    badFormattedMethod() {
        return "bad format";
    }
}
