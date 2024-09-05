// dd_removeAverageAverage

var prev_avgx = [ ];
var prev_avgy = [ ];
var sumX = 0;
var sumY = 0;
// change this value to use a smaller or greater number of frames to
// perform the average of average of motion vectors
var tail_length = 20;
var mycount = 0;

function avg_prevx(n){
	let sum = 0;
	for (let t=0;t<n;t++){
		sum += prev_avgx[t];
	}
	let val = Math.round(sum / n);
    return val;
}

function avg_prevy(n){
	let sum = 0;
	for (let t=0;t<n;t++){
		sum += prev_avgy[t];
	}
	let val = Math.round(sum / n);
    return val;
}


export function glitch_frame(frame)
{
	// do this once to setup
	if(mycount == 0){
		mycount = 1;
		//push zeros into averages
		for(var i=0;i<tail_length-1;i++){
			prev_avgx.push(0);
			prev_avgy.push(0);
		}
	}
    // bail out if we have no motion vectors
    let mvs = frame["mv"];
    if ( !mvs )
        return;
    // bail out if we have no forward motion vectors
    let fwd_mvs = mvs["forward"];

    if ( !fwd_mvs )
        return;

	// average all the motion vectors in this frame

    let Width = fwd_mvs.length;
    let Height = 0;
    sumX = 0;
    sumY = 0;
    let TOTAL = 0;
    for ( let i = 0; i < fwd_mvs.length; i++ )
    {
		let row = fwd_mvs[i];
		Height = row.length;

		for ( let j = 0; j < row.length; j++ )
        {
			sumX += row[j][0];
			sumY += row[j][1];
			TOTAL++;
		}
	}


    prev_avgx.push(sumX);
    prev_avgy.push(sumY);

	// if too much prev data, trim
    if ( prev_avgx.length > tail_length ){
        prev_avgx.slice(1);
	}
	if ( prev_avgy.length > tail_length ){
        prev_avgy.slice(1);
	}
/*
	//if not enough prev data don't do owt
    if ( prev_avgx.length < tail_length ){
        //return;
	}
	if ( prev_avgy.length < tail_length ){
		//return;
	}
*/

// attack the mvs
    for ( let i = 0; i < fwd_mvs.length; i++ )
    {
        // loop through all rows
        let row = fwd_mvs[i];
        let H = row.length;
        for ( let j = 0; j < row.length; j++ )
        {
            // loop through all macroblocks
            let mv = row[j];
           //mv[0] =  mv[0] + avg_prevx(tail_length);
           //mv[1] =  mv[1] + avg_prevy(tail_length);
           //mv[0] =  avg_prevx(tail_length);
           //mv[1] =  avg_prevy(tail_length);
           mv[0] = mv[0] + sumX;
           mv[1] = mv[1] + sumY;
        }
    }
}

