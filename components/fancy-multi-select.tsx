"use client";

import ReactSelect from "react-select";

interface Selectprops{
    label:string,
    isSingle:boolean,
    value?:Record<string,any>|Record<string,any>[]|null,
    onChange:(value:Record<string,any>)=>void;
    options:Record<string,any>[];
    disabled?:boolean    
}
const Select:React.FC<Selectprops>=({
    label,
    value,
    onChange,
    options,
    disabled,
    isSingle
})=>{

    return <>
    <div className="z-[100]">
         
         
<ReactSelect
hideSelectedOptions
className="w-full
text-customLight"
isDisabled={disabled}
value={value}
//@ts-ignore
onChange={onChange!}
isMulti={!isSingle}
options={options}
menuPortalTarget={typeof document !== 'undefined' ? document.body : null}

styles={{
    menuPortal:(base)=>({
        ...base,
        zIndex:9999,
        minWidth:"100%",
        width:"100%"
    })

}}
classNames={{
    control:()=> "text-sm w-full"
}}
/> 
         </div>
         
          </>
}


export default Select;