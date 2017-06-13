import {ComponentViewModel} from './mdc-knockout-base';
import ToolbarTemplate from './templates/toolbar.html';
import {isSubscribable} from './util';

class ToolbarViewModel extends ComponentViewModel {
  extend () {
    if (this.waterfall) {
      this.fixed = true;
    }
    if (this.lastrow) {
      this.fixed = true;
    }
  }

  initialize () {
    if (this.adjust) {
      this.instance.fixedAdjustElement = this.adjust;
    }

    if (this.flexible && isSubscribable(this.ratio)) {
      this.instance.listen('MDCToolbar:change', (evt) => {
        this.ratio(evt.detail.flexibleExpansionRatio);
      });
    }
  }

  get sectionOnlyAttributes_ () {
    return ['start', 'end', 'shrink'];
  }

  createTitleNode_ (text) {
    const span = document.createElement('span');
    span.setAttribute('title', true);
    span.textContent = text;
    return span;
  }

  wrapTextNodes_ (nodes) {
    nodes.forEach(node => {
      [...node.childNodes].forEach(child => {
        if (child.nodeType == 3 && child.textContent.match(/[^\s]/)) {
          const text = child.textContent;
          const titleNode = this.createTitleNode_(text);
          node.replaceChild(titleNode, child);
        }
      });
    });
  }

  listChildren_ (parents) {
    let children = [];
    parents.forEach(parent => {
      if (parent.children.length) {
        children = children.concat([...parent.children]);
      }
    });

    return children;
  }

  wrapAsSections_ (nodes) {
    const result = [];

    nodes.forEach(node => {
      let wrapIt = false;
      if (node.tagName && node.tagName == 'SECTION') {
        result.push(node);
      }
      else {
        const wrapped = document.createElement('SECTION');
        const parent = node.parentNode;
        parent.replaceChild(wrapped, node);
        wrapped.appendChild(node);
        result.push(wrapped);

        [...node.attributes].forEach(attr => {
          if (this.sectionOnlyAttributes_.indexOf(attr.name) !== -1) {
            node.removeAttributeNode(attr);
            wrapped.setAttributeNode(attr);
          }
        });
      }
    });

    return result;
  }

  combineNonDivs_ (nodes) {
    const result = [];

    let group = [];
    nodes.forEach((node, i) => {
      const isDiv = (node.nodeType == 1 && node.tagName == 'DIV');
      const isEmptyText = (node.nodeType == 3 && !node.textContent.match(/[^\s]/));

      if (!isDiv && !isEmptyText) {
        group.push(node);
      }

      if (isDiv || (i == nodes.length - 1)) {
        if (group.length) {
          const div = document.createElement('div');
          group.forEach(element => div.appendChild(element));
          result.push(div);
          group = [];
        }
      }

      if (isDiv) {
        result.push(node);
      }
    });

    return result;
  }

  childrenTransform (children) {
    const divs = this.combineNonDivs_(children);
    this.wrapTextNodes_(divs);

    if (!divs.length) {
      divs.push(document.createElement('div'));
    }

    const divChildren = this.listChildren_(divs);
    const sections = this.wrapAsSections_(divChildren);
    this.wrapTextNodes_(sections);

    return divs;
  }

  get defaultParams () {
    return {
      fixed: false,
      waterfall: false,
      lastrow: false,
      flexible: false,
      adjust: undefined,
      ratio: null
    }
  }

  get unwrapParams () {
    return ['fixed', 'waterfall', 'lastrow', 'flexible', 'adjust'];
  }
}

export {ToolbarTemplate, ToolbarViewModel};
