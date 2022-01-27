/**
 * 今日が何ゴミの日か送信する。
 * トリガーで定期実行する
 */
function remind() {
  const result = getRecord();
    const messages = [
      {
        type: 'text',
        text: buildMessage(result), 
      }
    ];
    pushMessage(messages);    
}

/**
 * GoogleDriveのフォルダから画像を送信する
 */
function gohoubi() {
  const files = DriveApp.getFolderById(YURUUSAGI_FOLDER_ID).getFiles();
  const list = [];
  while (files.hasNext()){
    var file = files.next();
    list.push(file.getId());
  }
  const [min, max] = [0, list.length - 1];

  const pictures = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("pictures");
  let r = pictures.getLastRow();
  let c = pictures.getLastColumn();
  const data = pictures.getRange(2, 1, r, c).getValues();
  let ids = data.map(d => d[1]);

  // すべての画像を送信済みの場合、セルをクリア
  if (ids.length >= max) {
    pictures.getRange(2, 1, max, c).deleteCells(SpreadsheetApp.Dimension.COLUMNS);
    r = 1;
    c = 2;
  }
  // 送信済みの画像は1週するまで再送信しない。
  while (true) {
    const rand = Math.floor(Math.random() * (max + 1)); 
    if (!ids.includes(rand)) {
      pictures.getRange(r + 1, 2).setValue(rand);
      pictures.getRange(r + 1, 1).setValue(new Date());
      break;
    }
    pushPicture(list[rand]);
  }
}

/**
 * Result型からメッセージを生成する。
 * @param result 検索結果
 * @return 今日の曜日と出せるゴミの文字列
 */
function buildMessage(result) {
  let l1 = `今日は第${result.nth}${result.day}です。\n`;
  let other = "";
  if (result.arr.length === 0) {
    other += "ゴミの日ではありません。"
  } else {
    for (let i = 0; i < result.arr.length; i++) {
      if (i === result.arr.length - 1) {
        other += `${result.arr[i]}の日です。`;
      } else {
        other += `${result.arr[i]}の日です。\n`;
      }
    }
  }
  return l1.concat(other);
}

/**
 * Send push message from line platform.
 * @param messages: array which has object.
 * @return void
 */
function pushMessage(messages) {
  const body = {messages};
  const pushMsg = {
    "method": "post",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN,
    },
    "payload": JSON.stringify(body)
  }
  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/broadcast", pushMsg);
}
/**
 * Send push image from line platform.
 * @param fileId: fileId in Google Drive
 * @return void
 */
function pushPicture(fileId) {
  const pushMsg = {
    "method": "post",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN,
    },
    'payload': JSON.stringify({
      'messages': [{
        'type': 'image',
        "originalContentUrl": 'https://drive.google.com/uc?id=' + fileId,
        "previewImageUrl": 'https://drive.google.com/uc?id=' + fileId
      }],
    }),
  }
  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/broadcast", pushMsg);
}


