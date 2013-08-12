window.onload=function(){
var myTextArea = document.getElementById("editor");
var myScreenreader = document.getElementById("editor-screenreader");

var myContentEditable = document.getElementById("content-editable");

var editor = CodeMirror.fromTextArea(myTextArea, {
});

function getContext(editor) {
    var start = editor.getCursor("start");
    var end = editor.getCursor("end");

    var contextStart = {
        line: Math.max(0, start.line - 1),
        ch: 0
    };
    var contextEnd = {
        line: Math.max(0, end.line + 1),
        ch: 0
    };

    var selectionStart = start.ch;
    var selectionEnd = end.ch;
    console.log(start, end, selectionStart, selectionEnd);

    return {
        text: editor.getRange(contextStart, contextEnd),
        start: start,
        end: end,
        selectionStart: start.ch,
        selectionEnd: end.ch
    };

}

function drawContext(editor) {
    return;
    var context = getContext(editor);
    //editor.display.input.value = "Brian " + Math.random();// context.text;
    //myScreenreader.value = context.text;
    //myScreenreader.selectionStart = 1;
    //myScreenreader.selectionEnd = 2;



    myContentEditable.textContent = context.text;
    var textNode = myContentEditable.childNodes[0];
    var range = document.createRange();
    range.setStart(textNode, context.selectionStart);
    range.setEnd(textNode, context.selectionEnd);
    var sel = window.getSelection();
    //sel.removeAllRanges();
    sel.addRange(range);

    //myContentEditable.setSelectionRange(context.selectionStart, context.selectionEnd);
    //myScreenreader.setSelectionRange(context.selectionStart, context.selectionEnd);
    //myScreenreader.blur();
    //editor.focus();

}

editor.on("cursorActivity", function(editor) {
    console.log(editor, editor.display.input, editor.display.input.value);
    drawContext(editor);
});

drawContext(editor);

}