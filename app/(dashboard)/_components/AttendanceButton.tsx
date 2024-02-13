import { Button } from '@/components/ui/button'
import { TeacherAttendance } from '@prisma/client';
import axios from 'axios';
import { AlarmClockCheck, AlarmClockOff, AlertTriangle, Check, CheckCircle2, Clock10Icon, CrossIcon, Dot, Loader2, X } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
interface AttendanceButtonProps{
  id: number;
  isPresent: boolean;
  isAbsent: boolean;
  TeacherId:number;
  Arrival: string;
  departure: string;
  date: string;
  clerkId:string;
}
const AttendanceButton:React.FC<AttendanceButtonProps>=({
  id,
  isPresent,
  isAbsent,
  clerkId,
  Arrival,
  departure,
  TeacherId,
  date
})=> { 
 const [submitting,setIsSubmitting]=useState(false);
 const [distance,setDistance]=useState<number>(1000);
 const [loading,setLoading]=useState(true);
 const [currentTime, setCurrentTime] = useState<string>('');
 const [inRange,setInRange]=useState(false);
 const router=useRouter();
 useEffect(() => {
   // Function to update the current time
   const updateCurrentTime = () => {
       const now = new Date();
       let hours = now.getHours();
       const minutes = now.getMinutes();
       const seconds = now.getSeconds();
       const ampm = hours >= 12 ? 'PM' : 'AM';
 
       // Convert hours to 12-hour format
       hours = hours % 12 || 12;
 
       // Format the time as hh:MM:SS AM/PM
       const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`;
 
       setCurrentTime(formattedTime);
     };
 
     // Initial call to set the current time
     updateCurrentTime();
 
     // Set up an interval to update the current time every second
     const intervalId = setInterval(updateCurrentTime, 1000);
 
     // Clean up the interval when the component is unmounted
     return () => clearInterval(intervalId);
   }, []);
   
   
   
   useEffect(() => {
    let isMounted = true; // Variable to track component mount status
    let watchId: number | null = null;
    const fetchLocation = () => {
      setLoading(true);

      if (navigator.geolocation) {
        const options = {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 30000,
        };

        watchId = navigator.geolocation.watchPosition(
          (position) => {
            if (isMounted) {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              console.log(`Your coordinates: Latitude ${latitude}, Longitude ${longitude}`);
              const otherLatitude = 25.002123;
              const otherLongitude = 67.089675;

              const calculatedDistance = calculateDistance(latitude, longitude, otherLatitude, otherLongitude);
              setDistance(calculatedDistance);
              setLoading(false);
              console.log(`Distance to other coordinates: ${calculatedDistance} kilometers`);
            }
          },
          (error) => {
            if (isMounted) {
              console.error('Error getting your location:', error.message);
              setLoading(false);
            }
          },
          options
        );
      } else {
        console.error('Geolocation is not supported by your browser.');
        setLoading(false);
      }

      return () => {
        isMounted = false; // Set component as unmounted when it's about to unmount
        navigator.geolocation.clearWatch(watchId!); // Clear the watch position
      };
    };

    fetchLocation();
  }, []);
      
  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c; // Distance in kilometers
  
    return distance;
  }, []);
      
      function deg2rad(deg:number) {
        return deg * (Math.PI / 180);
      }
      useEffect(()=>{
if(distance<=10.25){
    setInRange(true)

}else{
    setInRange(false)
}
      },[distance,calculateDistance])
 const hadleClockIn=()=>{
  if(!inRange){
    toast.error("You are not in range to Clock-in");
    return ;
  }
setIsSubmitting(true);
  axios.post("/api/teacherAttendance",{
    TeacherId,
    clerkId,
    arrival:currentTime,
    date,
    isPresent:true,
    departure
  }).then((response)=>{
    console.log(response.data);
toast.success(`You just Clock in at ${currentTime}`);
  }).catch((Err)=>{
    console.log("[Error at AttendanceButton]");
    toast.error("Can not Clock-in")
  }).finally(()=>{
    setIsSubmitting(false);
    router.refresh();
    
  })
 }



 const hadleClockOut=()=>{
   
setIsSubmitting(true);
  axios.post("/api/teacherAttendance",{
    TeacherId,
    clerkId,
    arrival:Arrival,
    date,
    departure:currentTime
  }).then((response)=>{
    console.log(response.data);
toast.success(`You just Clocked-Out at ${currentTime}`);
  }).catch((Err)=>{
    console.log("[Error at AttendanceButton]",Err);
    toast.error("Can not Clock-out")
  }).finally(()=>{
    setIsSubmitting(false);
    router.refresh();
    
  })
 }



    return (
    <div


    className='relative
    
    mt-4'>
     {submitting && <Loader2
      className='absolute
      animate-spin
      text-customTeal
      w-[200px]
      h-[200px]
    z-50 
    
      '/>}  
  <div
  className='w-[200px]
  h-[200px]
  drop-shadow-lg
  ring-customLight
  z-50
  bg-customGray
  rounded-full
  text-customLight
   
 hover:shadow-sm
 hover:shadow-customLight
 
shadow-customLight
   
  

  flex-col
  
  items-center
  flex
  justify-center'>
    <div
    className='mb-2
    text-sm
    flex
    flex-row
    gap-x-2
    items-center'>
      {loading&&(<Loader2
      className='
      w-4
      h-4
      text-customTeal
      animate-spin'/>)}
    {inRange?(
<div
className='flex
items-center
justify-center
relative
flex-row
gap-x-1'>
       <Check
       className='text-green-600'/>
        <p>in Range!</p>
     </div>   
    ):(
<div
className='
flex
items-center
justify-center
flex-row
relative
gap-x-1
'>
  <AlertTriangle
  className='text-red-600'/>

   
    <p
    className='text-customLight'>Out of Range!</p>
</div>

    )}
    </div>
    <div
    className='
    flex
    flex-col
    items-center'>
 {Arrival.length===0?(

<div
onClick={hadleClockIn}
className='flex
w-full
flex-col
items-center'>
<AlarmClockCheck
className='
w-12
h-12
text-customTeal'/>
<p>Clock In</p>
<p>{currentTime}</p>
<p>{distance.toFixed(2)+"km away"}</p>
</div>
  ):(<div>
{departure.length>0?(
  <div
  className='flex
  flex-col
  text-center
  p-3'><p
  className='text-customLight'>Good job!
    You are done for today!</p>
<p
className='text-xs
'>{Arrival} to {departure}</p>
  </div>
):(
<div
onClick={hadleClockOut}
className='flex
w-full
flex-col
items-center'>
<AlarmClockOff
className='
w-12
h-12
text-red-600'/>
<p>Clock Out</p>
<p>{currentTime}</p>
<p>{distance.toFixed(2)+"km away"}</p>
</div>


)}
    
</div> )
 }     
</div>
  </div>

    </div>
  )
}
function wait(time:number){
  return new Promise(resolve=>setTimeout(resolve,time))
}
export default AttendanceButton;
