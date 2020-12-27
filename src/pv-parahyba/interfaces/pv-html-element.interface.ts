export type PVElement = {
  isPVComponent?: boolean;
  compiled?: boolean;
  pvUID?: number;
  properties?: Array<string>;
}

export default interface PVHTMLElement extends HTMLElement {
  __pv__: PVElement,
};