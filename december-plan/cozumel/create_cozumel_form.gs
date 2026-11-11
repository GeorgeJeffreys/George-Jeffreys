/**
 * Cozumel Dec 2026 trip form (eLearning details, gear sizes, flights, checklist).
 * How to use: go to https://script.google.com > New project, paste this whole file over the
 * placeholder code, press Run (function: createCozumelTripForm) and allow access when asked.
 * The log (View > Logs, or the Execution log panel) prints the link to share and the link
 * to your private responses sheet.
 * Respondents only see their own answers. Each person gets a link to edit their response later.
 */
function createCozumelTripForm() {
  var form = FormApp.create('Cozumel dive trip, 13–19 Dec 2026');
  form.setDescription(
    'One form for everything Blue Note and I need: your PADI eLearning details, gear sizes, ' +
    'flights and pre-trip checklist. Only I can see your answers. After you submit you get a link ' +
    'to edit your response, so come back and update it as you book flights and tick things off.');
  form.setAllowResponseEdits(true);       // people can update their answers later
  form.setPublishingSummary(false);       // nobody sees anyone else's answers
  form.setShowLinkToRespondAgain(false);
  form.setConfirmationMessage(
    'Thanks! Save the "Edit your response" link so you can update your flights and checklist later.');

  // About you
  form.addSectionHeaderItem().setTitle('About you');
  form.addTextItem().setTitle('First name').setRequired(true);
  form.addTextItem().setTitle('Last name').setRequired(true);
  form.addTextItem().setTitle('Email')
      .setHelpText('Beginners: your PADI eLearning code is sent here.')
      .setValidation(FormApp.createTextValidation().requireTextIsEmail().build())
      .setRequired(true);
  form.addDateItem().setTitle('Date of birth')
      .setHelpText('PADI needs this to set up the course.').setRequired(true);
  form.addTextItem().setTitle('Mobile number (WhatsApp)');
  var track = form.addMultipleChoiceItem().setTitle('Which group are you in?').setRequired(true);

  // Beginners section
  var beginnerPage = form.addPageBreakItem().setTitle('Beginners: PADI Open Water');
  form.addMultipleChoiceItem().setTitle('PADI eLearning status')
      .setHelpText('Finish by Sun 6 Dec. It takes 8–12 hours.')
      .setChoiceValues(['Not started yet (waiting for my code)', 'In progress', 'Finished']);

  // Certified section
  var certPage = form.addPageBreakItem().setTitle('Certified divers');
  form.addTextItem().setTitle('Certification level and agency (e.g. PADI Open Water)');
  form.addTextItem().setTitle('Cert number');
  form.addDateItem().setTitle('Date of your last dive');
  form.addMultipleChoiceItem().setTitle('Rent a dive computer? ($10 a day)')
      .setChoiceValues(['Yes', 'No, I have my own']);

  // Gear (everyone)
  var gearPage = form.addPageBreakItem().setTitle('Gear sizes')
      .setHelpText('All gear is included. Blue Note sizes everything from this.');
  certPage.setGoToPage(gearPage);  // beginners skip the certified section
  form.addTextItem().setTitle('Height (cm or ft/in)').setRequired(true);
  form.addTextItem().setTitle('Weight (kg or lb)').setRequired(true);
  form.addTextItem().setTitle('Shoe size (US)').setRequired(true);
  form.addMultipleChoiceItem().setTitle('Interested in the optional night dive?')
      .setChoiceValues(['Yes', 'Maybe', 'No']);
  form.addMultipleChoiceItem().setTitle('Interested in a shore dive on a free morning? ($60)')
      .setChoiceValues(['Yes', 'Maybe', 'No']);

  // Travel
  form.addPageBreakItem().setTitle('Flights')
      .setHelpText('Land in Cozumel (CZM) by 4pm or Cancún (CUN) by 1pm on Sun 13 Dec. ' +
                   'Leave it blank if you haven\'t booked yet and come back to update it.');
  form.addDateItem().setTitle('Arrival date');
  form.addMultipleChoiceItem().setTitle('Arriving at')
      .setChoiceValues(['Cozumel (CZM)', 'Cancún (CUN), then bus and ferry']).showOtherOption(true);
  form.addTextItem().setTitle('Arrival flight number');
  form.addTimeItem().setTitle('Landing time (local)');
  form.addDateItem().setTitle('Departure date');
  form.addTextItem().setTitle('Departure flight number');
  form.addTimeItem().setTitle('Departure time (local)');

  // Rooms and checklist
  form.addPageBreakItem().setTitle('Rooms and checklist');
  form.addTextItem().setTitle('Who would you like to share a room with?');
  form.addMultipleChoiceItem().setTitle('DAN dive insurance bought? (by Fri 27 Nov)')
      .setHelpText('https://apps.dan.org/scuba-dive-insurance/?rc=w1695003')
      .setChoiceValues(['Yes', 'Not yet']);
  form.addMultipleChoiceItem().setTitle('Medical form done? (comes with the eLearning or boat confirmation)')
      .setChoiceValues(['Yes, all NO answers', 'Yes, with a doctor\'s sign-off', 'Not yet']);
  form.addParagraphTextItem().setTitle('Dietary needs or allergies');
  form.addParagraphTextItem().setTitle('Anything else I should know?');

  // Branching: first question sends each group to its own section
  track.setChoices([
    track.createChoice('Beginner (PADI Open Water course)', beginnerPage),
    track.createChoice('Certified diver', certPage)
  ]);

  // Private responses sheet (only you can see it)
  var sheet = SpreadsheetApp.create('Cozumel dive trip: form responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log('Share this link in the group chat: ' + form.getPublishedUrl());
  Logger.log('Edit the form: ' + form.getEditUrl());
  Logger.log('Your private responses sheet: ' + sheet.getUrl());
}
