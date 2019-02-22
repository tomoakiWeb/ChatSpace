$(document).on('turbolinks:load', function() {
$(function(){
  function appendMessage(message) {
    var message_list = $('.messages');
    console.log(message.image);
    if (message.image){
    var image = `<img src="${ message.image }">`;
    } else {
    var image =''
    }

    // var image = message.image  ?  `<img src="${message.image}">`: "" ;
    var html =
  `<div class = "message" data-message-id="${message.id}">
  <div class='upper-message'>
    <div class='upper-message__user-name'>
    ${message.user_name}
    </div>
    <div class='upper-message__date'>
    ${message.date}
    </div>
  </div>
  <div class='lower-meesage'>
    <p class='lower-message__content'>
    ${message.message}
    </p>
</div>
<div class="message__image">
  ${image}
</div>
</div>`
    message_list.append(html);
 };


    var interval = setInterval(function(){
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
        var last_message_id = $('.message').last().data('messageId')
        $.ajax({
        url: location.href,
        type: 'GET',
        data: {last_id: last_message_id},
        dataType: 'json'
        })
        .done(function(json) {
          var id = $('.message').data('messageId');
          var insertHTML = '';
          json.messages.forEach(function(message){
            insertHTML += buildHTML(message);
          $('.messages').append(insertHTML);
          })
        })
        .fail(function(data) {
          console.log('自動更新に失敗しました');
        })
      } else {
          clearInterval(interval);
        }},5000 );
  });
});

