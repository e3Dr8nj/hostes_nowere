
exports.run =async(client,message,args)=>{try{
      client.emit('guildMemberAdd',message.member);
  
}catch(err){console.log(err);};  };


