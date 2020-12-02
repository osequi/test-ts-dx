import { useContext, Context } from "react";
import { ThemeContext } from "@pages/index";

/**
 * Returns a theme via context.
 *
 * The context is loaded from Next.js' `/pages/_app`.
 * This can be replaced when other framework is used.
 *
 * @category Hooks
 * @example
 * const theme = useTheme()
 */
const useTheme = (): Context<typeof ThemeContext> => {
  return useContext(ThemeContext);
};

export default useTheme;
