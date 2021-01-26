import {CSSProperties} from "react";

declare global {
    interface ElementConfig { }

    interface TransitionConfig {
        delay: number;
        duration: number;
        easing: string;
    }

    interface FadeInTransitionConfig extends TransitionConfig {
        fromOpacity: number;
    }

    interface FadeOutTransitionConfig extends TransitionConfig {
        toOpacity: number;
    }


    interface SlideTransitionConfig extends TransitionConfig {
        angle: number;
        distance: number;
    }

    interface TransformInTransitionConfig extends TransitionConfig {
        fromRotation: number;
        fromScale: number;
    }

    interface TransformOutTransitionConfig extends TransitionConfig {
        toRotation: number;
        toScale: number;
    }

    interface CustomTransitionConfig extends TransitionConfig, CSSProperties { }

    interface TransitionList<T extends TransitionConfig> {
        /**
         * see `Transitions.js`
         *
         * Acceptable keys are `fade-in`, `slide-in`, `transform-in`, `custom-in`,
         * `fade-out`, `slide-out`, `transform-out`, and `custom-out`.
         */
        [key: string]: T;
    }

    interface Layer {
        id: number;
        elementName: string;
        label: string;
        config: ElementConfig;
        style: CSSProperties;
        hidden: boolean;
        transitions: TransitionList<any>;
    }

    interface LayerSelection {
        config(): ElementConfig | null;
        config(configuration: ElementConfig): LayerSelection;
        style(): CSSProperties | null;
        style(props: CSSProperties): LayerSelection;
        show(): void;
        hide(): void;
        moveUp(toTop: boolean): LayerSelection;
        moveDown(toBottom: boolean): LayerSelection;
        remove(): void;
        clone(): Layer[] | Layer;
        dom(): HTMLDivElement;
        collect(): Layer[];
    }

    interface MediaConfig extends ElementConfig {
        url: string;
        volume: number;
        playing: boolean;
        loop: false;
    }

    interface ResourceConfig extends ElementConfig {
        url: string;
    }

    interface TextConfig extends ElementConfig {
        text: string;
    }

    function on(name: string, callback: () => void): void;
    function off(name: string, callback: () => void): void;
    function addLayer(layerName: string, config: ElementConfig, style: CSSProperties): number;
    function addLayer(layer: Layer): number;
    function layer(...filters: Object[]): LayerSelection;
    function bulkUpdate(callback: () => void): void;

    const settings: Object;
}
