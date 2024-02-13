"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

interface EditorProps{
    onChange:(value:string)=>void;
    value:string,
    setBlur:(v:boolean)=>void
}

export const Editor=({
onChange,
setBlur,
value
}:EditorProps)=>{
const ReactQuilll=useMemo(()=>dynamic(()=>import("react-quill"),{ssr:false}),[]);


return (
<div className="bg-customLight
h-full
w-full">
<ReactQuilll
onFocus={()=>setBlur(false)}
onBlur={()=>setBlur(true)}
placeholder="What did you teach today....."
theme="snow"

value={value}
onChange={onChange}
/>
</div>

);


}
