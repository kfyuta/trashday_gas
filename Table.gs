// ゴミ種別の列番
const TRASH_TYPE_COL = 1;
// 回収回数の列番
const NTH_COL = 2;
// 曜日の列番
const DAY_COL = 3;
// 毎週回収
const EVERYWEEK_COLLECT = 9;

const dayMap = {
  0: "日曜日",
  1: "月曜日",
  2: "火曜日",
  3: "水曜日",
  4: "木曜日",
  5: "金曜日",
  6: "土曜日"
}

class Query {
  constructor(nth, day) {
    this.nth = Math.trunc(nth);
    this.day = day;
  }
}

class Result {
  constructor(query, arr) {
    if (!query instanceof Query) {
      return;
    }
    this.nth = query.nth;
    this.day = query.day;
    this.arr = arr;
  }
}

function getRecord() {
  const today = new Date();
  const nth = today.getDate() % 7 === 0 ? today.getDate() / 7 : today.getDate() / 7 + 1;
  const day = dayMap[today.getDay()];
  const query = new Query(nth, day);
  return new Result(query, queryData(query));
}

/**
 * 今日出せるゴミの種類を返す
 * @param query Query
 * @retrun ゴミの種類の配列
 */
function queryData(query){
  if (!query instanceof Query) {
    return;
  }
 
  const table = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Table");
  var r = table.getLastRow();
  var c = table.getLastColumn();
  var data = table.getRange(1, 1, r, c).getValues();
  const trashDay = data.filter(row => row[DAY_COL - 1] === query.day)
  .filter(row => row[NTH_COL - 1] === query.nth || row[NTH_COL - 1] === EVERYWEEK_COLLECT)
  .map(a => a[TRASH_TYPE_COL - 1]);
  return trashDay;
}
