import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'
import ImageResize from "tiptap-extension-resize-image";
import { useEditorStore } from "../store/useEditor";
import Underline from "@tiptap/extension-underline";
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from "@tiptap/extension-text-style";
import {Color} from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { FontSizeExtension } from '../extensions/font-size';
import {PageBreak} from "../extensions/page-break";
// @ts-ignore
import {Pagination} from 'tiptap-pagination-breaks';
import Ruler from "./Ruler";
import { useParams } from "react-router-dom";





function Editor() {
const {id}=useParams();

const {setEditor}=useEditorStore();

const editor=useEditor({
    onCreate({editor}){
        setEditor(editor)
    },
    onUpdate({editor}){
        localStorage.setItem("editor"+id,editor.getHTML())
        setEditor(editor)
    },
    onDestroy(){
        setEditor(null)
    },
    onSelectionUpdate({editor}){
        setEditor(editor)
    },
    onTransaction({editor}){
        setEditor(editor)
    },
    onFocus({editor}){
        
        setEditor(editor)
    },
    onBlur({editor}){
        setEditor(editor)
    },
    onContentError({editor}){
        setEditor(editor)  
    },
    editorProps:{
        attributes:{
            style:"padding-left:56px; padding-right:56px;  ",
            class:"focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text"
        }
    },
    extensions:[StarterKit,TaskItem.configure({
        nested:true
    }),TaskList,
Table.configure({
    resizable:true,
    HTMLAttributes: {
        class: 'avoid-break-inside'
      }
}),TableCell,
TableRow,TableHeader
,Image,
Dropcursor,
ImageResize,
Underline,
FontFamily,
TextStyle,
Highlight.configure({
    multicolor:true
}),
Color,
Link.configure({
    openOnClick:false,
    autolink:true,
    defaultProtocol:"https"
}),
TextAlign.configure({
    types:["heading","paragraph"]
}),
FontSizeExtension,
PageBreak,
Pagination.configure({
    pageHeight: 1056, // default height of the page
    pageWidth: 816,   // default width of the page
    pageMargin: 96,   // default margin of the page
  })
],
content:  `
<p>Try to drag around the image. While you drag, the editor should show a decoration under your cursor. The so called dropcursor.</p>

`,
})



  return (
     <div className="size-full overflow-x-auto bg-[F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible ">
      
        <Ruler />
        <div  className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
       
        <EditorContent editor={editor} />
        </div>
    </div>
  )
}

export default Editor;