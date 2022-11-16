// const appendValuesToTemplate = function () {
//   const customAttrs = this.model.get("customAttrs");
//   let textValue = "";
//   for (let a in customAttrs) {
//     textValue = (customAttrs?.[a] !== undefined && customAttrs[a] !== null) ? customAttrs[a] : "";
//     if (this?.$box !== undefined && this?.$box !== null) this.$box.find('div.' + a + '> span').text(textValue);
//   }
// };

// var ModelBase = joint.shapes.html = {};
// joint.shapes.ModelBase = ModelBase;
// ModelBase.Element = joint.shapes.devs.Atomic.extend({
//   defaults: joint.util.defaultsDeep({
//     type: 'html.Element',
//     attrs: {
//       '.body': { stroke: '#ffffff' },
//       entity_title: {
//         text: 'Placeholder',
//         fill: 'white'
//       }
//     }
//   }, joint.shapes.devs.Atomic.prototype.defaults),
//   rowLevel: 0
// });
// ModelBase.ElementView = joint.dia.ElementView.extend({
//   htmlTemplate: `<div class="html-element">
//     <div class="header">
//         <div class="entity_title">
//             <span></span>
//         </div>
//     </div>
//     <div class="properties"></div>
//   </div>`,
//   appendValuesToTemplate: appendValuesToTemplate
// });

// export function redrawGraph(graph, elems) {
//   graph.clear();
//   let X = 0, Y = 0;
//   const Xoff = 100, Yoff = 100;

//   var model = new joint.shapes.ModelBase.Element({
//     attrs: {
//       entity_title: {
//         text: 'Placeholder',
//         fill: 'white'
//       }
//     },
//     position: { x: 0, y: 0 }
//   });
//   model.resize(400, 30);

//   for (const elem of elems) {
//     X += Xoff; Y += Yoff;
//     var _model = model.clone();
//     _model.translate(X, Y);
//     _model.attr('entity_title/text', elem.title);
//     _model.addTo(graph);
//   }
// }
export function redrawGraph(paper, graph, elems) {
  graph.clear();
  let X = 20, Y = 20;
  const Xoff = 480, Yoff = 0;

  const C = {
    Container: joint.shapes.container.Parent,
    Child: joint.shapes.container.Child,
    ObjectChild: joint.shapes.container.ObjectChild,
    Link: joint.shapes.container.Link
  }

  const links = [];
  for (const elem of elems) {
    if(elem.from) {
      links.push(elem);
      continue;
    }
    const o = {
      z: 1,
      attrs: { label: { text: elem.title } }
    };
    if(elem.id) o.id = elem.id;
    const container = new C.Container(o);
    elem.id = container.id;
    container.translate(X, Y);
    // container.addTo(graph);

    graph.addCells([container]);


    if (elem.children?.length) {
      // ({ children, Y } = addChildren(C, graph, elem, container, X, Y));
      addChildren(C, graph, elem, container, X, Y);
    }

    // graph.addCells(children);
    // graph.addCells([container, ...children]);
    // container.toggle(false);
    X += Xoff; Y += Yoff;
  }
  for(const link of links) {
    const _link = new C.Link({
      source: {id: link.from},
      target: {id: link.to},
      z: 99
    });
    graph.addCells([_link]);
    _link.reparent();
  }

  paper.on('element:button:pointerdown', function (elementView) {
    var element = elementView.model;
    element.toggle();
    fitAncestors(element);
  });

  paper.on('element:pointermove', function (elementView) {
    var element = elementView.model;
    fitAncestors(element);
  });

  function fitAncestors(element) {
    element.getAncestors().forEach(function (container) {
      container.fitChildren();
    });
  }
  return elems;
}

function levelOffset(level) {
  return 10 * (level - 1);
}

const childYoff = 30;
function addChildren(C, graph, parentData, parentEl, X, Y, level = 1) {
  level++;
  const children = [];
  for (const c of parentData.children) {
    Y += childYoff
    let child;
    if (c.children?.length) {
      const o = {
        z: level,
        position: { x: X, y: Y },
        attrs: {
          label: { text: c.title, refX: levelOffset(level) },
          typeText: { text: c.type }
        }
      };
      if(c.id) o.id = c.id;
      child = new C.ObjectChild(o);
      graph.addCells([child]);
      parentEl.embed(child);
      ({ Y } = addChildren(C, graph, c, child, X, Y, level));
    } else {
      const o = {
        z: level,
        position: { x: X, y: Y },
        attrs: {
          label: { text: c.title, refX: levelOffset(level) },
          typeText: { text: c.type }
        }
      };
      if(c.id) o.id = c.id;
      child = new C.Child(o);
      children.push(child);
    }
    c.id = child.id;
  }
  level--;
  graph.addCells(children);
  parentEl.embed(children);
  parentEl.toggle(false);
  return { children, Y };
}


// export function redrawGraph(graph, elems) {
//   graph.clear();
//   let X = 0, Y = 0;
//   const Xoff = 100, Yoff = 100;

//   var rect = new joint.shapes.standard.Rectangle();
//   rect.position(0, 0);
//   rect.resize(400, 30);
//   rect.attr({
//     body: {
//       fill: '#0099ee',
//       stroke: '#000000'
//     },
//     label: {
//       text: 'Placeholder',
//       fill: 'white'
//     }
//   });
//   // rect.addTo(graph);

//   for (const elem of elems) {
//     X += Xoff; Y += Yoff;
//     var _rect = rect.clone();
//     _rect.translate(X, Y);
//     _rect.attr('label/text', elem.title);
//     _rect.addTo(graph);
//   }
// }
// var link = new joint.shapes.standard.Link();
// link.source(rect);
// link.target(rect2);
// link.addTo(graph);