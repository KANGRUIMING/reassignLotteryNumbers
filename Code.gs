function reassignLotteryNumbers() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues(); // Get all data from the sheet

  var checkedInWithoutNumber = []; // To store rows of checked-in people without a lottery number
  var notCheckedInWithNumber = []; // To store lottery numbers of not checked-in people

  // Loop through the data and categorize rows
  for (var i = 0; i < data.length; i++) {
    var checkedIn = data[i][7]; // Assuming 'checked in' is in column H (index 7)
    var lotteryNumber = data[i][8]; // Assuming 'lottery number' is in column I (index 8)

    if (checkedIn && lotteryNumber === '') {
      checkedInWithoutNumber.push(i + 1); // Store row index (1-based)
    } else if (!checkedIn && lotteryNumber !== '') {
      notCheckedInWithNumber.push(lotteryNumber); // Store lottery number
      sheet.getRange(i + 1, 9).setValue(''); // Clear lottery number, +1 because row index is 1-based
    }
  }

  // Reassign lottery numbers
  for (var j = 0; j < checkedInWithoutNumber.length && j < notCheckedInWithNumber.length; j++) {
    var rowIndex = checkedInWithoutNumber[j]; // Row index in Google Sheets is 1-based
    sheet.getRange(rowIndex, 9).setValue(notCheckedInWithNumber[j]); // Update lottery number in the sheet
  }
}

