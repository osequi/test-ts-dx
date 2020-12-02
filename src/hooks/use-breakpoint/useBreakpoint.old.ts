import type { TBreakpointNames, TBreakpoint } from "@theme";
import { theme } from "@theme";

/**
 * Returns an *Emotion object styles* - friendly media query for a breakpoint name.
 * @param  name The breakpoint name.
 * @return      The media query string, or null
 *
 * @ignore
 */
const getBreakpoint = (name: TBreakpointNames): string | null => {
  const { breakpoints } = theme;
  if (!breakpoints) return null;

  const breakpoint = breakpoints.find(
    (item: TBreakpoint) => item.name === name
  );

  const query = breakpoint?.value ? `min-width: ${breakpoint.value}px` : null;

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
