import React , {useEffect, useState} from "react";

export default function MyTimer(props){

    const [formData, setFormData] = useState({
        mini:0,
        sec:0
    })

    const [timeInfo, setTimeInfo] = React.useState({
        mini:0,
        sec:0,
        totalTime:0
    })
    
    const [pause, setPause] = useState(true);



    useEffect(() => {
        let interval = null;
        if (!pause && timeInfo.totalTime !== -1 ) {
            interval = setInterval(() => {

            //Set Time info
            setTimeInfo(function(prevtimeInfo){
                    console.log( 'setTime info ',timeInfo.totalTime)
                    console.log( 'totalTime : ' , timeInfo.totalTime );
                    return {
                        ...prevtimeInfo,
                        totalTime : prevtimeInfo.totalTime - 1,
                        mini: Math.floor(prevtimeInfo.totalTime / 60) ,
                        sec:  Math.floor(prevtimeInfo.totalTime % 60)
                    }
                
            })

          }, 1000);
        } else if (pause && timeInfo.totalTime !== 0) {
          clearInterval(interval);
        } 
        return () => clearInterval(interval);
      }, [pause, timeInfo.totalTime]);

    

    function handleToggle(event){
        event.preventDefault()

        setPause(prevPause => !prevPause);
        console.log('toggle pause' , pause);
    }

    function handleReset(event) {
        event.preventDefault()

        setTimeInfo(function(prevTimeInfo){

            return {
                ...prevTimeInfo,
                totalTime:0,
                mini:0,
                sec:0
            }
        })
        clearInterval()
        setPause(false);
    }

    function handleChange(event){

        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))

    }


    function handleStart(event){
        event.preventDefault()
        setPause(false);

        if( formData.sec > 60 ){
            formData.mini  = Number(formData.mini) +  Number(Math.floor( formData.sec / 60 ))
            formData.sec   = Math.floor( formData.sec % 60 )
            console.log( 'New formdata', formData )
        }

        setTimeInfo({
            mini: formData.mini,
            sec:formData.sec,
            totalTime: Number(formData.mini * 60) + Number(formData.sec)
        })
        
    }

    return(
        <>
            <h2>Time : {timeInfo.totalTime}</h2>
            <h2>
            {String(timeInfo.mini).padStart(2,'0')}:{String(timeInfo.sec).padStart(2,'0')}
            </h2>
            <h3>pause state: {pause ? "TRUE" : "FALSE" }</h3>
            <form>
                <input type="input"
                       name="mini"
                       onChange={handleChange} 
                       value={formData.mini}/>
                <input type="input"
                       name="sec"
                       onChange={handleChange} 
                       value={formData.sec} />
                <button type="submit"
                        name="start"
                        onClick={handleStart}>Start</button>
                <button type="submit"
                        name="pause"
                        onClick={handleToggle}>Pause / Resume</button>
                <button type="button"
                        name="reset"
                        onClick={handleReset}> Reset </button>
                    
            </form>
        </>
    )
}