import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";

import "@excalidraw/excalidraw/index.css";
// import { useRef } from "react";

// type ExcalidrawAPI = {
//     getSceneElements: () => any[];
//     getFiles: () => any;
//   };
  



const ExcalidrawComponent = () => {
    // const excalidrawRef = useRef<ExcalidrawAPI | null>(null);
    const UIOptions = {
        canvasActions: {
         
            dockedSidebarBreakpoint: 0,
          loadScene: false,
        
        },
        
      };
  return (
    <div style={{ height: "100vh" }}>
        <Excalidraw UIOptions={UIOptions} onChange={(excalidrawElements,appState,file)=>{
            console.log(excalidrawElements,appState,file)
        }}  >
            <MainMenu>
            <MainMenu.DefaultItems.Export />
            <MainMenu.DefaultItems.SearchMenu/>
            <MainMenu.DefaultItems.ChangeCanvasBackground/>
            <MainMenu.DefaultItems.ClearCanvas/>
            <MainMenu.DefaultItems.SaveAsImage/>
            <MainMenu.DefaultItems.ToggleTheme/>
            <MainMenu.DefaultItems.SaveToActiveFile/>
            <MainMenu.DefaultItems.CommandPalette/>
            {/* <MainMenu.DefaultItems.N/> */}
            
            
            </MainMenu>
            
       
            </Excalidraw>
    </div>
  )
}

export default ExcalidrawComponent

