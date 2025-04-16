import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, HighlighterIcon, ImageIcon, ItalicIcon, Link2Icon, ListIcon, ListOrderedIcon, ListTodoIcon, LucideIcon, MessageSquarePlus, MinusIcon, PlusIcon, PrinterIcon, Redo2Icon, RemoveFormatting, SearchIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon, UploadIcon } from 'lucide-react';
import { useEditorStore } from '../store/useEditor';
import Separator from './Seperator';
import { Dialog,
   DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,} from './ui/Dialog';

import { ChevronDownIcon } from '@radix-ui/themes';

import { type Level } from '@tiptap/extension-heading';
import {type ColorResult,SketchPicker} from "react-color";
import { DropdownMenu as DdownMenu} from "radix-ui";
import {ChevronDown } from "lucide-react";
import { useState } from 'react';


interface ToolBarButtonProps{
    onClick?:()=>void;
    isActive?:boolean;
    icon:LucideIcon
}


const TextColorButton=()=>{
    const {editor}=useEditorStore();
    const value=editor?.getAttributes("textStyle").color || "#000000";

    const onChange=(color:ColorResult)=>{
    editor?.chain().focus().setColor(color.hex).run()
    }
    
    return (
   <DdownMenu.Root>
      <DdownMenu.Trigger asChild>
        <button className="h-3 min-w-7 shrink-0 flex  items-center  rounded-sm hover:bg-neutral">
          <span className='text-xs'>A</span>
          <div className='h-0.75 w-full top-0' style={{backgroundColor:value}}/>
          <ChevronDown className="w-4 h-4" />
        </button>
      </DdownMenu.Trigger>

      <DdownMenu.Portal>
        <DdownMenu.Content className="min-w-[160px] bg-white shadow-md rounded-lg p-1 border border-gray-200">
          <SketchPicker 
          color={value}
          onChange={onChange}
          />
           
        </DdownMenu.Content>
      </DdownMenu.Portal>
    </DdownMenu.Root>
    )
}
// this is image button

const ImageButton=()=>{
    const {editor}=useEditorStore();
    const [isDialogOpen,setIsDialogOpen]=useState(false);
    const [imageUrl,setImageUrl]=useState(""); 
    
    const onChange=(src:string)=>{
        editor?.chain().focus().setImage({src}).run();
        
    }
    const uploadImage=()=>{
        const input=document.createElement("input");
        input.type="file";
        input.accept="image/*"

        input.onchange=(e)=>{
            const file=(e.target as HTMLInputElement).files?.[0];
            if(file){
                const imageUrl=URL.createObjectURL(file);
                onChange(imageUrl);
            }
        }
        input.click()
    };

    const handleImageUrlSubmit=()=>{
        if(imageUrl){
            onChange(imageUrl);
            setImageUrl("");
            setIsDialogOpen(false);
        }
    }
        return (<>
            <DdownMenu.Root >
            <DdownMenu.Trigger asChild>
              <button className="h-3 min-w-7 shrink-0 flex  items-center  rounded-sm hover:bg-neutral">
                <ImageIcon className='size-4'/>
                <ChevronDown className="w-4 h-4" />
              </button>
            </DdownMenu.Trigger>
      
            <DdownMenu.Portal>
              <DdownMenu.Content className=" m-3 p-2.5 flex items-center gap-x-2 bg-blue-300 ">
                  <DdownMenu.Item onClick={uploadImage}>
                    <UploadIcon className='size-4 mr-2'/>
                    Upload
                    </DdownMenu.Item>      
                  <DdownMenu.Item onClick={()=>{setIsDialogOpen(true)}}>
                    <SearchIcon className='size-4 mr-2'/>
                    Paste image url
                    </DdownMenu.Item>                 
              </DdownMenu.Content>
            </DdownMenu.Portal>
          </DdownMenu.Root>
          <Dialog open={isDialogOpen} onOpenChange={()=>{setIsDialogOpen(!isDialogOpen)}} >
      {/* <DialogTrigger asChild>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Open Dialog
        </button>
      </DialogTrigger> */}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Image Url</DialogTitle>
        </DialogHeader>

        <input
      type="text"
      placeholder="enter url"
      onChange={(e)=>{setImageUrl(e.target.value)}}
      onKeyDown={(e)=>{
        if(e.key==="Enter"){
            handleImageUrlSubmit()
        }
      }}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
    />

        <DialogFooter>
          <button className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer">
            Insert
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
          </>
        )
    }

