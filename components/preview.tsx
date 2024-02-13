"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";

interface PreviewProps{
    setBlur:(v:boolean)=>void;
    value:string
}

export const Preview=({
 setBlur,
value
}:PreviewProps)=>{
const ReactQuilll=useMemo(()=>dynamic(()=>import("react-quill"),{ssr:false}),[]);


return (
<div className="bg-white
w-full">
<ReactQuilll
onFocus={()=>setBlur(false)}
placeholder="Enter Topic Description Please"
style={{
    fontSize:"18px"
}}
theme="bubble"
value={value}
readOnly
/>
</div>

);


}