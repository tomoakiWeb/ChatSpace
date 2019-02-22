$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var message_list = $('.messages');
    if (message.image){
    var image = `<img src="${ message.image }" class = "lower-message__image">`;
    } else {
    var image =''
    }

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
          json.messages.forEach(function(message){
          buildHTML(message);
          })
        })
        .fail(function(data) {
          alert('自動更新に失敗しました');
        })
      } else {
          clearInterval(interval);
        }},5000 );
});

