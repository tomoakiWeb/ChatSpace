  json.user_name    @message.user.name
  json.message      @message.content
  json.date         @message.created_at.strftime("%Y年%m月%d日 %H時%M分")
  json.image        @message.image.url
  json.id   @message.id
