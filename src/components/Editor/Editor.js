import React, { createRef } from 'react';
import style from './style.module.css';
import { Controls } from '../Controls';

export function Editor() {
  const editorRef = createRef();

  document.execCommand("defaultParagraphSeparator", false, "br");
  document.execCommand('styleWithCSS', false, true)


  const handleClick = () => {
    const editorData = editorRef.current.innerHTML;
    const source = [];
    console.log(editorData);
    
    const firstNonStyleData = editorData.match(/^\w+/gm);
    const styleEntriesData = editorData.match(/<span (.*?)<\/span>/gm);
    const endNonStyleData = editorData.match(/\w+$/gm);
    
    function pushDefaultObject(text) {
      source.push({
        text,
        fontSize: 'medium',
        color: 'black',
        backgroundColor: 'transparent',
      })
    }
    if (firstNonStyleData) {
      pushDefaultObject(firstNonStyleData[0])
    }

    if (styleEntriesData) {
      for (let i = 0; i < styleEntriesData.length; i++) {
        const currentData = styleEntriesData[i];
        const text = currentData.match(/>(.*?)<\//gm)[0].slice(1, -2);
        const dataStyles = currentData.match(/"(.*?)"/gm)[0];
        const stylesArray = dataStyles.match(/(?=\S*['-])?([a-zA-Z'-]+)/gm)
        const obj = {
          text: text,
          fontSize: 'medium',
          color: 'black',
          backgroundColor: 'transparent',
        };

        for (let i = 0; i < stylesArray.length; i += 2) {
          obj[stylesArray[i]] = stylesArray[i+1];
        }
        source.push(obj)
      }
    }

    if (endNonStyleData && editorData.indexOf(firstNonStyleData) !== editorData.indexOf(endNonStyleData)) {
      pushDefaultObject(endNonStyleData[0])
    }
    console.log(source)
  }

  return(
    <div className={style.editorWrapper}>
      <div className={style.editorContainer}>
        <div
          className={style.editor}
          contentEditable="true"
          ref={editorRef}
          designmode="true"
          suppressContentEditableWarning={true}
        >
          Something
        </div>
        <Controls submit={handleClick}/>
      </div>
    </div>
  );
}