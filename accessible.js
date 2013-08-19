window.onload=function(){
var myTextArea = document.getElementById("editor");
var clonedTextArea = myTextArea.cloneNode();
myTextArea.parentNode.appendChild(clonedTextArea);
var myScreenreader = document.getElementById("editor-screenreader");

var myContentEditable = document.getElementById("content-editable");
var button = document.getElementById("toggle-textarea-visibility");

console.log("Button")
button.onclick = toggleTextareaDisplay;
/*
myTextArea.addEventListener("keydown", function(e) {

    console.log("HERE");
    myTextArea.selectionStart = (myTextArea.selectionStart + 1) || 0;
    myTextArea.selectionEnd = (myTextArea.selectionEnd + 1) || 0;
    e.stopPropagation();
    //e.preventDefault();

}, false);*/
/*
myScreenreader.onkeydown = function(e) {

    console.log("HERE");

    myScreenreader.setSelectionRange((myScreenreader.selectionStart + 1) || 0, (myScreenreader.selectionStart + 1) || 0);

    //myScreenreader.selectionStart = (myScreenreader.selectionStart + 1) || 0;
    //myScreenreader.selectionEnd = myScreenreader.selectionStart;
    e.preventDefault();
    e.stopPropagation();
    //e.stopPropagation();
    //e.preventDefault();
    //myScreenreader.value = "Hello " + Math.random();
    //myScreenreader
    //myScreenreader.setSelectionRange(
    //    myScreenreader.selectionStart + 1,
    //    myScreenreader.selectionEnd + 1);

    //return false;
};
*/

var editor = window.editor = CodeMirror.fromTextArea(myTextArea, {
        lineNumbers: true,
        matchBrackets: true,
        continueComments: "Enter",
        extraKeys: {"Ctrl-Q": "toggleComment"}
});

var editor2 = window.editor2 = CodeMirrorOriginal.fromTextArea(clonedTextArea, {
        lineNumbers: true,
        matchBrackets: true,
        continueComments: "Enter",
        extraKeys: {"Ctrl-Q": "toggleComment"}
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
   // console.log(start, end, selectionStart, selectionEnd);

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
    console.log(editor, editor.display);

    var input = editor.display.input;//document.getElementById("fake");
    var oldVal = input.value;

    input.value = editor.display.prevInput = editor.getValue();
    //input.focus();
    console.log(context.selectionStart);




    input.setSelectionRange(
        context.selectionStart,
        context.selectionEnd
    );
    //input.value = oldVal;
    return;
    //range.setEnd(pres[0].childNodes[0], context.selectionEnd);

    //editor.display.input.value = "Brian " + Math.random();// context.text;
    //myScreenreader.value = context.text;
    //myScreenreader.selectionStart = 1;
    //myScreenreader.selectionEnd = 2;




    myContentEditable.textContent = context.text;
    var textNode = myContentEditable.childNodes[0];

    var range = document.createRange();
    range.setStart(textNode, context.selectionStart);
    range.setEnd(textNode, context.selectionEnd);


    var s = window.getSelection();
    if(s.rangeCount > 1) {
     for(var i = 1; i < s.rangeCount; i++) {
      s.removeRange(s.getRangeAt(i));
     }
    }

    s.addRange(range);

//    var pres = document.querySelectorAll(".CodeMirror-code pre");
//    pres[0].setAttribute("contentEditable", true);


    //var range = window.getSelection().getRangeAt(0);
    //console.log(range, textNode);
    //if (!range) {return;}
    var range = document.createRange();
    //range.setStart(pres[0].childNodes[0], context.selectionStart);
    //range.setEnd(pres[0].childNodes[0], context.selectionEnd);
    range.setStart(textNode, context.selectionStart);
    range.setEnd(textNode, context.selectionEnd);


    var s = window.getSelection();
    if(s.rangeCount > 1) {
     for(var i = 1; i < s.rangeCount; i++) {
      s.removeRange(s.getRangeAt(i));
     }
    }

    s.addRange(range);
   // var sel = window.getSelection();
   // sel.removeAllRanges();
    //sel.addRange(range);
return;
    //myContentEditable.setSelectionRange(context.selectionStart, context.selectionEnd);
    myScreenreader.value = context.text;
    myScreenreader.focus();
    myScreenreader.setSelectionRange(context.selectionStart, context.selectionEnd);
    //myScreenreader.blur();
    //editor.focus();

}


editor.on("beforeSelectionChange", function(editor) {
    return;
    //console.log(editor, editor.display.input, editor.display.input.value);
    drawContext(editor);
});

drawContext(editor);


}

var textareaVisible = false;
function toggleTextareaDisplay() {

    if (!editor.display.input.getAttribute("backup-style")) {
        editor.display.input.setAttribute("backup-style", editor.display.input.getAttribute("style"));
        editor.display.input.parentNode.setAttribute("backup-style", editor.display.input.parentNode.getAttribute("style"));
    }

console.log("click")
    if (textareaVisible) {
        editor.display.input.setAttribute("style", editor.display.input.getAttribute("backup-style"));
        editor.display.input.parentNode.setAttribute("style", editor.display.input.parentNode.getAttribute("backup-style"));
    }
    else {
        editor.display.input.setAttribute("style", "height: 200px;");
        editor.display.input.parentNode.setAttribute("style", "");
    }

    textareaVisible = !textareaVisible;
}