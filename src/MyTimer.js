import React , {useEffect} from "react";

export default function MyTimer(props){

    const [timeInfo, setTimeInfo] = React.useState({
        mini:props.startMini,
        sec:props.startSec,
        totalTime:   Number(props.startMini * 60) + Number(props.startSec) 
    })
    
    function startTimer(){
        const intervalId = setInterval( (prevtimeInfo) => {

                // Update time
                setTimeInfo(function(prevtimeInfo){
                    if( timeInfo.totalTime > 0 ){
                        console.log( 'totalTime : ' , timeInfo.totalTime );
                        return {
                            ...prevtimeInfo,
                            totalTime : prevtimeInfo.totalTime - 1,
                            mini: Math.floor(prevtimeInfo.totalTime / 60) ,
                            sec:  prevtimeInfo.totalTime % 60
                        }
                    } else {
                         clearInterval(intervalId)
                    }
                })
            
        },1000)
    }

    useEffect(()=>{
        startTimer()
    })
    
    
    return(
        <>
            <h2>Time : {timeInfo.totalTime}</h2>
            <h3>{timeInfo.mini}:{timeInfo.sec}</h3>
        </>
    )
}