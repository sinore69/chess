export function decodefen(fen:string){

      const rows = fen.split(' ')[0].split('/');
      const board = [];
  
      for (let row of rows) {
          const boardRow = [];
          for (let char of row) {
              if (isNaN(Number(char))) {
                  boardRow.push(char);
              } else {
                  for (let i = 0; i < parseInt(char); i++) {
                      boardRow.push("1");
                  }
              }
          }
          board.push(boardRow);
      }
  
      return board as string[][];
}