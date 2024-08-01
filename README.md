# Reassign Lottery Numbers

This script reassigns lottery numbers in a Google Sheets spreadsheet based on check-in status. It checks which participants have checked in but do not have a lottery number and reassigns available lottery numbers from participants who have not checked in.

## Prerequisites

- A Google Sheets spreadsheet with the following columns:
  - Column H (index 7): 'Checked In' status (boolean or text indicating check-in status)
  - Column I (index 8): 'Lottery Number' (text or number)

## Functionality

The `reassignLotteryNumbers` function performs the following tasks:
1. Retrieves all data from the active sheet.
2. Identifies rows where participants are checked in but do not have a lottery number.
3. Identifies lottery numbers from participants who have not checked in.
4. Reassigns the available lottery numbers to the checked-in participants without a lottery number.

## Code

```javascript
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
```

## How to Use

1. Open your Google Sheets spreadsheet.
2. Go to `Extensions` > `Apps Script`.
3. Copy and paste the code into the Apps Script editor.
4. Save the script.
5. Run the `reassignLotteryNumbers` function.

## Notes

- Ensure that the 'Checked In' status is correctly marked in Column H.
- Ensure that the 'Lottery Number' is properly entered in Column I for participants who have one.
- This script will clear the lottery numbers of participants who have not checked in and reassign them to participants who have checked in but do not have a lottery number.

