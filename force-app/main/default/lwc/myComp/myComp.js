import { LightningElement, track } from "lwc";
import getLabel from "@salesforce/apex/BackendClass.methodName";

export default class MyComp extends LightningElement {
    @track
    label1 = "";

    async connectedCallback() {
        try {
            const label = await getLabel();
            this.label1 = label;
        } catch (e) {
            console.log("error: " + e);
        }
    }

    badFormattedMethod() {
        return "bad format";
    }
}
