<?php

session_start();

//routing
if(isset($_GET["q"])){
	switch ($_GET["q"]) {
	case 'process':
		$file = file_get_contents("./json/incoming.json");
    	$transfers = json_decode($file);
		insertTransfersToDB($transfers);
		break;
	case 'processFile':
		$postdata = file_get_contents("php://input");
		$transfers = json_decode($postdata);
		insertTransfersToDB($transfers);
		break;
			case 'processTransferList':
		$postdata = file_get_contents("php://input");
		$transfers = json_decode($postdata);
		clearListedTransfers();
		insertTransferListToDB($transfers);
		break;
	case 'transfers':
		echo json_encode(getTransfers());
		break;
	case 'transferlist':
		echo json_encode(getTransferList());
		break;
	case 'teams':
		echo json_encode(getTeams());
		break;
	default:
		break;
	}
}
else{
	echo "no query sent";
}

function insertTransfersToDB($transfers){
    $counter = 0;
    foreach($transfers as $transfer){
        insertPlayer($transfer->player);
        insertTeam($transfer->sourceTeam);
        insertTeam($transfer->destinationTeam);
        insertTransfer($transfer);

        $counter++;
    }

    echo $counter ." transfers inserted";
}

function insertTransferListToDB($transfers){
    $counter = 0;
    foreach($transfers as $transfer){
        insertPlayer($transfer->player);
        insertTeam($transfer->team);
        insertListedTransfer($transfer);

        $counter++;
    }

    echo $counter ." possible transfers inserted";
}



function getTransfers(){
		// 	Create connection
	$conn = connect();
	// 	Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	$sql = "SELECT * FROM `transfer` ";
	$conn->query('SET CHARACTER SET utf8');
	$result = $conn->query($sql);
	$transfers = [];
	while ($obj = mysqli_fetch_object($result)) {
		$obj->player = getPlayer($obj->player);
		$obj->destinationTeam = getTeam($obj->destinationTeam);
		$obj->sourceTeam = getTeam($obj->sourceTeam);
		$transfers[] = $obj;
	}
    return $transfers;
}

function getTransferList(){
		// 	Create connection
	$conn = connect();
	// 	Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	$sql = "SELECT * FROM `listed_transfer` ";
	$conn->query('SET CHARACTER SET utf8');
	$result = $conn->query($sql);
	$transfers = [];
	while ($obj = mysqli_fetch_object($result)) {
		$obj->player = getPlayer($obj->playerid);
		$obj->team = getTeam($obj->teamid);
		$transfers[] = $obj;
	}
    return $transfers;
}

function getTeams(){
		// 	Create connection
	$conn = connect();
	// 	Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	$sql = "SELECT * FROM `team` WHERE ranking > 0";
	$conn->query('SET CHARACTER SET utf8');
	$result = $conn->query($sql);
	$teams = [];
	while ($obj = mysqli_fetch_object($result)) {
		$teams[] = getTeamDetails($obj->id);
	}
    return $teams;
}

function getPlayer($id){
	// 	Create connection
	$conn = connect();
	// 	Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	$sql = "SELECT * FROM `player` WHERE id = ". $id;
	$conn->query('SET CHARACTER SET utf8');
	$result = $conn->query($sql);
	$player= new stdClass();
	while ($obj = mysqli_fetch_object($result)) {
		return $obj;
	}
}

function getTeam($id){
	// 	Create connection
	$conn = connect();
	// 	Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	$sql = "SELECT * FROM `team` WHERE id = ". $id;
	$conn->query('SET CHARACTER SET utf8');
	$result = $conn->query($sql);
	while ($obj = mysqli_fetch_object($result)) {
		return $obj;
	}
}
//get team with all the extra info added
function getTeamDetails($id){
	// 	Create connection
	$conn = connect();
	// 	Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	$sql = "SELECT * FROM `team` WHERE id = ". $id;
	$conn->query('SET CHARACTER SET utf8');
	$result = $conn->query($sql);
	while ($obj = mysqli_fetch_object($result)) {
		$in = getTeamTransfersIn($obj->id);
		$out = getTeamTransfersOut($obj->id);
		$obj->transfersIn = $in->transfers;
		$obj->transfersOut = $out->transfers;
		$obj->valueIn = $in->value;
		$obj->priceIn = $in->price;
		$obj->valueOut = $out->value;
		$obj->priceOut = $out->price;
		return $obj;
	}
}

function getTransfer($id){
	// 	Create connection
	$conn = connect();
	// 	Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	$sql = "SELECT * FROM `transfer` WHERE id = ". $id;
	$conn->query('SET CHARACTER SET utf8');
	$result = $conn->query($sql);
	while ($obj = mysqli_fetch_object($result)) {
		return $obj;
	}
}

function getTeamTransfersIn($id){
	// 	Create connection
	$conn = connect();
	// 	Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	$sql = "SELECT COUNT(*) as transfers,SUM(value) as value ,SUM(price) as price FROM `transfer` WHERE destinationTeam = ". $id;
	$conn->query('SET CHARACTER SET utf8');
	$result = $conn->query($sql);
	$player= new stdClass();
	while ($obj = mysqli_fetch_object($result)) {
		return $obj;
	}
}

