export interface IRiftRoute {
    path: string;
    component: any;
    children?: IRiftRoute[];
    onEnter?: () => void;
    onLeave?: () => void;
}