// this is link button
const LinkButton=()=>{
    const {editor}=useEditorStore();
    const [value,setValue]=useState(editor?.getAttributes("link").href||""); 
    
    const onChange=(href:string)=>{
        editor?.chain().focus().extendMarkRange("link").setLink({href}).run();
        setValue("");
    }
    
        return (
            <DdownMenu.Root onOpenChange={(open)=>{
                if(open){
                   setValue(editor?.getAttributes("link").href||"")
                }
            }}>
            <DdownMenu.Trigger asChild>
              <button className="h-3 min-w-7 shrink-0 flex  items-center  rounded-sm hover:bg-neutral">
                <Link2Icon className='size-4'/>
                <ChevronDown className="w-4 h-4" />
              </button>
            </DdownMenu.Trigger>
      
            <DdownMenu.Portal>
              <DdownMenu.Content className=" m-3 p-2.5 flex items-center gap-x-2 bg-blue-600 ">
              <input value={value}
              placeholder='Link'
              onChange={(e)=>setValue(e.target.value)}/>
              <button onClick={()=>{onChange(value)}}
                className='bg-white color-black'
                >Apply</button>           
                 
              </DdownMenu.Content>
            </DdownMenu.Portal>
          </DdownMenu.Root>
        )
    }


// this is Higlight color button

const HiglightColorButton=()=>{
    const {editor}=useEditorStore();
    const value=editor?.getAttributes("highlight").color ||"#FFFFFFF";

    const onChange=(color:ColorResult)=>{
    editor?.chain().focus().setHighlight({color:color.hex}).run()
    }
    
// link button


    return (
   <DdownMenu.Root>
      <DdownMenu.Trigger asChild>
        <button className="h-3 min-w-7 shrink-0 flex  items-center  rounded-sm hover:bg-neutral">
          <HighlighterIcon className='size-4'/>
          <ChevronDown className="w-4 h-4" />
        </button>
      </DdownMenu.Trigger>

      <DdownMenu.Portal>
        <DdownMenu.Content className="min-w-[160px] bg-white shadow-md rounded-lg p-1 border border-gray-200">
          <SketchPicker 
           color={value}
          onChange={onChange}
          />
           
        </DdownMenu.Content>
      </DdownMenu.Portal>
    </DdownMenu.Root>
    )
}
// Align button
const AlignButton=()=>{
    const {editor}=useEditorStore();

   const alignments=[{
    label:"Align Left",
    value:"left",
    icon:AlignLeftIcon
   },
{
    label:"Align Center",
    value:"center",
    icon:AlignCenterIcon
},{
    label:'Align Right',
    value:"right",
    icon:AlignRightIcon
},{
    label:'Align Justify',
    value:"justify",
    icon:AlignJustifyIcon
}]

  
    
// link button


    return (
   <DdownMenu.Root>
      <DdownMenu.Trigger asChild>
        <button className="h-3 min-w-7 shrink-0 flex  items-center  rounded-sm hover:bg-neutral">
          <AlignLeftIcon className='size-4'/>
          <ChevronDown className="w-4 h-4" />
        </button>
      </DdownMenu.Trigger>

      <DdownMenu.Portal>
        <DdownMenu.Content className="m-4 min-w-[160px] bg-white shadow-md rounded-lg p-1 border border-gray-200">
         {alignments.map(({label,value,icon:Icon})=>(
            <button key={value}
            onClick={()=>editor?.chain().focus().setTextAlign(value).run()}
            className={`flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 ${editor?.isActive({textAlign:value})&&"bg-neutral-200/80"}`}>
            <Icon/>
            <span className='text-sm'>{label}</span>
            </button>
         ))}
           
        </DdownMenu.Content>
      </DdownMenu.Portal>
    </DdownMenu.Root>
    )
}
// list button
const ListButton=()=>{
    const {editor}=useEditorStore();

   const lists=[{
    label:"Bullet List",
    isActive:()=>editor?.isActive("bulletList"),
    icon:ListIcon,
    onClick:()=>editor?.chain().focus().toggleBulletList().run()
   },{
    label:"Order List",
    isActive:()=>editor?.isActive("orderList"),
    icon:ListOrderedIcon,
    onClick:()=>editor?.chain().focus().toggleOrderedList().run()
   },
  
];

  
    
// link button


    return (
   <DdownMenu.Root>
      <DdownMenu.Trigger asChild>
        <button className="h-3 min-w-7 shrink-0 flex  items-center  rounded-sm hover:bg-neutral">
          <ListIcon className='size-4'/>
          <ChevronDown className="w-4 h-4" />
        </button>
      </DdownMenu.Trigger>

      <DdownMenu.Portal>
        <DdownMenu.Content className="m-4 min-w-[160px] bg-white shadow-md rounded-lg p-1 border border-gray-200">
         {lists.map(({label,icon:Icon,isActive,onClick})=>(
            <button key={label}
            onClick={onClick}
            className={`flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 ${isActive()&&"bg-neutral-200/80"}`}>
            <Icon/>
            <span className='text-sm'>{label}</span>
            </button>
         ))}
           
        </DdownMenu.Content>
      </DdownMenu.Portal>
    </DdownMenu.Root>
    )
}

