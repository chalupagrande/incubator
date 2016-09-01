var settings = require('./settings.js')


exports.buildMessage =function(input){
    return "<h1>Incubator Proposal</h1> \
    <p><b>Submitted by: </b>"+ input.name+", "+input.sender+ "</p>\
    <p><b>Business Unit: </b>"+ input.unit+"</p>\
    <h3>Sponsoring Executive</h3><p>" + input.sponsor + "</p>\
    <h3>Who is your user?</h3><p>"+ input.user +"</p> \
    <h3>What problem are you trying to solve for you user?</h3><p>"+input.problem+"</p>\
    <h3>Whats the impact for IBM</h3><p>"+input.impact+"</p>\
    <br><br><br><p> \<3 jamie</p>"
}
