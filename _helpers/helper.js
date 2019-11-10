const router = require('express').Router();
const teamModel = require('../users/team.model');
var fs = require('fs');
const db = require('./db1');
const Team = db.Team;
const CircularJSON = require('circular-json');
var result =  [
	{
        "teamName": "ABC",
        "score": "0"
    },
		{
	        "teamName": "DEF",
	        "score": "0"
	    },
			{
		        "teamName": "GHI",
		        "score": "0"
		 }

]


router.get('/add',  async(req,res)=>{
    for(let  i=0; i < result.length;i++)
    {
            const team =  new Team({
                teamName : result[i].teamName,
                score : result[i].score,
                });
                team.save();
    }

});




router.get('/getTeam', async(req,res)=>{
	const teamList = await Team.find({});

	if(teamList!=null)
	{
		res.send(teamList);
	}else {
		res.send("No teams found");
	}
});




module.exports = router;
