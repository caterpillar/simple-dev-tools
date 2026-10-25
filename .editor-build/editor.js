import { Compartment, EditorSelection, EditorState, Transaction } from '@codemirror/state';
import { EditorView, drawSelection, keymap, lineNumbers, placeholder } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab, isolateHistory, redo, redoDepth, undo, undoDepth } from '@codemirror/commands';
import { HighlightStyle, forceParsing, foldAll, foldGutter, foldKeymap, foldedRanges, indentUnit, syntaxHighlighting, unfoldAll } from '@codemirror/language';
import { json } from '@codemirror/lang-json';
import { tags } from '@lezer/highlight';

const colors = HighlightStyle.define([
  { tag: tags.propertyName, color: 'var(--key)' },
  { tag: tags.string, color: 'var(--str)' },
  { tag: tags.number, color: 'var(--num)' },
  { tag: [tags.bool, tags.null], color: 'var(--bool)' },
  { tag: [tags.punctuation, tags.bracket], color: 'var(--punc)' },
  { tag: tags.invalid, color: 'var(--err)' }
]);

function theme(dark) {
  return EditorView.theme({
    '&': { height: '100%', fontSize: 'var(--ed-font-size)', backgroundColor: 'var(--bg)', color: 'var(--text)' },
    '&.cm-focused': { outline: 'none' },
    '.cm-scroller': { overflow: 'auto', fontFamily: 'var(--mono)', lineHeight: 'var(--ed-line-height)' },
    '.cm-content': { padding: 'var(--ed-pad-y) 0', caretColor: 'var(--accent)' },
    '.cm-line': { padding: '0 var(--ed-pad-x)', overflowWrap: 'anywhere' },
    '.cm-gutters': { color: 'var(--ln)', backgroundColor: 'var(--bg)', borderRight: '1px solid var(--border)' },
    '.cm-lineNumbers .cm-gutterElement': { padding: '0 5px 0 8px' },
    '.cm-foldGutter .cm-gutterElement': { padding: '0 3px', cursor: 'pointer', color: 'var(--muted)' },
    '.cm-placeholder': { color: 'var(--placeholder)', whiteSpace: 'pre-wrap' },
    '.cm-cursor, .cm-dropCursor': { borderLeftColor: 'var(--accent)' },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': { backgroundColor: 'var(--selection)' },
    '.cm-foldPlaceholder': { padding: '0 4px', border: '1px solid var(--border)', borderRadius: '4px', backgroundColor: 'var(--panel-2)', color: 'var(--muted)', cursor: 'pointer' }
  }, { dark });
}

export function createEditor(parent, { onChange, onStateChange }) {
  const themeSlot = new Compartment();
  const localeSlot = new Compartment();
  const placeholderSlot = new Compartment();
  const indentSlot = new Compartment();
  const view = new EditorView({
    parent,
    state: EditorState.create({
      extensions: [
        json(), history({ newGroupDelay: 500 }), lineNumbers(), drawSelection(),
        foldGutter(), EditorView.lineWrapping,
        keymap.of([...historyKeymap, ...foldKeymap, indentWithTab, ...defaultKeymap]),
        syntaxHighlighting(colors),
        themeSlot.of(theme(true)),
        localeSlot.of(EditorState.phrases.of({})),
        placeholderSlot.of(placeholder('')),
        indentSlot.of(indentUnit.of('  ')),
        EditorView.updateListener.of(update => {
          if (update.docChanged) onChange();
          if (update.transactions.length) onStateChange();
        })
      ]
    })
  });

  return {
    view,
    getText() { return view.state.doc.toString(); },
    replaceDocument(text, { scrollToTop = false } = {}) {
      const doc = view.state.toText(text);
      if (!doc.eq(view.state.doc)) {
        const old = view.state.selection.main;
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: doc },
          // CRLF 由 CodeMirror 规范化后更短，选区必须按实际文档长度限制。
          selection: EditorSelection.single(Math.min(old.anchor, doc.length), Math.min(old.head, doc.length)),
          annotations: [Transaction.userEvent.of('input.tool'), isolateHistory.of('full')]
        });
      }
      if (scrollToTop) view.scrollDOM.scrollTop = 0;
    },
    selectError(pos) {
      const from = Math.max(0, Math.min(pos, view.state.doc.length));
      const line = view.state.doc.lineAt(from);
      const to = Math.max(from, Math.min(view.state.doc.length, from < line.to ? line.to : from + 1));
      view.dispatch({ selection: { anchor: from, head: to }, effects: EditorView.scrollIntoView(from, { y: 'center' }) });
      view.focus();
    },
    focus() { view.focus(); },
    undo() { return undo(view); },
    redo() { return redo(view); },
    undoDepth() { return undoDepth(view.state); },
    redoDepth() { return redoDepth(view.state); },
    hasFolds() { return foldedRanges(view.state).size > 0; },
    hasContent() { return view.state.doc.length > 0; },
    expandAll() { return unfoldAll(view); },
    collapseAll() {
      // 发布完成的语法树，否则首次操作仍可能用到旧的部分解析结果。
      forceParsing(view, view.state.doc.length, 1000);
      return foldAll(view);
    },
    setTheme(dark) { view.dispatch({ effects: themeSlot.reconfigure(theme(dark)) }); },
    setLocale(text, phrases) {
      view.dispatch({ effects: [localeSlot.reconfigure(EditorState.phrases.of(phrases)), placeholderSlot.reconfigure(placeholder(text))] });
    },
    setIndent(unit) { view.dispatch({ effects: indentSlot.reconfigure(indentUnit.of(unit)) }); }
  };
}

export { EditorView };
