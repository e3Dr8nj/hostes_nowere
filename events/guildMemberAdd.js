exports.phrases={
 enter_phrase: 'Для доступа ко все каналам нажмите на реакцию соответствующую тому что изображено на картинке \n Успейте нажать втечение 10 минут',
 wrong_phrase:' Выбрана неверная реакция.',
 timeout_phrase:' Время ожидания реакции истекло.',
 waitingForRole_phrase:' Через 5 минут доступ будет открыт.\nА пока почитайте правила сервера <#301319871981944834>',
 tryAgain_phrase:' Попробуй пройти тест еще раз',
 ifFail_phrase:' Перезайди или напиши что-нибудь в этот канал',
 fail_phrase:[
            ' По твоему на картинке изображен #wrong_answer ?.. <:p_:402137819314651137>',
             ' Ты нормальный? #wrong_answer с #right_answer спутал'  
              ],
  ifFail_phrase:' Перезайди на сервер (инвайт отправлен в лс)',
  dm_msg:'Вы не прошли проверку на бота для доступа ко всем каналам сервера, перезайдите и попробуйте еще раз.\n https://discord.gg/3Q8ZVhH',
  footer_txt:'Нажатие на другие реакции (кроме верной) не позволит вам пройти тест на бота'
};
exports.delay={
 waitingForRole_minutes:5,
 waitingReactions_minutes:10
};

exports.secret_arr=[


['https://cdn.discordapp.com/attachments/488840569674530816/529245206403612682/r1.jpg','☯','инь-янь'],
['https://raw.githubusercontent.com/e3Dr8nj/file_storage/master/1515478436_tmpqhxuel.jpeg','👽','инопланетянен'],
['https://raw.githubusercontent.com/e3Dr8nj/file_storage/master/58d94791a3c4c15b10bf9107.png','🦋','бабочка'],
 ['https://raw.githubusercontent.com/e3Dr8nj/file_storage/master/ogon.jpg','🔥','огонь'] ,
['https://raw.githubusercontent.com/e3Dr8nj/file_storage/master/2f6d813fb35408ccaa28df1fcbd44983_cropped_aed64e3ec.jpg','🍄','гриб'],
['https://raw.githubusercontent.com/e3Dr8nj/file_storage/master/med_1486059184_image.jpg','😭','маленькая бедняжка'],
['https://raw.githubusercontent.com/e3Dr8nj/file_storage/master/heart%20fire.jpg','🖤','сердце'],
['https://raw.githubusercontent.com/e3Dr8nj/file_storage/master/25516-thickbox_default.jpg','👣','следы'] ,
['https://raw.githubusercontent.com/e3Dr8nj/file_storage/master/59fcac9bbc61a15f8302407c.png','💀','череп'],
['https://raw.githubusercontent.com/e3Dr8nj/file_storage/master/Unicorn-galloping-sky-clouds-full-moon-Desktop-Wallpaper-HD-for-mobile-phones-and-laptops-1280x1024.jpg','🦄','единорог']
/*
['unicorn/r1.jpg','🦄'],
['unicorn/r1.jpg','🦄'],
['unicorn/r1.jpg','🦄'],
['unicorn/r1.jpg','🦄'],
['unicorn/r1.jpg','🦄'],
['unicorn/r1.jpg','🦄']
*/
];//secret_arr

exports.system={
  ROLE_TIME_NAME:'Временная роль',
  ROLE_NAME:'Кто все эти люди',
 GUEST_CHANNEL_ID:'488840569674530816',
 SERVER_ID:'301063859702071316'
};//

exports.run = async(client, member) => {
try{
          if(member.guild.id!=module.exports.system.SERVER_ID) return;

//-----check if member has roles 
        let delay=(duration)=>new Promise( resolve => setTimeout(resolve,duration) );
        await delay(5*1000); 
        if( member.roles.keyArray().length>2) {
           //await   member.removeRole(member.guild.roles.find(r=>r.name==module.exports.system.ROLE_TIME_NAME));
           //await member.guild.channels.get(module.exports.system.GUEST_CHANNEL_ID).send(member.user.username+' Уже есть роли доступа');
           //return;
        }else if(member.roles.keyArray().length==2){
           if (!member.roles.find(r=>r.name==module.exports.system.ROLE_TIME_NAME)){
              //await member.guild.channels.get(module.exports.system.GUEST_CHANNEL_ID).send(member.user.username+' Уже есть роль доступа');
            //  return;
             };
        };
//-----

          await module.exports.check(client,member);
 }catch(err){console.log(err);}
};//exports.end

