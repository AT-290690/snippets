import { CodeMirror } from './editor.js';

const editor = CodeMirror(document.getElementById('editor'));

const GIST = 'https://gist.githubusercontent.com/';

const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('g')) {
  fetch(`${GIST}${urlParams.get('g')}`)
    .then(buffer => {
      if (buffer.status >= 400)
        return printErrors('Request failed with status ' + buffer.status);
      return buffer.text();
    })
    .then(gist => {
      editor.setValue(gist);
    })

    .catch(err => printErrors(err));
}
