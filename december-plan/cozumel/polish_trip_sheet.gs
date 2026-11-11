/**
 * Formats the Cozumel trip sheet in place (same file, same link).
 * How to run: open the sheet > Extensions > Apps Script > paste this over the placeholder code >
 * Save > Run (function: polishCozumelSheet) > allow access. Takes a few seconds.
 * Safe to run once: it stops without changing anything if the sheet is already formatted.
 */
function polishCozumelSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheets()[0];
  if (sh.getRange('A1').getValue() !== 'First name') {
    throw new Error('Cell A1 is not "First name", so the sheet looks already formatted. Nothing was changed.');
  }

  var lastCol = sh.getLastColumn();
  var headers = sh.getRange(1, 1, 1, lastCol).getValues()[0];
  function col(name) { var i = headers.indexOf(name); return i < 0 ? 0 : i + 1; }

  sh.setName('Trip sheet');
  sh.insertRowsBefore(1, 4);
  var HEAD = 5, FIRST = 6;
  var lastRow = sh.getLastRow();
  var nRows = lastRow - HEAD;

  // Whole sheet: one font, middle alignment
  sh.getRange(1, 1, lastRow, lastCol).setFontFamily('Arial').setFontSize(10).setVerticalAlignment('middle');

  // Row 1: title
  sh.getRange(1, 1, 1, lastCol).merge()
    .setValue('🐢🌊  COZUMEL DIVE TRIP  ·  Sun 13 – Sat 19 Dec 2026  ·  Blue Note Scuba  ·  Hotel Plaza Cozumel')
    .setFontSize(16).setFontWeight('bold').setFontColor('#ffffff').setBackground('#0b5394')
    .setHorizontalAlignment('left');
  sh.setRowHeight(1, 44);

  // Row 2: how to fill it in
  sh.getRange(2, 1, 1, lastCol).merge()
    .setValue('HOW TO FILL THIS IN:  find your name and fill in your own row only. Use the dropdowns where there is one. ' +
              'Grey cells don\'t apply to your track, so skip them. Come back and update your row as you book flights and tick things off. ' +
              'Please don\'t edit anyone else\'s row.')
    .setWrap(true).setFontSize(11).setBackground('#cfe2f3').setFontColor('#073763');
  sh.setRowHeight(2, 42);

  // Row 3: deadlines
  sh.getRange(3, 1, 1, lastCol).merge()
    .setValue('DEADLINES:  fill in your row by Fri 20 Nov  ·  DAN insurance by Fri 27 Nov  ·  gear sizes by Sun 29 Nov  ·  ' +
              'beginners finish PADI eLearning by Sun 6 Dec  ·  land in Cozumel (CZM) by 4pm or Cancún (CUN) by 1pm on Sun 13 Dec')
    .setWrap(true).setFontWeight('bold').setFontSize(10).setBackground('#fff2cc').setFontColor('#7f6000');
  sh.setRowHeight(3, 34);

  // Row 4: section headings over groups of columns; row 5: column headers in a lighter tint
  var groups = [
    ['ABOUT YOU',             'First name',                   'Track (Open Water / Certified)',    '#0b5394', '#cfe2f3'],
    ['PADI eLEARNING + CERT', 'Cert number (certified only)', 'Email (for PADI eLearning)',        '#38761d', '#d9ead3'],
    ['GEAR SIZES',            'Height (cm or ft/in)',         'Dive computer? Y/N (certified, $10/day; beginners get one free)', '#b45f06', '#fce5cd'],
    ['FLIGHTS',               'Arrival date',                 'Departure time (local)',            '#741b47', '#ead1dc'],
    ['ROOM',                  'Roommate preference',          'Roommate preference',               '#134f5c', '#d0e0e3'],
    ['CHECKLIST (Y/N)',       'DAN insurance bought? Y/N',    'eLearning finished? Y/N (beginners)', '#990000', '#f4cccc'],
    ['ANYTHING ELSE',         'Dietary needs / allergies',    'Notes',                             '#434343', '#efefef']
  ];
  groups.forEach(function (g) {
    var a = col(g[1]), b = col(g[2]);
    if (!a || !b) return;  // column was renamed or removed; skip that heading
    var width = b - a + 1;
    var top = sh.getRange(4, a, 1, width);
    if (width > 1) top.merge();
    top.setValue(g[0]).setFontWeight('bold').setFontColor('#ffffff').setBackground(g[3]).setHorizontalAlignment('center');
    sh.getRange(HEAD, a, 1, width).setBackground(g[4]);
  });
  sh.setRowHeight(4, 26);

  // Row 5: column headers
  sh.getRange(HEAD, 1, 1, lastCol).setFontWeight('bold').setWrap(true).setHorizontalAlignment('center');
  sh.setRowHeight(HEAD, 54);

  // Body: light banding, borders, example row in grey italics
  var body = sh.getRange(FIRST, 1, nRows, lastCol);
  body.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, false, false);
  sh.getRange(4, 1, lastRow - 3, lastCol).setBorder(true, true, true, true, true, true, '#b7b7b7', SpreadsheetApp.BorderStyle.SOLID);
  sh.getRange(FIRST, 1, 1, lastCol).setFontStyle('italic').setFontColor('#999999');
  sh.getRange(FIRST, 1, nRows, 2).setFontWeight('bold');
  sh.getRange(FIRST + 1, 1, nRows - 1, 2).setFontColor('#000000');

  // Column widths
  for (var c = 1; c <= lastCol; c++) sh.setColumnWidth(c, 120);
  [['First name', 110], ['Last name', 110], ['Email (for PADI eLearning)', 210],
   ['Dive computer? Y/N (certified, $10/day; beginners get one free)', 170],
   ['Roommate preference', 150], ['Dietary needs / allergies', 180], ['Notes', 220]
  ].forEach(function (w) { if (col(w[0])) sh.setColumnWidth(col(w[0]), w[1]); });

  // Dropdowns
  function list(name, values) {
    var c = col(name); if (!c) return;
    sh.getRange(FIRST, c, nRows, 1).setDataValidation(
      SpreadsheetApp.newDataValidation().requireValueInList(values, true).setAllowInvalid(true).build());
  }
  list('Track (Open Water / Certified)', ['Open Water', 'Certified', 'Organiser']);
  list('Arriving at (CZM or CUN)', ['CZM', 'CUN', 'Other']);
  var yn = ['Dive computer? Y/N (certified, $10/day; beginners get one free)', 'DAN insurance bought? Y/N',
            'Medical form done? Y/N', 'eLearning finished? Y/N (beginners)'];
  yn.forEach(function (n) { list(n, ['Y', 'N', 'n/a']); });

  // Conditional colours: Y green, N red; grey out columns that don't apply to a track
  var rules = sh.getConditionalFormatRules();
  var trackCol = col('Track (Open Water / Certified)');
  var trackRef = '$' + sh.getRange(FIRST, trackCol).getA1Notation().replace(/[0-9]+/, '') + FIRST;
  function greyIf(name, track) {
    var c = col(name); if (!c || !trackCol) return;
    rules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=' + trackRef + '="' + track + '"')
      .setBackground('#d9d9d9').setFontColor('#999999')
      .setRanges([sh.getRange(FIRST, c, nRows, 1)]).build());
  }
  greyIf('Cert number (certified only)', 'Open Water');
  greyIf('Dive computer? Y/N (certified, $10/day; beginners get one free)', 'Open Water');
  greyIf('eLearning finished? Y/N (beginners)', 'Certified');
  yn.forEach(function (n) {
    var c = col(n); if (!c) return;
    var r = sh.getRange(FIRST, c, nRows, 1);
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Y')
      .setBackground('#b6d7a8').setRanges([r]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('N')
      .setBackground('#f4cccc').setRanges([r]).build());
  });
  sh.setConditionalFormatRules(rules);

  // Keep the headings and names in view; warn before anyone edits the top rows
  sh.setFrozenRows(HEAD);
  sh.setFrozenColumns(2);
  sh.getRange(1, 1, HEAD, lastCol).protect().setDescription('Headings').setWarningOnly(true);

  SpreadsheetApp.flush();
}
