export declare type PR<K extends string, V = string> = Partial<Record<K, V>>;
export declare type Color = 'neutral' | 'solid' | 'shadow' | 'primary' | 'secondary' | 'line' | 'background' | 'surface';
export declare type Font = 'typography' | 'code';
export declare type Size = 'radius' | 'lineWidth';
export declare type Icon = 'h1' | 'h2' | 'h3' | 'loading' | 'quote' | 'code' | 'table' | 'divider' | 'image' | 'brokenImage' | 'bulletList' | 'orderedList' | 'taskList' | 'bold' | 'italic' | 'inlineCode' | 'strikeThrough' | 'link' | 'leftArrow' | 'rightArrow' | 'upArrow' | 'downArrow' | 'alignLeft' | 'alignRight' | 'alignCenter' | 'delete' | 'select' | 'unchecked' | 'checked' | 'undo' | 'redo' | 'liftList' | 'sinkList';
export declare type Slots = {
    icon: (id: Icon, config?: Record<string, string | number | boolean>) => HTMLElement;
    label: (id: Icon, config?: Record<string, string | number | boolean>) => string;
};
export declare type MixinFactory = {
    scrollbar: (direction?: 'x' | 'y') => string;
    shadow: () => string;
    border: (direction?: 'left' | 'right' | 'top' | 'bottom') => string;
};
export declare type ThemePack = {
    scope?: string;
    color?: PR<Color>;
    font?: PR<Font, string[]>;
    size?: PR<Size>;
    mixin?: (utils: Omit<ThemeTool, 'slots' | 'global' | 'mixin'>) => Partial<MixinFactory>;
    slots?: (utils: Omit<ThemeTool, 'slots' | 'global'>) => Partial<Slots>;
    global?: (utils: Omit<ThemeTool, 'global'>) => void;
};
export declare type ThemeTool = {
    palette: (key: Color, alpha?: number) => string;
    mixin: MixinFactory;
    slots: Slots;
    font: Record<Font, string>;
    size: Record<Size, string>;
};
//# sourceMappingURL=types.d.ts.map