import React, { Fragment } from 'react';
import { Section } from 'react-simple-resizer';
import { Controlled as ControlledEditor } from 'react-codemirror2';

const sectionStyle = {
  background: '#eeeeee',
};

const CodeBox = ({ handleChange, value, language, handleDownload }) => {
  return (
    <Fragment>
      <Section minSize={window.innerWidth < 500 ? 0 : 50} style={sectionStyle}>
        <div className='codebox-header'>
          <span>{language === 'xml' ? 'html' : language}</span>
          <button className='download' onClick={() => handleDownload(language)}>
            <i className='fas fa-long-arrow-alt-down'></i>
          </button>
        </div>
        <ControlledEditor
          onBeforeChange={(editor, data, value) => handleChange(value)}
          value={value}
          className='codemirror-wrapper'
          options={{
            lineWrapping: true,
            smartIndent: true,
            lineNumbers: true,
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
            autoCloseTags: true,
            keyMap: 'sublime',
            matchBrackets: true,
            autoCloseBrackets: true,
            extraKeys: {
              'Ctrl-Space': 'autocomplete',
            },
            lint: true,
            theme: 'material',
            mode: language,
            scrollbarStyle: 'null',
          }}
        />
      </Section>
    </Fragment>
  );
};

export default CodeBox;
