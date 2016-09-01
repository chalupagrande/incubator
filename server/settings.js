/*
  If you want to add more recipients, delete the keyword 'false', and replace
  it with something that looks like this
  [
    {"recipient": "targetEmail2@.us.ibm.com"},
    {"recipient": "targetEmail3@.us.ibm.com"},
    {"recipient": "targetEmail4@.us.ibm.com"}
  ]

  Emails must be IBM emails.

  Timezone offset is set for US Central Time.
*/


exports.s = {
  timezoneOffset: -6,
  defaultSenderEmail: "j.skinner@us.ibm.com",
  targetEmail: "j.skinner@us.ibm.com",
  emailSubject: "Incubator Proposal",
  additionalTargetEmails: false,
}