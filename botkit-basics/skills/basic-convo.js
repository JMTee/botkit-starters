/* This module kicks in if no Botkit Studio token has been provided */

module.exports = function (controller) {


  if (!process.env.studio_token ) {

    function conversationStarters(bot, message) {

      bot.startConversation(message, function(err, convo) {

        convo.say('Hello! I am a brand new Botkit bot!');
        convo.ask({
          text: 'Do you want to be my friend?',
          quick_replies: [
            {
              title: 'Yes, I want to be your friend.',
              payload: 'Yes',
            },
            {
              title: 'No, I dont want to be your friend.',
              payload: 'No',
            }
          ]
          
          
        },
        [
          {
            pattern: 'yes',
            callback: function(res, convo) {
              convo.gotoThread("WantFriend");
              convo.next();
            }
          },
          {
            pattern: 'no',
            callback: function(res, convo) {
              convo.gotoThread('NoFriend');
              convo.next();
            }
          },
          {
            default: true,
            callback: function(res, convo) {
              convo.say('Please be my friend..');
              convo.next();
            }
          }
        ]);

        convo.addMessage({
          text: 'yeyyy i have a friend!',
        },'WantFriend');

        convo.addMessage({
          text: 'Aray po :(',
        }, 'NoFriend');

      });


    }

    function unhandledMessage(bot, message) {
      bot.startConversation(message, function(err, convo) {

        convo.say('I do not know how to respond to that message yet.');
        convo.say('With my learning mode enabled, you can teach me new responses just by chatting.');
       

      });

    }

    controller.hears('single','message_received', function(bot, message) {

      bot.startConversation(message, function(err, convo) {

          convo.say('It is very complicated. Have you watched the movie her?');

      });

    });


    


   

    controller.on('hello', conversationStarters);
    controller.on('welcome_back', conversationStarters);
    controller.on('message_received', unhandledMessage);

  }


}
