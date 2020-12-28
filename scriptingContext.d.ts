import {CSSProperties} from "react";

declare global {
    interface ElementConfig { }

    interface Layer {
        id: number;
        elementName: string;
        label: string;
        config: ElementConfig;
        style: CSSProperties;
        hidden: boolean;
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
        dom(): Object;
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