exports.check = async(client, member) => {
try{
   let delay=(duration)=>new Promise( resolve => setTimeout(resolve,duration) );
   let channel=client.channels.get(module.exports.system.GUEST_CHANNEL_ID);
    if (member.guild.id!=exports.system.SERVER_ID) return; 
   let roleTime=await channel.guild.roles.find(r=>r.name==module.exports.system.ROLE_TIME_NAME);
   if(roleTime) await member.addRole(roleTime);
  let obj={};
   async function checkBot(){  
         let secret_arr=module.exports.secret_arr.slice();
         let new_arr = [];
         for (let i = 0;i<10;i++){
         let xrnd_ = Math.ceil(Math.random() * secret_arr.length-2);
         new_arr.push(secret_arr.splice(xrnd_,1));
         };

      secret_arr=new_arr; console.log(new_arr);
      secret_arr=secret_arr.map(e=>e[0]);
//---------
      let obj_={};
      await secret_arr.map(e=>obj_[e[1]]=e);
      console.log(obj_);
      obj=obj_;
//----
      let xrnd = Math.ceil(Math.random() * secret_arr.length-1);
      let desc=secret_arr[xrnd][0];
      let emo=secret_arr[xrnd][1];
    let desc_msg = module.exports.phrases.enter_phrase;
    let file_name = desc;
     let check_msg = await channel.send(member,{embed: {
            description: member+ " "+desc_msg,
            image: {
                //url: "attachment://"+'r1.jpg'
                 url: "attachment://r1.jpg"
            },
          footer:{text:module.exports.phrases.footer_txt}
        },
                                        
                                
        files: [{ attachment: file_name,name:'r1.jpg' }] 
     });
     
//--
//--------
  for(let i=0;i<secret_arr.length;i++){
       let emoji_name=  secret_arr[i][1]; 
      let emoji= await client.guilds.get(module.exports.system.SERVER_ID).emojis.find(e=>e.name==emoji_name);
       emoji=(emoji)?emoji.id:emoji_name;
       check_msg.react(emoji);
  };     
//-----------

  let filter=(reaction,user)=>(user.id==member.user.id);
  let waiting_time=module.exports.delay.waitingReactions_minutes*60*1000;
  let resolve = await check_msg.awaitReactions(filter,{max:1,time:waiting_time,errors:['time']}).then(collection=>{
              if (collection.first().emoji.name==emo) {
          
           return true;}else{
                  console.log(obj);
                 let random = Math.ceil(Math.random() * module.exports.phrases.fail_phrase.length-1);
                 let wrong_answer=obj[collection.first().emoji.name][2];
                 let str = module.exports.phrases.fail_phrase[0].replace('#wrong_answer',wrong_answer);
                 let right_answer=obj[emo][2];
                 str = str.replace('#right_answer',right_answer);
                channel.send(member+str);  
                channel.send(member+module.exports.phrases.wrong_phrase);   
                return false;
                };
      
           }).catch(err=>{console.log(err); channel.send(member+module.exports.phrases.timeout_phrase); return false;});
    console.log(resolve);
  
   return resolve;
   
};//checkBot end;

 async function giveRole(){
    await channel.send(member+module.exports.phrases.waitingForRole_phrase);
    await delay(module.exports.delay.waitingForRole_minutes*60*1000);
    let roleTime=await channel.guild.roles.find(r=>r.name==module.exports.system.ROLE_TIME_NAME);
    if(roleTime) await member.removeRole(roleTime);
    let roleA=channel.guild.roles.find(r=>r.name==module.exports.system.ROLE_NAME);
    if(roleA) await member.addRole(roleA);
    return 1;
};//end giveRole 
 let resolve = await checkBot();
 
  //let resolve=true;
   console.log('resolve '+resolve);
   if(resolve){
     await giveRole(); 
   };//resolve true

//---------------
  if( !member.guild.members.get(member.user.id)) return;
 if( !member.roles.has(member.guild.roles.find(r=>r.name==module.exports.system.ROLE_TIME_NAME).id) ) return;
//--------------------------

  if(!resolve){
    await delay(2*1000);
    await channel.send(member+module.exports.phrases.tryAgain_phrase);
    await delay(2*1000);
   resolve = await checkBot();
   if(resolve){
     await delay(2*1000);
     await giveRole();
   };
    if(!resolve){
      await delay(2*1000);
      await channel.send(member+module.exports.phrases.ifFail_phrase);
       let mmb = member.guild.members.get(member.user.id);
       if(mmb){mmb.user.send(module.exports.phrases.dm_msg)};
     // await delay(2*1000);
     // await channel.send(member+module.exports.phrases.ifFail_phrase);
    };
return;
  };

}catch(err){console.log(err);};
};//run end


