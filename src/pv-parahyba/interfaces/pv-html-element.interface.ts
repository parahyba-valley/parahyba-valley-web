import IPVObject from "./pv-object.interface";

export type PVElement = {
  isPVComponent?: boolean;
  compiled?: boolean;
  pvUID?: number;
  properties?: IPVObject;
}

export default interface PVHTMLElement extends HTMLElement {
  __pv__: PVElement,
};