function getTeamTransfersOut($id){
	// 	Create connection
	$conn = connect();
	// 	Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	$sql = "SELECT COUNT(*) as transfers,SUM(value) as value ,SUM(price) as price FROM `transfer` WHERE sourceTeam = ". $id;
	$conn->query('SET CHARACTER SET utf8');
	$result = $conn->query($sql);
	$player= new stdClass();
	while ($obj = mysqli_fetch_object($result)) {
		return $obj;
	}
}

function insertPlayer($player){
    $conn = connect();
    // 	Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    	$conn->query('DELETE FROM `player` WHERE id = ' . $player->id);
			$sql = "INSERT INTO `player` (id,
									fullName,
									name,
									position,
									statAtt,
									statDef,
									statOvr,
									age,
									leagueId,
									status,
									price,
									value,
									nationality,
                                    goals,
                                    assists,
									trainingProgress,
									trainingForecast) 
		
		 VALUES ('".$player->id."', '".escape($conn,$player->fullName)."', '".escape($conn,$player->name)."', '".$player->position."', '".$player->statAtt."', '".$player->statDef."', '".$player->statOvr."', '".
			$player->age."', '".$player->leagueId."', '".$player->status."', '".$player->price."', '".
			$player->value."', '".$player->nationality->code."', '".$player->goals."', '".$player->assists."', '".$player->trainingProgress ."', '".$player->trainingForecast ."' )";
			
			$conn->query('SET CHARACTER SET utf8');
			$conn->query($sql);
		
}


function clearListedTransfers(){
	 $conn = connect();
    // 	Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
		$conn->query('DELETE FROM `listed_transfer`');ransfer->player->value."', '".$transfer->type."', '".$transfer->transferPrice."')";
		$conn->query('SET CHARACTER SET utf8');
		$conn->query($sql);
}
function insertListedTransfer($transfer){
    $conn = connect();
    // 	Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
			$sql = "INSERT INTO `listed_transfer` (id,
									playerid,
									teamid,
									price,
									value,
									type,
									transferPrice) 
		 VALUES ('".$transfer->id."', '".$transfer->player->id."', '".$transfer->team->id."', '".$transfer->price."', '".
		 $transfer->player->value."', '".$transfer->type."', '".$transfer->transferPrice."')";
			$conn->query('SET CHARACTER SET utf8');
			$conn->query($sql);
		
}

function insertTeam($team){
    $conn = connect();
    // 	Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    	$conn->query('DELETE FROM `team` WHERE id = ' . $team->id);

		if(isset($team->assets[1]))
			$path = $team->assets[1]->path;
		else if(isset($team->assets[0]))
			$path = $team->assets[0]->path;
		else
			$path = "";

			$sql = "INSERT INTO `team` (id,
									uniqueId,
									logopath,
									leagueId,
									leagueTypeId,
									name,
									city,
									goal,
									stadiumName,
									stadiumCapacity,
									ranking,
									stadiumLevel,
									previousRanking,
									budget) 
		
		 VALUES ('".$team->id."', '".$team->uniqueId."', '".$path."', '".$team->leagueId."', '".$team->leagueTypeId."', '".escape($conn,$team->name)."', '".escape($conn,$team->city)."', '".
			$team->goal."', '".escape($conn,$team->stadiumName)."', '".$team->stadiumCapacity."', '".$team->ranking."', '".$team->stadiumLevel."', '".
			$team->previousRanking."', '".$team->budget."')";
			
			$conn->query('SET CHARACTER SET utf8');
			$conn->query($sql);
		
}

function insertTransfer($transfer){
    $conn = connect();
    // 	Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    	$conn->query('DELETE FROM `transfer` WHERE id = ' . $transfer->id);
			$sql = "INSERT INTO `transfer` (id,
									leagueId,
									value,
									price,
									weekNr,
									startDay,
									timestamp,
									player,
									destinationTeam,
									sourceTeam) 
		
		 VALUES ('".$transfer->id."', '".$transfer->leagueId."', '".$transfer->value."', '".
		 	$transfer->price."', '".$transfer->weekNr."', '".$transfer->startDay."', '".
            $transfer->timestamp."','".$transfer->player->id."','".$transfer->destinationTeam->id."', '".$transfer->sourceTeam->id."')";
			
			$conn->query('SET CHARACTER SET utf8');
			$conn->query($sql);		
}

function connect(){
    $servername = "localhost";
   $username = "deb38057_osm";
    $password = "deb38057_osm";
    $dbname = "deb38057_osm";

   // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
    if ($conn->connect_error) {
       die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}


function escape($conn,$input)
{
    if (!get_magic_quotes_gpc()) {
        $input = mysqli_real_escape_string($conn,$input);
    }
    return $input;
}

function toNull($input, $quote)
{
    if ($input == "") {
        return "NULL";
    } else {
        if ($quote) {
            return "'" . $input . "'";
        } else {
            return $input;
        }
    }
}
?>