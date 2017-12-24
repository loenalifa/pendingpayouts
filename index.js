const Eris = require("eris");
var steem = require("steem");

var bot = new Eris("Bot Token Here!");
bot.on("ready", () => {console.log('Ready!');}); 
bot.on("messageCreate", (msg) => {
		var regex = /(\$)+(pp)+(\ )/;
		function rnd(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }
    if(msg.content.match(regex)){
        var acc 	= msg.content.replace(msg.content.match(regex)[0],"");
        var channel 	= msg.channel.id;
		var postcount	= 0;
		var total		= 0;
		var results		= '';
		var rndpending	= 0;
		var total		= 0;
		var allpaid		= false;
steem.api.getState('/@'+acc, function(err, result) {
     if (err){console.log(err);}
		var sortindex=result['accounts'][acc]['blog'];
			for (var i=0;i<sortindex.length;i+=1) {
				 var handle = sortindex[i].split('/');
				 var postauthor = handle[0];
				 var postpermlink = handle[1];
					 post = result['content'][postauthor+'/'+postpermlink];
       if (post['author']==acc && post['max_accepted_payout']!='0.000 SBD' && post['pending_payout_value']!='0.000 SBD'){
			results +='Post Title : '+post['title']+'\nPayout Time : '+post['cashout_time']+'\nPayout Value : '+post['pending_payout_value']+'\n\n';
			pending  = post['pending_payout_value'].split(" ");
			rndpending = rnd(Number(pending[0]),3);
			total    = rnd(rndpending+total,3);
			postcount++;
       if (post['cashout_time'].startsWith("1969")){allpaid=true;}
       }
       if (i==sortindex.length-1){
		   start_author		=	post['author'];
		   start_permlink	=	post['permlink'];
		   }
     }
     totalstring	=	'Total Pending Payouts : '+total+' SBD';
	  setTimeout(function(){bot.createMessage(channel, results+totalstring);},1000);
  });
	}
});
bot.connect(); 
