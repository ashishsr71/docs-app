import Editor from "../components/Editor"
import Navbar from "../components/Navbar"


import Toolbar from "../components/Toolbar"


function Document() {
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden h-[112px]">
      <Navbar/>
      <Toolbar/>
      </div>
      <div className="pt-[114px] print:pt-0 ">
      <Editor/>
      </div>
      </div>
  )
}

export default Document