// this button is for heading button

const HeadingLevelButton=()=>{
    const {editor}=useEditorStore();

    const headings=[
        {label:"Noraml Text",value:0,fontSize:"16px"},
        {label:"Heading 1",value:1,fontSize:"32px"},
        {label:"Heading 2",value:2,fontSize:"24px"},
        {label:"Heading 3" ,value:3,fontSize:"20px"},
        {label:"Heading 4",value:4,fontSize:"18px"},
        {label:"Heading 5",value:5,fontSize:"16px"}
        
    ];
    const getCurrentHeading=()=>{
        for(let l=1; l<=5;l++){
            if(editor?.isActive("heading",{level:l})){
                return `Heading ${l}`
            }
        }
        return "Normal Text"
    }
    return(
        <DdownMenu.Root>
      <DdownMenu.Trigger asChild>
          <button className='h-3 min-w-7 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral'>
              <span className='truncate'>
                  {getCurrentHeading()}
              </span>
              <ChevronDownIcon className='ml-2 size-4 shrink-0'/>
          </button>
          </DdownMenu.Trigger>
        
          <DdownMenu.Portal>
          <DdownMenu.Content className="min-w-[160px] bg-white shadow-md rounded-lg p-1 border border-gray-200">
     {headings.map(({label,value,fontSize})=>(
        <button key={value}
        style={{fontSize}}
        onClick={()=>{
            if(value===0){
                editor?.chain().focus().setParagraph().run();
            }else{
                editor?.chain().focus().toggleHeading({level:value as Level}).run();
            }
        }}
        className={`flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 ${(value===0&&!editor?.isActive("heading"))||editor?.isActive("heading",{level:value})&&"bg-neutral-200/80"}`}>
        {label}
        </button>
     ))}
            </DdownMenu.Content>
            </DdownMenu.Portal>
        </DdownMenu.Root>
    )
}
const FontFamilyButton=()=>{
    const {editor}=useEditorStore();

    const fonts=[{lable:"Arial",value:"Arial"},
        {label:"Times New Roman",value:"Times New Roman"},
        {label:"Courier New",value:"Courier New"},
        {label:"Georgia",value:"Georgia"},
        {label:"Verdana",value:"Verdana"}
    ];
    return(
        <DdownMenu.Root>
      <DdownMenu.Trigger asChild>
    <button className='h-3 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral'>
        <span className='truncate'>
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
        </span>
        <ChevronDownIcon className='ml-2 size-4 shrink-0'/>
    </button>
  </DdownMenu.Trigger>
  <DdownMenu.Portal>
        <DdownMenu.Content className="m-4 min-w-[160px] bg-white shadow-md rounded-lg p-1 border border-gray-200">
{fonts.map(({label,value})=>(
    <button key={label} onClick={()=>{
        editor?.chain().focus().setFontFamily(value).run();
    }}
    className={`flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 ${editor?.getAttributes("textStyle").fontFamily===value &&"bg-neutral-200/80"}`}
        style={{fontFamily:value}}>
            <span className='text-sm'>{value}</span>
        </button>
))}
  </DdownMenu.Content>
  </DdownMenu.Portal>
        </DdownMenu.Root>
    )
}


