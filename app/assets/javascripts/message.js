(function(){
  function appendMessage(message) {
    var message_list = $('.message');

    var html =
              `<div class ='upper-message'>
                  <div class='upper-message__name'>
                    ${message.user_name}
                  </div>
                   <div class= 'upper-message__date'>
                    ${message.created_at}
                  </div>
                </div>
                <div class = 'lower-message'>
                  <p class = 'lower-message__content'>
                    ${message.content}
                  </p>`
  let image = message.image? `<img src="${ message.image }" alt="">` : ``
  html += image + `</div></div>`
    message_list.prepend(html);
 };

    function enableFrom(form_class) {
      $(form_class).prop('disabled', false);
    }

    $('#new_message').on('submit', function(e) {
      e.preventDefault();
      var messageData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: 'POST',
        data: messageData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(message) {
        appendMessage(message);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
        enableFrom(".submit");
      })
      .fail(function() {
        alert('メッセージの通信に失敗しました');
        enableFrom(".submit");
      })
    })
});
