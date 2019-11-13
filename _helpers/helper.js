const router = require('express').Router();
const teamModel = require('../users/team.model');
var fs = require('fs');
const db = require('./teamdb');
const Team = db.Team;
var result =  [
	{
        "teamName": "ABC",
        "score": {}
    },
		{
	        "teamName": "DEF",
	        "score": {}
	    },
			{
		        "teamName": "GHI",
		        "score": {}
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
		res.send("done");

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

router.post('/getTeamById', async(req, res)=>{
	const team = await Team.findById(req.body.id);

	res.send(team);

});




module.exports = router;
