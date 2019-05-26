const Discord = require("discord.js")
, shadow = new Discord.Client({autoReconnect:true})
, fs = require("fs")
, cheerio = require('cheerio')
, snekfetch = require('snekfetch')
, querystring = require('querystring')
, config = require('./config.json')
, ownerid = config.id
, prefix = config.prefixs;
shadow.on("ready", () => {
  console.log(`by shadow Logged in as ${shadow.user.tag}!`);
});
shadow.on('message', message => {
  if (!message.content.startsWith(prefix)) return;
  var args = message.content.split(' ').slice(1);
  var argresult = args.join(' ');
  if (message.author.id !== ownerid) return;
  if (message.content.startsWith(prefix + 'wt')) {           
      if(argresult){
         message.channel.send("**You Are Watching **" + "`" + `${argresult}` + "`" ).then(message => {message.delete(3000)})
        shadow.user.setActivity(argresult, {type:'WATCHING'});
      } else 
      if(!argresult) {
      message.channel.send("**Can You But An Input? Please?**").then(message => {message.delete(3000)})          
      }
    message.delete(3000);
  } else
   if (message.content.startsWith(prefix + 'st')) {        
      if(argresult){
         message.channel.send("**You Are Streaming **" + "`" + `${argresult}` + "`" ).then(message => {message.delete(3000)})
        shadow.user.setActivity(argresult, {type:'STREAMING', url:"https://www.twitch.tv/benkayali"});
      } else 
      if(!argresult) {
      message.channel.send("**Can You But An Input? Please?**").then(message => {message.delete(3000)})          
      }
    message.delete(3000);
  } else
	    if (message.content.startsWith(prefix + 'pl')) {
      if(argresult){
         message.channel.send("**You Are Playing **" + "`" + `${argresult}` + "`" ).then(message => {message.delete(3000)})
        shadow.user.setActivity(argresult, {type:'PLAYING'});
      } else 
      if(!argresult) {
      message.channel.send("**Can You But An Input? Please?**").then(message => {message.delete(3000)})          
      }
    message.delete(3000);
  } else
    if (message.content.startsWith(prefix + 'li')) {    
      if(argresult){
         message.channel.send("**You Are Listening To **" + "`" + `${argresult}` + "`" ).then(message => {message.delete(3000)})
        shadow.user.setActivity(argresult, {type:'LISTENING'});
      } else 
      if(!argresult) {
      message.channel.send("**Can You But An Input? Please?**").then(message => {message.delete(3000)})          
      }
    message.delete(3000);
  } else
	  if (message.content.startsWith(prefix + "dnd")) {
        message.channel.send("**Done Changing Your Status To `DND`**").then(message => {message.delete(3000)})
        message.delete(3000);
		  shadow.user.setStatus("dnd");
	  } else
	  if (message.content.startsWith(prefix + "on")) {
        message.channel.send("**Done Changing Your Status To `online`**").then(message => {message.delete(3000)})
        message.delete(3000);
		  shadow.user.setStatus("online");
	  } else
      if (message.content.startsWith(prefix + "idle")) {
        message.channel.send("**Done Changing Your Status To `IDLE`**").then(message => {message.delete(3000)})
        message.delete(3000);
		  shadow.user.setStatus("idle");
	  } else
	  if (message.content.startsWith(prefix + "off")) {
          message.channel.send("**Done Changing Your Status To `OFFLINE`**").then(message => {message.delete(3000)})
          message.delete(3000);
		  shadow.user.setStatus("invisible");
	  } else 
       if (message.content.startsWith(prefix + "x")) {
        let count = parseInt(args[0]) || 1;
          message.delete();
          message.channel.fetchMessages({ limit: Math.min(count, 100), before: message.id }).then(messages => {
          const prunable = messages.filter(m => m.author.id === shadow.user.id);
        return Promise.all(
            prunable.map(m => m.delete())
        ).then(() => {
        });
    }).catch(message.error);
} else
 if (message.content.startsWith(prefix + "f")) {
   if (args.length < 1) {
        message.channel.send('You must provide text to space out!').then(message => {message.delete(3000)})
    }
       let amount = 1;
    if (!isNaN(args[0])) {
        amount = parseInt(args[0]);
        (amount < 1) && (amount = 1);
        (amount > 15) && (amount = 15);
        args = args.slice(1);
    }
    message.delete();
    message.channel.send(args.join(' '.repeat(amount / 2)).split('').join(' '.repeat(amount)));
 } else
  if (message.content.startsWith(prefix + "e")) {
    if(args){
    let embed = new Discord.RichEmbed()
    .setDescription(args.join("  "))
    .setColor("#050505")
    message.channel.sendEmbed(embed);
    message.delete();
      } else 
      if(!args) {
      message.channel.send("**Can You But Something For Me To Transfer it to embed?**").then(message => {message.delete(3000)})          
      }
 }   
});
shadow.on('message', (message) => {
           if (message.content.startsWith(prefix + "av")) {
			     if (message.author.id !== ownerid) return;
        var mentionned = message.mentions.users.first();
          var getvalueof;
          var shadow;
          if(mentionned) {
            getvalueof = mentionned;
          } else {
            getvalueof = message.author;
          }
          let avatar = new Discord.RichEmbed()
          .setColor("#787978")
          .setTitle(`{ URL HERE }`)
          .setURL(`${getvalueof.avatarURL}`)
          .setImage(`${getvalueof.avatarURL}`);
                    message.channel.sendEmbed(avatar);
          message.delete(3000);
	  } 
		 if (message.content.startsWith(prefix + 'help')) {
			 if (message.author.id !== ownerid) return;
		   const embed = new Discord.RichEmbed() 
      .setColor("#000000") 
      .setDescription(`
:small_blue_diamond: -wt : واتشنق
:small_blue_diamond: -pl : بلاي
:small_blue_diamond: -li : ليسنق
:small_blue_diamond: -st : ستريم
:small_blue_diamond: -x : مسح رسائلك 
:small_blue_diamond: -f : تفكيك
:small_blue_diamond: -e : يرسل الكلام بأيمبد
:small_blue_diamond: -av : يطلع صورتك او صورة اللي تمنشنه
:small_blue_diamond: -setav : تغيير صورتك 
:small_blue_diamond: -off : وضع اوفلاين
:small_blue_diamond: -dnd : وضع عدم الازعاج 
:small_blue_diamond: -idle : وضع خامل
:small_blue_diamond: -on : وضع اونلاين   
 ©نinsidemy.`) 
   message.channel.sendEmbed(embed)
   message.delete(3000);
  }
  });
 shadow.on('message', (message) => {
    if (message.content.startsWith(prefix + 'setav')) {
	if (message.author.id !== ownerid) return;
	var argresult = message.content.split(` `).slice(1).join(' ');
shadow.user.setAvatar(argresult);
  message.channel.sendMessage(`تم`).then(message => {message.delete(3000)});
    }
  });
shadow.login(process.env.BOT_TOKEN);