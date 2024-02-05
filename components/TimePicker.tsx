import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs,{ Dayjs } from "dayjs";

interface TimePickerProps{
    onChange:(v:string)=>void,
    value:string,
    
}

const TimePicker:React.FC<TimePickerProps>=({
  onChange,
  value
})=>{


    return <div>
    <LocalizationProvider
                dateAdapter={AdapterDayjs}>
                  <MobileTimePicker
                  onChange={(v:Dayjs|null)=>{
                    console.log(v?.format('h:mm:ss A'))
 onChange(v?.format('h:mm:ss A')||'');
                  }}
                  value={dayjs(value, 'h:mm:ss A')}
                  />
                  </LocalizationProvider>
                  </div>
}

export default TimePicker;