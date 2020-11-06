import React, { Fragment, useEffect, useState } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/anyword-hint';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/foldgutter.css';
import { Container, Section, Bar } from 'react-simple-resizer';
import CodeBox from '../components/code_box';
import Navbar from '../components/navbar';
import useLocalStorage from '../components/use_local_storage';

const barStyle = {
  background: '#191D20',
  cursor: 'col-resize',
};

const sectionStyle = {
  background: 'transparent',
};

const CodeArea = () => {
  const [view, setView] = useLocalStorage('view', 'horizantal');
  const [html, setHTML] = useLocalStorage('html', '');
  const [css, setCSS] = useLocalStorage('css', '');
  const [js, setJS] = useLocalStorage('js', '');
  const [code, setCode] = useState('');

  let draggingNow = false;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCode(`<html><head><style>${css}</style></head><body>${html}<script>${js}</script></body></html>`);
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const handleSave = () => {
    const htmlPrefixedKey = 'webcoder-html';
    const cssPrefixedKey = 'webcoder-css';
    const jsPrefixedKey = 'webcoder-js';
    localStorage.setItem(htmlPrefixedKey, JSON.stringify(html));
    localStorage.setItem(cssPrefixedKey, JSON.stringify(css));
    localStorage.setItem(jsPrefixedKey, JSON.stringify(js));
  };

  const handleChangeView = () => {
    const viewPrefixedKey = 'webcoder-view';
    localStorage.setItem(
      viewPrefixedKey,
      view === 'horizantal' ? JSON.stringify('vertical') : JSON.stringify('horizantal')
    );
    setView((v) => (v === 'horizantal' ? 'vertical' : 'horizantal'));
  };

  const handleDownload = (l) => {
    const element = document.createElement('a');
    const file = new Blob(l === 'xml' ? [html] : l === 'css' ? [css] : l === 'javascript' ? [js] : 'NULL', {
      type: 'text/plain;charset=utf-8',
    });
    element.href = URL.createObjectURL(file);
    element.download =
      l === 'xml' ? 'index.html' : l === 'css' ? 'style.css' : l === 'javascript' ? 'main.js' : 'error.txt';
    document.body.appendChild(element);
    element.click();
    element.parentNode.removeChild(element);
  };

  return (
    <Fragment>
      <div style={{ height: '100vh' }}>
        <Navbar handleSave={handleSave} handleChangeView={handleChangeView} />
        <Container style={{ height: '94vh' }} vertical={view === 'horizantal' ? true : false}>
          <Section minSize={50} style={{ height: '100%' }}>
            <Container style={{ width: '100vw', height: '100%' }} vertical={view === 'horizantal' ? false : true}>
              <CodeBox handleChange={setHTML} value={html} language='xml' handleDownload={handleDownload} />
              <Bar size={12} style={barStyle} />
              <CodeBox handleChange={setCSS} value={css} language='css' handleDownload={handleDownload} />
              <Bar size={12} style={barStyle} />
              <CodeBox handleChange={setJS} value={js} language='javascript' handleDownload={handleDownload} />
            </Container>
          </Section>
          <Bar
            size={15}
            style={barStyle}
            onStatusChanged={() => {
              draggingNow = !draggingNow;
              let iframeObj = document.querySelector('iframe');
              if (draggingNow) {
                if (iframeObj) iframeObj.style.zIndex = -1;
              } else {
                if (iframeObj) {
                  iframeObj.style.zIndex = 1;
                }
              }
            }}
          />
          <Section style={sectionStyle}>
            {!html && !css && !js ? (
              <div className='empty-section'>Start Coding!</div>
            ) : (
              <iframe
                sandbox='allow-scripts'
                allowtransparency='true'
                allowpaymentrequest='true'
                style={{ height: '100%', width: '100%', position: 'relative' }}
                srcDoc={code}
                title='Your code'></iframe>
            )}
          </Section>
        </Container>
      </div>
    </Fragment>
  );
};

export default CodeArea;
