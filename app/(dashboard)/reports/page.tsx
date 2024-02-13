import { Blocks, PartyPopper } from "lucide-react";

const Reports=()=>{


    return <div
    className="flex
    flex-col
    bg-customDark
    w-full
    justify-center
    items-center
    h-full
    p-3

    ">
        <div>
      <div
      className="p-8
      bg-customGray
      z-50
      text-customLight
      text-2xl

      rounded-lg
      ">
       <div
       className="flex-row
       w-full
       flex
       justify-center
       items-center
       gap-x-2

       "> <p>Reports feature is currently under development.
      </p>
      <Blocks
      className="text-customTeal
      w-20 h-20 "/>
      </div>
      <p
      className="text-sm">Stay tuned for updates!<PartyPopper/></p>
      </div>
      </div>
    </div>
}

export default Reports;