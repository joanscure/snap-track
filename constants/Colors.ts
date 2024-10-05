/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  default: {
    headline: "#111827",
    stroke: "#edf1f3",
    primary: "#183a67",
    white: "#fff",
    icons: "#889198",
    text: "#444444",
    title: "#222222",
    border: "#D7D9DD",
    danger: "#FF4136",
  },
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    gray: "#687076",
    headline: "#111827",
    stroke: "#edf1f3",
    primary: "#183a67",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    gray: "#687076",
    headline: "#111827",
    stroke: "#edf1f3",
    primary: "#183a67",
  },
};
