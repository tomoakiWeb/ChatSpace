$(function() {

  var search_list = $(".chat-group-user.clearfix");
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix" data-user-id="${user.id}" data-user-name="${user.name}">
                  <p class="chat-group-user__name">${user.name}</p>
                    <p class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</p>
                </div>`
    search_list.append(html);
  }

  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">${user}</div>`
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    if (input.length > 0) {
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        console.log(users);
        $('.chat-group-user.clearfix').empty();
        if (users.length !== 0) {
          users.forEach(function(user) {
            appendUser(user);
          })
        }
        else {
          appendNoUser("該当するユーザーがいません。");
        }
      })
      .fail(function(){
        alert('エラーが発生しました。');
      })
    }
    else {
      $('.chat-group-user.clearfix').empty();
      appendNoUser("該当するユーザーがいません。");
    }
  });
});

 var result_list =$("#chat-group-users")

  $(".chat-group-user__btn--add", ).on("click", ".chat-group-user__btn--add",function(){
    var name =$(this).attr("data-user-name")
    var id =$(this).attr("data-user-id")
    addUser(name, id);
    $(this).parent().remove();
  });

  $('#chat-group-users').on("click", '.chat-group-user__btn--remove', function(){
    $(this).parent().remove();
  });
