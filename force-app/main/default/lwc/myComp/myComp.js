import { LightningElement } from "lwc";

export default class MyComp extends LightningElement {
    connectedCallback() {
        var c = "this should be fixed";
        var b = "bad format";
        let resStr = b + ", " + c; //both vars are used now
        return resStr;
    }

    badFormattedMethod() {
        return "bad format";
    }
}
