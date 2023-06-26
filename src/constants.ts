const postcodes = {
  AB: {
    A: [
      10, 11, 12, 13, 14, 15, 16, 21, 22, 23, 24, 25, 30, 31, 32, 33, 34, 35,
      36, 37, 38, 39, 41, 42, 43, 44, 45, 51, 52, 53, 54, 55, 56,
    ],
  },
  AL: {
    C: [1, 7],
    D: [2, 3, 8, 9, 10],
    B: [4, 5, 6],
  },
  B: {
    E: [23, 24, 25, 26, 36, 70],
    D: [27, 29, 31, 32, 33, 34, 35, 37, 38, 42, 43, 44, 66, 67, 68, 69, 71],
    C: [28, 30, 40, 46, 47, 62, 63, 72, 73, 74, 75, 76, 77, 79],
    B: [45, 48, 49, 50, 60, 64, 65, 78, 90, 91, 92, 93, 94, 95, 96, 97, 98],
    A: [61, 80],
  },
  BA: {
    B: [1, 2, 5, 6, 8, 11, 12, 13, 14],
    A: [3, 7, 9, 10, 15, 16, 20, 21, 22],
    C: [4],
  },
  BB: {
    D: [1, 4, 5, 8, 10, 12, 18],
    E: [2, 3, 11],
    C: [6, 9],
    B: [7],
  },
  BD: {
    F: [2, 9, 10],
    D: [5, 11, 15, 19, 21],
    E: [6, 8, 12, 13, 14, 16, 17, 18, 20, 22],
    A: [23, 24],
  },
  BH: {
    C: [1, 2, 3, 4, 5],
    B: [6, 7, 11, 13, 15, 17, 18, 25],
    A: [8, 9, 10, 12, 14, 16, 19, 20, 21, 22, 23, 24, 31],
  },
  BL: {
    E: [0, 1, 2, 6],
    F: [3, 4, 5, 7, 8, 9],
  },
  BN: {
    D: [1, 2, 3],
    A: [5, 6, 7, 8, 13, 14, 17, 24, 27, 41, 42, 44, 45],
    B: [9, 10, 11, 12, 15, 16, 18, 21, 22, 23, 25, 26, 43],
    C: [20],
  },
  BR: {
    E: [1, 3, 4, 5, 7],
    D: [2],
    C: [6, 8],
  },
  BS: {
    E: [1, 3, 5, 11],
    D: [4, 6, 7, 10],
    C: [8, 9, 13, 14, 15, 16, 23, 30, 32, 34, 35],
    B: [20, 22, 24, 25, 29, 31, 39, 40, 41],
    A: [21, 26, 27, 28, 36, 37, 48, 49],
  },
  CA: {
    B: [1, 2, 3, 5, 7, 13, 18, 19, 20, 21, 23, 24, 26, 27],
    A: [4, 6, 8, 9, 10, 11, 12, 15, 16, 17, 22, 25],
    C: [14, 28],
  },
  CB: {
    B: [1, 5, 9],
    A: [2, 3, 4, 6, 7, 8, 10, 11],
  },
  CF: {
    E: [3, 15, 42, 61, 62, 71, 72],
    F: [5, 10, 11, 14, 23, 24, 63, 64],
    D: [
      31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 43, 44, 45, 46, 47, 48, 81,
      82, 83,
    ],
  },
  CH: {
    C: [1, 64, 65, 66],
    B: [2, 3, 4, 5, 6, 7, 8],
    F: [41, 42, 44],
    E: [43, 45, 46],
    D: [47, 48, 49, 60, 61, 62, 63],
  },
  CM: {
    B: [0, 2, 4, 8, 9, 11, 12, 17],
    A: [1, 3, 6, 7],
    C: [5, 13, 14, 16, 20, 21, 22, 23, 24],
    D: [15, 18],
    E: [19],
  },
  CO: {
    C: [1],
    A: [2, 3, 5, 8, 10, 15, 16],
    B: [4, 6, 7, 9, 11, 12, 13, 14],
  },
  CR: {
    F: [0, 4, 7],
    E: [2, 8, 9],
    D: [3, 5, 6],
  },
  CT: {
    C: [1, 2, 4, 6, 8, 9, 10, 11, 16, 17, 19, 20],
    B: [3, 5, 7, 14, 18],
    A: [13, 15, 21],
  },
  CV: {
    E: [1, 2, 3, 6],
    D: [4, 5, 7, 11, 12],
    C: [8, 9, 10],
    B: [13, 21, 22, 23, 31, 32, 33, 34, 47],
    A: [35, 36, 37],
  },
  CW: {
    B: [1, 3, 5, 7, 9],
    A: [2, 4, 6, 8, 10, 11],
    C: [12],
  },
  DA: {
    E: [1, 5, 7, 9, 10],
    D: [2, 3, 6, 11, 12, 13],
    C: [4],
    F: [8, 14, 15, 16, 17, 18],
  },
  DD: {
    D: [1, 2, 3],
    C: [4],
    A: [5, 6, 7, 8, 9, 10],
    B: [11],
  },
  DE: {
    C: [1, 3, 22, 55],
    A: [4, 12, 14, 15, 45],
    B: [5, 6, 7, 11, 13, 56, 65, 72, 73, 74, 75],
    D: [21, 23, 24],
  },
  DG: {
    B: [1, 2],
    A: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16],
  },
  DH: {
    D: [1, 2, 3, 8],
    E: [4],
    F: [5],
    C: [6, 7, 9],
  },
  DL: {
    D: [1, 15],
    C: [2, 3, 4, 5, 14, 16, 17],
    B: [6, 7, 8, 9, 10, 11, 12, 13],
  },
  DN: {
    F: [1, 4, 5, 11, 12],
    E: [2, 3, 6],
    B: [7, 8, 9, 16, 17, 19, 20, 37, 38, 39],
    A: [10, 14, 18, 21, 22],
    C: [15, 31, 33, 34, 36, 40, 41],
    D: [32, 35],
  },
  DT: {
    A: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11],
    B: [4],
  },
  DY: {
    C: [1, 2, 3, 4, 5, 6, 9],
    A: [7, 14],
    B: [8, 10, 11, 12, 13],
  },
  E: {
    F: [10, 11, 12, 13, 14, 15, 17],
    E: [16],
    D: [18],
  },
  EC: {},
  EH: {
    A: [43, 44, 45, 46],
    B: [26, 27, 38, 39, 40, 41, 42, 55],
    C: [23, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 47, 49, 51, 52, 53, 54],
    D: [11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 48],
    E: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14],
  },
  EN: {
    E: [1, 5, 6, 7, 8, 9],
    F: [2, 3, 4],
    C: [10, 11],
  },
  EX: {
    B: [1, 2, 3, 4, 5, 8, 20, 34],
    A: [
      6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 31, 32,
      33, 35, 36, 37, 38, 39,
    ],
  },
  FK: {
    C: [1, 2, 3, 4, 5],
    B: [6, 7, 8, 9, 10],
    A: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
  },
  FY: {
    D: [1, 4, 8],
    B: [2, 6],
    C: [3, 5, 7],
  },
  G: {
    E: [12, 43, 44, 45, 46, 66, 69, 71, 72, 73, 74, 75, 76, 77, 78, 81],
    D: [60, 61, 62, 64, 67, 68, 82],
    B: [52, 63, 83, 84],
    C: [65],
  },
  GL: {
    A: [1, 4, 5, 7, 8, 9, 10, 11, 13, 15, 18, 19, 51, 53, 54, 55, 56],
    B: [2, 3, 6, 12, 14, 16, 17, 20, 50, 52],
  },
  GU: {
    B: [
      1, 2, 3, 5, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24,
      27, 30, 31, 33, 34, 46, 47, 51,
    ],
    C: [4, 11, 25, 29, 32, 35],
    A: [12, 18, 26, 28],
  },
  GY: {
    A: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  HA: {
    E: [0, 1, 2, 4, 7, 8, 9],
    D: [3, 5, 6],
  },
  HD: {
    D: [1, 6, 7, 8, 9],
    E: [2, 3, 4, 5],
  },
  HG: {
    C: [1, 2, 5],
    B: [3, 4],
  },
  HP: {
    D: [1, 2, 3, 6, 20],
    C: [4, 5, 7, 10, 11, 12, 13, 14, 19, 21],
    B: [9, 15, 16, 17, 18, 22, 23],
    A: [27],
  },
  HR: {
    A: [1, 3, 5, 6, 8, 9],
    B: [2, 4, 7],
  },
  HU: {
    D: [1, 2, 3, 4, 5, 6, 8, 9, 13],
    E: [7],
    C: [10, 11, 14, 16],
    B: [12, 15, 17, 18, 19, 20],
  },
  HX: {
    F: [1, 3],
    E: [2, 4, 5, 7],
    C: [6],
  },
  IG: {
    E: [2, 6, 7, 8],
    F: [3, 9, 10],
    D: [4, 5],
  },
  IM: {
    A: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  IP: {
    A: [
      1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 26, 27, 28, 29, 30, 31, 32, 33,
    ],
    B: [4, 24, 25],
  },
  IV: {
    A: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 30, 31, 32, 36, 40, 41, 42, 43, 44, 45, 46,
      47, 48, 49, 51, 52, 53, 54, 55, 56, 63,
    ],
  },
  JE: {
    A: [1, 2, 3, 4],
  },
  KA: {
    B: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26,
    ],
    A: [27, 28, 29, 30],
  },
  KT: {
    E: [1, 3, 6, 17, 19],
    D: [2, 4, 5, 7, 8, 9, 10, 11, 12],
    C: [13, 14, 15, 16, 18, 20, 21, 22],
    A: [23, 24],
  },
  KW: {
    A: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  },
  KY: {
    B: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  },
  L: {
    F: [22],
    D: [23, 29, 34, 38, 40],
    E: [24, 25, 26, 27, 28, 30, 32, 33, 35, 36],
    C: [31, 37],
    B: [39],
  },
  LA: {
    B: [1, 3, 4, 14, 19, 22, 23],
    A: [2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 17, 18, 20, 21],
    C: [16],
  },
  LD: {
    A: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  LE: {
    C: [3, 4, 6, 10],
    D: [5],
    B: [7, 8, 9, 11, 12, 17, 18],
    A: [13, 14, 15, 16, 65, 67],
  },
};
