Polymer({

  is: 'zeppelin-viewer',

  properties: {

    // Websocket Url for zeppelin
    WS: {
      type: String,
      value: '/ws-zeppelin'
    },
    editor: {
      type: Boolean,
      value: true,
      notify: true
    },
    noteBook: {
      type: Object
    },
    noteBookName: {
      type: String
    },
    noteBookId: {
      type: String,
      value: false
        // value: '2C6C1TYPP'
    },
    zeppelinUrl: {
      type: String,
      value: '/zeppelin'
    },
    viewNotebook: {
      type: Boolean,
      value: false
    },
    viewMode: {
      type: Boolean,
      value: true
    }
  },

  editorView: function() {
    // this.set('editor', true);
  },

  runAllParas: function() {
    if (this.noteBook) {
      this.noteBook.runAllParas();
    }
  },

  attached: function() {
    this.async(function() {
      this.noteBook = this.$$('zeppelin-notebook');
    }.bind(this));
  },

  exportNotebook: function() {
    if (this.noteBook) {
      this.noteBook.exportParagraph();
    }
  },

  editTitle: function() {
    this._noteBookName = this.noteBookName;
    this.$$('.name-wrap').classList.add('edit-mode');
  },

  saveName: function() {
    this.set('noteBookName', this._noteBookName);
    this.$$('.name-wrap').classList.remove('edit-mode');
    this.noteBook.renameNoteBook();
  },

  cancelRename: function() {
    this.set('_noteBookName', this.noteBookName);
    this.$$('.name-wrap').classList.remove('edit-mode');
  }
});
