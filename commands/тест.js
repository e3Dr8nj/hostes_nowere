exports.e={
  channels_exceptions:['488840569674530816','592803857369923595']
};

exports.run =async(client,message,args)=>{try{
      let channel_true=module.exports.e.channels_exceptions.includes(message.channel.id);
              if(!channel_true) return;
      client.emit('guildMemberAdd',message.member);
  
}catch(err){console.log(err);};  };


