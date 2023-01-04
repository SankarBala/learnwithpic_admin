import host from "src/config";

const editorConfig = {
  editorUrl: "http://cdn.ckeditor.com/4.20.1/full/ckeditor.js",
  width: "100%",
  toolbarGroups: [
    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'] },
    { name: 'colors' },
    '/',
    { name: 'clipboard', groups: ['clipboard', 'undo'] },
    { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
    { name: 'video' },
    { name: 'links' },
    { name: 'insert' },
    { name: 'forms', groups: ['button', 'radio', 'select'] },
    '/',
    { name: 'styles' },
    { name: 'tools' },
    { name: 'others' },
    { name: 'document', groups: ['mode', 'document', 'doctools'] },
  ],

  removeButtons: 'print, pdf, preview',
  removePlugins: 'about, forms, print, preview, newpage, save, scayt, exportpdf,find, pastefromdocs, pastefromword, selectall, language',
  format_tags: 'p;h1;h2;h3;h4;h5;h6;pre',
  removeDialogTabs: '',
  filebrowserBrowseUrl: `${host}/file-manager/ckeditor/`,
  // filebrowserBrowseUrl: "http://localhost:8000/browse.html",
  filebrowserBrowseUrl: "/file-picker",
  filebrowserUploadUrl: `${host}/file-manager/ckeditor/upload`,
  // filebrowserUploadMethod : 'form',
  filebrowserImageBrowseUrl: "/file-picker",
  filebrowserImageUploadUrl: `${host}/api/file-manager/ckeditor/upload`,
  filebrowserWindowWidth: '100%',
  filebrowserWindowHeight: '100%',
  // image2_alignClasses: ['image-left', 'image-center', 'image-right'],
  // image2_captionedClass: 'image-captioned',
  // image2_altRequired: true,
  // extraPlugins: ['video'],
  colorButton_colors : 'CF5D4E,454545,FFF,DDD,CCEAEE,66AB16',

}

export default editorConfig;

// 'Underline, Subscript,Superscript'
// removeDialogTabs: 'image:advanced;link:advanced'



// editorUrl: "http://cdn.ckeditor.com/4.20.1/full/ckeditor.js",
//   // editorUrl: `${host}/vendor/ckeditor-full/ckeditor.js`,
//   // editorUrl: CKEditorUrl,
//   width: "100%",
//     toolbarGroups: [
//       { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
//       {
//         name: "paragraph",
//         groups: ["list", "indent", "blocks", "align", "bidi"]
//       },
//       { name: "colors" },
//       "/",
//       { name: "clipboard", groups: ["clipboard", "undo"] },
//       { name: "editing", groups: ["find", "selection", "spellchecker"] },
//       { name: "video" },
//       { name: "links" },
//       { name: "insert" },
//       { name: "forms", groups: ["button", "radio", "select"] },
//       "/",
//       { name: "styles" },
//       { name: "tools" },
//       { name: "others" },
//       { name: "document", groups: ["mode", "document", "doctools"] }
//     ],

//       removeButtons: "print, pdf, preview",
//         removePlugins:
// "about, forms, print, preview, newpage, save, scayt, exportpdf,find, pastefromdocs, pastefromword, selectall, language",
//   format_tags: "p;h1;h2;h3;h4;h5;h6;pre",
//     removeDialogTabs: "",
//       // filebrowserBrowseUrl: `${host}/file-manager/ckeditor/`,
//       // filebrowserUploadUrl: `${host}/file-manager/ckeditor/upload`,
//       // filebrowserUploadMethod : 'form',
//       // filebrowserImageBrowseUrl: `${host}/file-manager/ckeditor`,
//       // filebrowserImageUploadUrl: `${host}/file-manager/ckeditor/upload`,
//       filebrowserWindowWidth: "100%",
//         filebrowserWindowHeight: "100%"
// // image2_alignClasses: ['image-left', 'image-center', 'image-right'],
// // image2_captionedClass: 'image-captioned',
// // image2_altRequired: true,
// // extraPlugins: ['video'],
// // colorButton_colors : 'CF5D4E,454545,FFF,DDD,CCEAEE,66AB16',



// extraPlugins: "uploadimage",
//   filebrowserBrowseUrl: "/browse.html",
//     editorUrl: "http://cdn.ckeditor.com/4.20.1/full/ckeditor.js"
