import { LightningElement } from "lwc";

export default class MyComp extends LightningElement {
  connectedCallback() {
    var b = "bad format";
    return b;
  }

  badFormattedMethod() {
    return "bad format";
  }
}
