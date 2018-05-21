export interface IRiftRoute {
  path: string;
  component: Function;
  children?: IRiftRoute[];
  onEnter?: Function;
  onLeave?: Function;
}
