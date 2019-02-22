$(document).on('turbolinks:load', function() {
  function appendMessage(message) {
    var message_list = $('.messages');
    if (message.image){
      var image = `<img src="${ message.image } class: 'lower-message__image' ">`;
    } else {
      var image = ''
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


  function enableFrom(form_class) {
       $(form_class).prop('disabled', false);
  };

  function pageRESET() {
    $('.form__input').val('');
    $('.form__ button').prop('disabled', false);
  };

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
      $('.form__message').val('')
      $(".form__submit").prop('disabled', false);
      })

      .fail(function() {
        alert('メッセージの通信に失敗しました');
        enableFrom(".submit");
      })
    })
});

