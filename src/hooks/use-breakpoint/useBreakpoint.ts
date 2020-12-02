import type { TBreakpoint, TBreakpointNames } from "@theme";
import { theme } from "@theme";

/**
 * Returns an *Emotion object styles* - friendly media query for a breakpoint name.
 * @param  name The breakpoint name.
 * @return      The media query string, or null
 *
 * @ignore
 */
const getBreakpoint = (name: TBreakpointNames): string | null => {
  const breakpoints: TBreakpoint[] = theme?.breakpoints;
  if (!breakpoints) return null;

  const breakpoint: TBreakpoint = breakpoints.find(
    /**
     * // NOTE: It seems comparisions have to be type casted.
     * @see https://github.com/microsoft/TypeScript/issues/25642
     */
    (item: TBreakpoint) => String(item.name) === String(name)
  );

  const query: string = breakpoint?.value
    ? `min-width: ${breakpoint.value}px`
    : null;

  return query ? `@media(${query})` : null;
};

/**
 * Returns [Emotion object styles](https://emotion.sh/docs/object-styles#media-queries) friendly media queries for breakpoint names.
 *
 * @param  breakpoints An array of breakpoint names, or a single breakpoint name.
 * @return             An array of media queries, or a single media query, or null.
 *
 * @category Hooks
 *
 * @example <caption>An array of breakpoint names:</caption>
 * const [mobile, tablet] = useBreakpoint(['mobile', 'tablet']) => ['@media(min-width: 320px)','@media(min-width: 768px)']
 *
 * @example <caption>Single breakpoint name:</caption>
 * const tablet = useBreakpoint('tablet') => '@media(min-width: 768px)'
 *
 * @see https://emotion.sh/docs/object-styles#media-queries
 */
const useBreakpoint = (
  breakpoints: TBreakpointNames[] | TBreakpointNames
): string[] | string | null => {
  return Array.isArray(breakpoints)
    ? breakpoints &&
        breakpoints.reduce((result, breakpoint) => {
          return [...result, getBreakpoint(breakpoint)];
        }, [])
    : getBreakpoint(breakpoints);
};

export default useBreakpoint;
