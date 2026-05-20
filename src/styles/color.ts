export interface ColorGroup {
  [key: string]: string | ColorGroup;
  [key: number]: string | ColorGroup;
}

export const Plot_colors: ColorGroup = {
  black: "#000000",
  white: "#FFFFFF",

  gray: {
    40: "#666666",
    42: "#6F6A65",
    58: "#9B948D",
    97: "#FAF8F5",
    94: "#F0EEED",
    93: "#F1EEE8",
    10: "#1A1A19",
  },

  red: {
    80: "#FF9BB4",
  },

  cyan: {
    66: "#7FD4CE",
  },

  green: {
    58: "#469980",
    76: "#9FE7D2",
    63: "#78C7AC",
  },

  blue: {
    65: "#716CE0",
    67: "#7D76DF",
  },

  purple: {
    75: "#A58AF2",
  },
};

export default Plot_colors;