const ToolBarButton=({
    onClick,
    isActive,
    icon:Icon
}:ToolBarButtonProps)=>{
      return (
        <button onClick={onClick} className={`text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 ${isActive&&"bg-neutral-200/80"}`}><Icon className='size-4'/></button>
      )
}
// fontSize button
const FontSizeButton=()=>{
    const {editor}=useEditorStore();

  const currentFontSize=editor?.getAttributes("textStyle").fontSize ?editor.getAttributes("textStyle").fontSize.replace("px",""):"16"
const [fontSize,setFontSize]=useState(currentFontSize);
const [inputValue,setInputValue]=useState(fontSize); 
const [editing,setIsEditing]=useState(false);

const updateFontSize=(newSize:string)=>{
    const size=parseInt(newSize);
    if(!isNaN(size)&&size>0){
        editor?.chain().focus().setFontSize(`${size}px`).run();
        setFontSize(newSize);
        setInputValue(newSize);
        setIsEditing(false);
    }
};

const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setInputValue(e.target.value)
}
const handleInputBlur=()=>{
    updateFontSize(inputValue);
};

const handleKeyDown=(e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==="Enter"){
        e.preventDefault();
        updateFontSize(inputValue);
        editor?.commands.focus()
    }
};

const increment=()=>{
    const newSize =parseInt(fontSize)+1;
    updateFontSize(newSize.toString())
}
  
const decrement=()=>{
    const newSize =parseInt(fontSize)-1;
    if(newSize>0){
        updateFontSize(newSize.toString())
    }
    
}
// link button


    return (
<div className='flex items-center gap-x-0.5'>
<button onClick={decrement} className='h-7 w-7 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral'>
    <MinusIcon className='size-4'/>

</button>
{editing?(<input 
type='text'
value={inputValue}
onChange={handleInputChange}
onBlur={handleInputBlur}
onKeyDown={handleKeyDown}
className='h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0'/>):(<button
onClick={()=>{
    setIsEditing(true);
     setFontSize(currentFontSize);

}}
className='h-7 w-10 text-sm border border-neutral-400 rounded-sm hover:bg-neutral'>
    {currentFontSize}
</button>)}
<button onClick={increment} className='h-3 w-7 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral'>
    <PlusIcon className='size-4'/>

</button>
</div>
    )
}

const PageBreakButton=()=>{
  const {editor}=useEditorStore();
  // console.log(editor?.commands)
  return(
<button
  onClick={() => editor?.commands.setPageBreak()}
  className="bg-blue-500 text-white px-4 py-2 rounded"
>
  Insert Page Break
</button>

  
  )
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
          .tiptap{
  ul,
  ol{
      padding:0 1rem;
      margin:1.25rem 1rem 1.25rem 0.4rem;}
  ul li{
      list-style-type: disc;
  }
       p{
          margin-top: 0.25em;
          margin-bottom: 0.25em;
      }
  ol li{
      list-style-type:decimal;
      p{
          margin-top: 0.25em;
          margin-bottom: 0.25em;
      }
  }
  ul[data-type="taskList"] {
      list-style: none;
      margin-left: 0;
      padding: 0;
  
      li {
        align-items: flex-start;
        display: flex;
  
        > label {
          flex: 0 0 auto;
          margin-right: 0.5rem;
          user-select: none;
        }
  
        > div {
          flex: 1 1 auto;
        }
      }
  
      input[type="checkbox"] {
        cursor: pointer;
      }
  
      ul[data-type="taskList"] {
        margin: 0;
      }
    }
     /* Heading styles */
h1, 
h2, 
h3, 
h4, 
h5, 
h6 {
  line-height: 1.1;
  margin-top: 2.5rem;
  text-wrap: pretty;
}

h1, 
h2 {
  margin-top: 3.5rem;
  margin-bottom: 1.5rem;
}

h1 { 
  font-size: 1.4rem; 
}

h2 { 
  font-size: 1.2rem; 
}

h3 { 
  font-size: 1.1rem; 
}

h4, 
h5, 
h6 { 
  font-size: 1rem; 
}
/* Table-specific styling */
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
}

.tableWrapper {
  margin: 1.5rem 0;
  overflow-x: auto;
}

&.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
img {
  display: block;
  height: auto;
  margin: 1.5rem 0;
  max-width: 100%;

  &.ProseMirror-selectednode {
    outline: 3px solid var(--purple);
  }
}
a {
 @apply text-blue-600;
  cursor: pointer;

  &:hover {
    @apply underline;
  }
}




}

