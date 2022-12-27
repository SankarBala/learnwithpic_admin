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
	filebrowserBrowseUrl: `${host}/file-manager/ckeditor`,
	filebrowserUploadUrl: `${host}/file-manager/upload`,
	// filebrowserUploadMethod : 'form',
	filebrowserImageBrowseUrl: `${host}/file-manager/ckeditor?type=Images`,
	filebrowserImageUploadUrl: `${host}/file-manager/upload`,
	// filebrowserWindowWidth: '640',
	// filebrowserWindowHeight: '480',
	// image2_alignClasses: ['image-left', 'image-center', 'image-right'],
	// image2_captionedClass: 'image-captioned',
	// image2_altRequired: true,
	// extraPlugins: 'uploadimage',
	// colorButton_colors : 'CF5D4E,454545,FFF,DDD,CCEAEE,66AB16',

}

export default editorConfig;

// 'Underline, Subscript,Superscript'
// removeDialogTabs: 'image:advanced;link:advanced'