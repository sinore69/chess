export function calCell(color: string, rowindex: number, colindex: number) {
  let whiteMap = new Map();
  let blackMap = new Map();
  let value = "";
  whiteMap.set("00", 8);
  whiteMap.set("10", 7);
  whiteMap.set("20", 6);
  whiteMap.set("30", 5);
  whiteMap.set("40", 4);
  whiteMap.set("50", 3);
  whiteMap.set("60", 2);
  whiteMap.set("70", 1);
  //whiteMap.set("70", "a");
  whiteMap.set("71", "b");
  whiteMap.set("72", "c");
  whiteMap.set("73", "d");
  whiteMap.set("74", "e");
  whiteMap.set("75", "f");
  whiteMap.set("76", "g");
  whiteMap.set("77", "h");
  blackMap.set("00", 1);
  blackMap.set("10", 2);
  blackMap.set("20", 3);
  blackMap.set("30", 4);
  blackMap.set("40", 5);
  blackMap.set("50", 6);
  blackMap.set("60", 7);
  blackMap.set("70", 8);
  blackMap.set("71", "g");
  blackMap.set("72", "f");
  blackMap.set("73", "e");
  blackMap.set("74", "d");
  blackMap.set("75", "c");
  blackMap.set("76", "b");
  blackMap.set("77", "a");
  if (color === "w") {
    value = whiteMap.get(rowindex.toString() + colindex.toString());
  } else {
    value = blackMap.get(rowindex.toString() + colindex.toString());
  }
  return value;
}
