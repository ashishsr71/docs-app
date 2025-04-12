import { CircleUserIcon } from "lucide-react";


const List = () => {
  return (
    <div className="w-full h-full mt-10 ">
        <div className="mb-10 ">
            <table className=" table-auto w-full shadow-md mt-5 border-spacing-2 border-separate rounded pb-10">
            <thead className="bg-base-200 text-left text-gray-700  tracking-wider">
          <tr>
            <th className="pl-30 ">Name</th>
            <th className="pl-30">Shared</th>
            
            <th className="pl-30">Created At</th>
          </tr>
        </thead>
            <tbody >
                <tr className="bg-card mt-6 rounded">
                <td className="pl-30 pt-10 w-[80px]">
                    <div className="flex gap-x-1"><CircleUserIcon/>
                   <span> hiiiiii</span></div>
                    </td>
                    <td className="pl-30 pt-10 w-[80px]">
                    <div className="flex gap-x-1"><CircleUserIcon/>
                   <span> hiiiiii</span></div>
                    </td>
                    <td className="pl-30 pt-10 w-[80px]">
                    <div className="flex gap-x-1"><CircleUserIcon/>
                   <span> hiiiiii</span></div>
                    </td>
                </tr>
                <tr className="bg-card mt-6 rounded">
                <td className="pl-30 pt-10 w-[80px]">
                    <div className="flex gap-x-1"><CircleUserIcon/>
                   <span> hiiiiii</span></div>
                    </td>
                    <td className="pl-30 pt-10 w-[80px]">
                    <div className="flex gap-x-1"><CircleUserIcon/>
                   <span> hiiiiii</span></div>
                    </td>
                    <td className="pl-30 pt-10 w-[80px]">
                    <div className="flex gap-x-1"><CircleUserIcon/>
                   <span> hiiiiii</span></div>
                    </td>
                </tr>
                <tr className="bg-card mt-6 rounded">
                <td className="pl-30 pt-10 w-[80px]">
                    <div className="flex gap-x-1"><CircleUserIcon/>
                   <span> hiiiiii</span></div>
                    </td>
                    <td className="pl-30 pt-10 w-[80px]">
                    <div className="flex gap-x-1"><CircleUserIcon/>
                   <span> hiiiiii</span></div>
                    </td>
                    <td className="pl-30 pt-10 w-[80px]">
                    <div className="flex gap-x-1"><CircleUserIcon/>
                   <span> hiiiiii</span></div>
                    </td>
                </tr>
            </tbody>
            
            </table>
        </div>
        
        </div>
  )
}

export default List;