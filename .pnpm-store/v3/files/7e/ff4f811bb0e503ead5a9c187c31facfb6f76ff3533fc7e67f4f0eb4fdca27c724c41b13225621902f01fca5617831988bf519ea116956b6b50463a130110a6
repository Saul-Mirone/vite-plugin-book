import type { FullIconifyIcon } from '../icon';
import type { FullIconCustomisations } from '../customisations';
/**
 * Interface for getSVGData() result
 */
export interface IconifyIconBuildResult {
    attributes: {
        width: string;
        height: string;
        preserveAspectRatio: string;
        viewBox: string;
    };
    body: string;
    inline?: boolean;
}
/**
 * Get SVG attributes and content from icon + customisations
 *
 * Does not generate style to make it compatible with frameworks that use objects for style, such as React.
 * Instead, it generates 'inline' value. If true, rendering engine should add verticalAlign: -0.125em to icon.
 *
 * Customisations should be normalised by platform specific parser.
 * Result should be converted to <svg> by platform specific parser.
 * Use replaceIDs to generate unique IDs for body.
 */
export declare function iconToSVG(icon: FullIconifyIcon, customisations: FullIconCustomisations): IconifyIconBuildResult;
