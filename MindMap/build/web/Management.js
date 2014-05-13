/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function(){
    
   $('#ajaxNew').click(function(){
       var request = $.ajax({
url: "NewUser.jsp",
type: "POST",
data: { Name :'hilsier',Password:'molina',Email:'hilsier_sim@hotmail.com',Institution:'poli',NickName:'ivan'},
dataType: "html"
});
request.done(function( msg ) {
$( "#result" ).html( msg );
});
request.fail(function( jqXHR, textStatus ) {
alert( "Request failed: " + textStatus );
});
       
       
       
   });
   
   
   
   
$('#ajaxDelete').click(function(){
       var request = $.ajax({
url: "DeleteUser.jsp",
type: "POST",
data: { Email:'hilsier_sim@hotmail.com'},
dataType: "html"
});
request.done(function( msg ) {
$( "#result" ).html( " "+msg );
});
request.fail(function( jqXHR, textStatus ) {
alert( "Request failed: " + textStatus );
});
       
       
       
   });
   
   
   $('#ajaxUpdate').click(function(){
       var request = $.ajax({
url: "UpdateUser.jsp",
type: "POST",
data: { Name :'ivan',Password:'molina',Email:'hilsier_sim@hotmail.com',Institution:'poli',NickName:'ivan'},
dataType: "html"
});
request.done(function( msg ) {
$( "#result" ).html( " "+msg );
});
request.fail(function( jqXHR, textStatus ) {
alert( "Request failed: " + textStatus );
});
       
       
       
   });
   
    
    
    
   
   
   
   
    
});