export class BrowserRouter {
    constructor(...args: any[]);
    componentDidMount(): void;
    forceUpdate(callback: any): void;
    render(): any;
    setState(partialState: any, callback: any): void;
}
export namespace BrowserRouter {
    namespace propTypes {
        function basename(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace basename {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function children(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace children {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function forceRefresh(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace forceRefresh {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function getUserConfirmation(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace getUserConfirmation {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function keyLength(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace keyLength {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
    }
}
export class HashRouter {
    constructor(...args: any[]);
    componentDidMount(): void;
    forceUpdate(callback: any): void;
    render(): any;
    setState(partialState: any, callback: any): void;
}
export namespace HashRouter {
    namespace propTypes {
        function basename(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace basename {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function children(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace children {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function getUserConfirmation(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace getUserConfirmation {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function hashType(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace hashType {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
    }
}
export namespace Link {
    const $$typeof: symbol;
    const displayName: any;
    namespace propTypes {
        function innerRef(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace innerRef {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function onClick(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace onClick {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function replace(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace replace {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function target(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace target {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function to(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function render(_ref2: any, forwardedRef: any): any;
    namespace render {
        const displayName: string;
    }
}
export const MemoryRouter: any;
export namespace NavLink {
    const $$typeof: symbol;
    const displayName: any;
    namespace propTypes {
        function activeClassName(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace activeClassName {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function activeStyle(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace activeStyle {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function className(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace className {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function exact(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace exact {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function innerRef(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace innerRef {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function isActive(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace isActive {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function location(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace location {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function onClick(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace onClick {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function replace(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace replace {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function sensitive(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace sensitive {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function strict(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace strict {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function style(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace style {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function target(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace target {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function to(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function render(_ref: any, forwardedRef: any): any;
    namespace render {
        const displayName: string;
    }
}
export const Prompt: any;
export const Redirect: any;
export const Route: any;
export const Router: any;
export const StaticRouter: any;
export const Switch: any;
export const generatePath: any;
export const matchPath: any;
export const useHistory: any;
export const useLocation: any;
export const useParams: any;
export const useRouteMatch: any;
export const withRouter: any;
