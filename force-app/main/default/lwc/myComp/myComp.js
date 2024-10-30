import { LightningElement } from "lwc";

export default class MyComp extends LightningElement {
    connectedCallback() {
        var c = "this should be fixed";
        var b = "bad format";
        const resStr = c + ", " + b;
        return resStr;
    }

    badFormattedMethod() {
        return "bad format";
    }
}
