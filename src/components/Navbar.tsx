
import DocumentInput from './DocumentInput'
import Logo from '../assets/logo.svg'
import * as Menubar from "@radix-ui/react-menubar";

import { BoldIcon,  FileIcon, FileJsonIcon, FilePenIcon, FilePlusIcon, FileTextIcon, GlobeIcon, ItalicIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, Strikethrough, TextIcon, TrashIcon, Underline, Undo2Icon } from 'lucide-react';
import { BsFilePdf } from 'react-icons/bs';
import { useEditorStore } from '../store/useEditor';
import UserStack from './Users';
import Notification from './ui/Notification';

const Navbar = () => {
const {editor}=useEditorStore();

const insertTable=({rows,cols}:{rows:number,cols:number})=>{
    editor?.chain().focus().insertTable({rows,cols,withHeaderRow:false}).run();
}

const onDownload=(blob:Blob,filename:string)=>{
    const url= URL.createObjectURL(blob);
    const a= document.createElement("a");
    a.href=url;
    a.download=filename;
    a.click();
};

const onSaveJSON=()=>{
    if(!editor) return;
    const content=editor.getJSON();
    const blob= new Blob([JSON.stringify(content)],{
        type:"application/json",
    }); 

    onDownload(blob,`document.json`)
};


const onSaveHTML=()=>{
    if(!editor)return;

    const content=editor.getHTML();
   
    const blob=new Blob([content],{
        type:"text/html"
    });

    onDownload(blob,`document.html`)
};

const onSaveText=()=>{
    if(!editor) return;
    const content=editor.getText();
    const blob=new Blob([content],{
        type:"text/plain"
    });

    onDownload(blob,`document.txt`);
}
const printEditorContent = () => {
    const editorContent = document.querySelector(".ProseMirror");
    if (!editorContent) return;
  
    const newWindow: any = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Document</title>
          <style>
            /* Basic page setup */
            body {
              margin: 0;
              padding: 20px;
              width: 816px;
            }
  
            .ProseMirror {
              width: 100%;
              font-family: sans-serif;
              line-height: 1.5;
            }
  
            /* Ensure tables are visible */
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 1rem 0;
              table-layout: fixed;
            }
  
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
  
            th {
              background-color: #f0f0f0;
            }
  
            /* Handle pagination breaks */
            .page-break {
              break-before: always;
              display: block;
              height: 0;
              visibility: hidden;
            }
  
            /* Hide breaks inside tables during editing */
            table .page-break {
              display: none !important;
            }
              table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;
  
    td,
    th {
      border: 1px solid black;
      box-sizing: border-box;
      min-width: 1em;
      padding: 6px 8px;
      position: relative;
      vertical-align: top;
  
      > * {
        margin-bottom: 0;
      }
    }
  
    th {
      background-color: #c7c7c7;
      font-weight: bold;
      text-align: left;
    }
  
    .selectedCell:after {
      background: var(#959596);
      content: "";
      left: 0; right: 0; top: 0; bottom: 0;
      pointer-events: none;
      position: absolute;
      z-index: 2;
    }
  
    .column-resize-handle {
      background-color: 0 0% 9%;
      bottom: -2px;
      pointer-events: none;
      position: absolute;
      right: -2px;
      top: 0;
      width: 4px;
    }
  
            /* But show them again in print */
            @media print {
              table .page-break {
                display: block !important;
              }
            }
          </style>
        </head>
        <body>
          ${editorContent.innerHTML}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };
  

  return (
    <nav className='flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
        <img src={Logo} alt='logo' style={{width:36,height:36}}/>
     <div className='flex flex-col'>
        <DocumentInput/>
        <div className='flex'>
        <Menubar.Root className="border-none bg-transparent shadow-none h-auto p-0 ">
			<Menubar.Menu >
				<Menubar.Trigger className='text-sm font-normal cursor-pointer py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto' >
					File
				</Menubar.Trigger>
				<Menubar.Portal>
					<Menubar.Content
						className="z-50 mt-2 min-w-[150px] rounded-md bg-white p-1 shadow-lg border border-gray-200"
						align="start"
					>
						<Menubar.Sub >
                            <Menubar.SubTrigger  className='flex items-center hover:bg-neutral-300 rounded-lg bg-white ml-1.5 pl-1   pb-2'>
                      <FileIcon className='size-4 mr-2'/>
                        Save
                        </Menubar.SubTrigger>
                        <Menubar.SubContent >
                            <Menubar.MenubarItem
                            onClick={onSaveJSON}
                            className='flex items-center hover:bg-neutral-300 rounded-lg bg-white ml-1.5 pl-1  pb-2'>
                                <FileJsonIcon className='size-4 mr-2'/>
                                JSON
                            </Menubar.MenubarItem>
                            <Menubar.MenubarItem 
                            onClick={()=>{printEditorContent()}}
                            className='flex items-center hover:bg-neutral-300 rounded-lg bg-white ml-1.5 pl-1  pb-2' >
                                <BsFilePdf className='size-4 mr-2'/>
                                PDF
                            </Menubar.MenubarItem>
                            <Menubar.MenubarItem 
                            onClick={onSaveHTML}
                            className='flex items-center hover:bg-neutral-300 rounded-lg bg-white ml-1.5 pl-1   pb-2'>
                                <GlobeIcon className='size-4 mr-2'/>
                                HTML
                            </Menubar.MenubarItem>
                            <Menubar.MenubarItem 
                            onClick={onSaveText}
                            className='flex items-center hover:bg-neutral-300 rounded-lg bg-white ml-1.5 pl-1   pb-2'>
                                <FileTextIcon className='size-4 mr-2'/>
                                TEXT
                            </Menubar.MenubarItem>
                           
                            
                        </Menubar.SubContent>
                        </Menubar.Sub>
						<Menubar.Separator/>
                        <Menubar.MenubarItem className='flex items-center hover:bg-neutral-300 rounded-lg bg-white ml-1.5 pl-1  pb-2'>
                                <FilePlusIcon className='size-4 mr-2'/>
                                NEW
                            </Menubar.MenubarItem>
                            <Menubar.MenubarItem className='flex items-center hover:bg-neutral-300 rounded-lg bg-white ml-1.5 pl-1 w-25  pb-2'>
                                <FilePenIcon className='size-4 mr-2'/>
                                Rename
                            </Menubar.MenubarItem>
                            <Menubar.MenubarItem className='flex items-center hover:bg-neutral-300 rounded-lg bg-white ml-1.5 pl-1 w-25  pb-2'>
                                <TrashIcon className='size-4 mr-2'/>
                                Remove
                            </Menubar.MenubarItem>
                            <Menubar.Separator/>
                            <Menubar.MenubarItem 
                             onClick={()=>{printEditorContent()}}
                            className='flex items-center hover:bg-neutral-300 rounded-lg bg-white ml-1.5 pl-1 w-25  pb-2'>
                                <PrinterIcon className='size-4 mr-2'/>
                                Print
                            </Menubar.MenubarItem>
					</Menubar.Content>
				</Menubar.Portal>
			</Menubar.Menu>
            <Menubar.Menu >
				<Menubar.Trigger className='text-sm font-normal cursor-pointer py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto' >
					Edit
				</Menubar.Trigger>
				<Menubar.Portal>
					<Menubar.Content
						className="z-50 mt-2 min-w-[150px] rounded-md bg-white p-1 shadow-lg border border-gray-200"
						align="start"
					>
						<Menubar.Item className='flex items-center hover:bg-neutral-300 rounded-lg' onClick={()=>{editor?.chain().focus().undo().run()}} >
                      <Undo2Icon className='size-4 mr-2'/>
                        Undo
                        </Menubar.Item>
                        <Menubar.Item className='flex items-center hover:bg-neutral-300 rounded-lg' onClick={()=>{editor?.chain().focus().redo().run()}} >
                      <Redo2Icon className='size-4 mr-2'/>
                        Redo
                        </Menubar.Item>
						
					</Menubar.Content>
				</Menubar.Portal>
			</Menubar.Menu>
            <Menubar.Menu >
				<Menubar.Trigger className='text-sm font-normal cursor-pointer py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto' >
					Insert
				</Menubar.Trigger>
				<Menubar.Portal>
					<Menubar.Content
						className="z-50 mt-2 min-w-[150px] rounded-md bg-white p-1 shadow-lg border border-gray-200"
						align="start"
					>
                        <Menubar.Sub>
                            <Menubar.SubTrigger className='flex items-center hover:bg-neutral-300 rounded-lg'>Table</Menubar.SubTrigger>
						<Menubar.SubContent className='w-25 flex flex-col  bg-white ml-2 align-center'>
                        
                        <Menubar.Item className='flex items-center bg-white hover:bg-neutral-300 rounded-lg ml-2 p-1 align-center ' onClick={()=>{insertTable({rows:1,cols:1})}} >
                      {/* <FileIcon className='size-4 mr-2'/> */}
                        1 X 1
                        </Menubar.Item>
                        <Menubar.Item 
                         onClick={()=>{insertTable({rows:2,cols:2})}}
                        className='flex items-center bg-white hover:bg-neutral-300 rounded-lg ml-2 p-1' >
                      {/* <FileIcon className='size-4 mr-2'/> */}
                        2 X 2
                        </Menubar.Item>
                        <Menubar.Item 
                         onClick={()=>{insertTable({rows:3,cols:3})}}
                        className='flex items-center bg-white hover:bg-neutral-300 rounded-lg ml-2 p-1' >
                      {/* <FileIcon className='size-4 mr-2'/> */}
                        3 X 3
                        </Menubar.Item>
                        <Menubar.Item 
                         onClick={()=>{insertTable({rows:4,cols:4})}}
                        className='flex items-center bg-white hover:bg-neutral-300 rounded-lg ml-2 p-1' >
                      {/* <FileIcon className='size-4 mr-2'/> */}
                        4 X 4
                        </Menubar.Item>
                        </Menubar.SubContent>
						</Menubar.Sub>

					</Menubar.Content>
				</Menubar.Portal>
			</Menubar.Menu>
            <Menubar.Menu >
				<Menubar.Trigger className='text-sm font-normal py-0.5 px-[7px] cursor-pointer rounded-sm hover:bg-muted h-auto' >
					Format
				</Menubar.Trigger>
				<Menubar.Portal>
					<Menubar.Content
						className="z-50 mt-2 min-w-[150px] rounded-md bg-white p-1 shadow-lg border border-gray-200"
						align="start"
					>
                        <Menubar.Sub>
                            <Menubar.SubTrigger className='flex items-center'>
                                <TextIcon className='size-4 mr-2'/>
                                Text
                            </Menubar.SubTrigger>
                            <Menubar.SubContent  className='w-40 flex flex-col  bg-white ml-2 align-center'>
                            <Menubar.Item 
                            onClick={()=>{editor?.chain().focus().toggleBold().run()}}
                            className='flex items-center bg-white hover:bg-neutral-300 rounded-lg ml-2 p-1' >
                      <BoldIcon className='size-4 mr-2'/>
                        Bold
                        </Menubar.Item>
                        <Menubar.Item
                          onClick={()=>{editor?.chain().focus().toggleItalic().run()}}
                        className='flex items-center bg-white hover:bg-neutral-300 rounded-lg ml-2 p-1' >
                      <ItalicIcon className='size-4 mr-2'/>
                        Italic
                        </Menubar.Item>
                        <Menubar.Item 
                          onClick={()=>{editor?.chain().focus().toggleUnderline().run()}}
                        className='flex items-center bg-white hover:bg-neutral-300 rounded-lg ml-2 p-1' >
                      <Underline     className='size-4 mr-2'/>
                        Underline
                        </Menubar.Item>
                        <Menubar.Item 
                          onClick={()=>{editor?.chain().focus().toggleStrike().run()}}
                        className='flex items-center bg-white hover:bg-neutral-300 rounded-lg ml-2 p-1' >
                      <Strikethrough className='size-4 mr-2'/>
                     Strikethrough
                        </Menubar.Item>
                     
                            </Menubar.SubContent>
                        </Menubar.Sub>
						
                        <Menubar.Item
                        onClick={()=>{editor?.chain().focus().unsetAllMarks().run()}}
                        className='flex items-center bg-white hover:bg-neutral-300 rounded-lg ' >
                      <RemoveFormattingIcon className='size-4 mr-2'/>
                        Remove formatting 
                        </Menubar.Item>
					</Menubar.Content>
				</Menubar.Portal>
			</Menubar.Menu>
		</Menubar.Root>
        </div>
     </div>
      </div>
      <div className='flex'>
        <UserStack/>
       <Notification/>
       </div>
    </nav>
  )
}

export default Navbar