.page-break {
  height: 20px;
  width: 100%;
  border-top: 1px dashed #ccc;
  margin: 10px 0;
}

.avoid-break-inside {
  break-inside: avoid;
}
.ProseMirror {

  margin: 0 auto !important;
 
}

@media print {
  .pagination-break,  /* Class added by the extension */
  .pagination-break::before, 
  .pagination-break::after {  
    break-before: page; /* Ensures a new page starts */
    visibility: hidden; /* Hides the dashes */
  }
}

table .page-break {
  display: none !important;
}

/* Show it again in print */
@media print {
  table .page-break {
    display: block !important;
  }
}

.slick-slide {
  margin-right: -80px; 
 
 /* reduce or set to 0 for no gap */
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






function Toolbar() {
    const {editor}=useEditorStore();
    // console.log(editor)
    const sections:{label:string; icon:LucideIcon; onClick:()=>void,isActive?:boolean}[][]=[
        [
            {
                label: "Undo",
                icon:Undo2Icon,
                onClick:()=> editor?.chain().focus().undo().run(),
                
            },
            {
             label:"Redo",
             icon:Redo2Icon,
             onClick:()=>editor?.chain().focus().redo().run(),
            },
            {
                label:"Print",
                icon:PrinterIcon,
                onClick:()=>printEditorContent()
            },
            {
                label:"Spell Check",
                icon:SpellCheckIcon,
                onClick:()=>{
                    const crn=editor?.view.dom.getAttribute("spellcheck");
                    editor?.view.dom.setAttribute("spellcheck",crn==="false"?"true":"false")
                }
            }
        ],[
            {
                label:"Bold",
                icon:BoldIcon,
                isActive:editor?.isActive("bold"),
                onClick:()=>editor?.chain().focus().toggleBold().run(),
            },
            {
                label:"Italic",
                icon:ItalicIcon,
                isActive:editor?.isActive("italic"),
                onClick:()=>editor?.chain().focus().toggleItalic().run(),
            },
            {
                label:"Underline",
                icon:UnderlineIcon,
                isActive:editor?.isActive("underline"),
                onClick:()=>editor?.chain().focus().toggleUnderline().run(),
            },
      ],[
        {
            label:"Comments",
            icon:MessageSquarePlus,
            onClick:()=>{editor?.chain().focus().addPendingComment().run()},
            isActive:editor?.isActive("liveblocksCommentMark")
        },
        {
          label:"List Todo",
          icon:ListTodoIcon,
          onClick:()=>editor?.chain().focus().toggleTaskList().run(),
          isActive:editor?.isActive("taskList")
        },
        {
            label:"Remove Formatting",
            icon:RemoveFormatting,
            onClick:()=>editor?.chain().focus().unsetAllMarks().run(),
            
        }
      ]
    ];

  return (
    <div className='bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
        {sections[0].map(item=>(
            <ToolBarButton key={item.label} {...item}/>
        ))}
        <Separator/>

        {sections[1].map(item=>(
            <ToolBarButton key={item.label} {...item}/>
        ))}
    
        <Separator/>
        <FontSizeButton/>
    <FontFamilyButton/>

        <Separator/>
        <HeadingLevelButton/>
        <Separator/>
        {sections[2].map(item=>(
            <ToolBarButton key={item.label} {...item}/>
        ))}
        <Separator/>
        <TextColorButton/>
        <Separator/>
        <HiglightColorButton/>
        <Separator/>
        <LinkButton/>
        
        <ImageButton/>
        
        <AlignButton/>
        <Separator/>
        <ListButton/>
        <PageBreakButton/>
        </div>
  )
}

export default Toolbar;