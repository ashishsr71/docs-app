import { Node, mergeAttributes } from "@tiptap/core";
import "@tiptap/core"
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
      pageBreak: {
        setPageBreak: () => ReturnType;
      };
    }
  }
  
  

  export const PageBreak = Node.create({
    name: "pageBreak",
    group: "block",
    selectable: true,
    inline: false,
    atom: true,
  
    parseHTML() {
      return [{ tag: "hr", "data-page-break": "true" }];
    },
  
    renderHTML({ HTMLAttributes }) {
      return [
        "hr",
        mergeAttributes(HTMLAttributes, {
          "data-page-break": "true",
          style: "page-break-before: always; border: none; height: 2px; background: #ccc;",
        }),
      ];
    },
  
    addCommands() {
      return {
        setPageBreak:
          () =>
          ({ commands }) => {
            return commands.insertContent({
              type: "pageBreak",
            });
          },
      };
    },
  });