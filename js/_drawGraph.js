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

  const linkColors = {}
  const links = [];
  for (const elem of elems) {
    if (elem.from) {
      links.push(elem);
      continue;
    }
    const o = {
      z: 1,
      attrs: { label: { text: elem.title } }
    };
    if (elem.id) o.id = elem.id;
    if (elem.color) {
      o.attrs.header = { fill: elem.color };
      linkColors[elem.id] = elem.color;
    }

    const container = new C.Container(o);
    elem.id = container.id;
    container.translate(X, Y);
    // container.addTo(graph);

    graph.addCells([container]);


    if (elem.children?.length) {
      addChildren(C, graph, elem, container, X, Y);
    }

    X += Xoff; Y += Yoff;
  }
  for (const link of links) {
    const o = {
      source: { id: link.from },
      target: { id: link.to },
      z: 99
    };
    const targetId = link.to.split(`.`)[0];
    if (linkColors[targetId])
      o.attrs = {
        line: {
          stroke: linkColors[targetId]
        }
      };
    try {
      const _link = new C.Link(o);
      graph.addCells([_link]);
      _link.reparent();
    } catch (err) {
      console.log(`Invalid link ${JSON.stringify(link)}`)
    }
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
      if (c.id) o.id = c.id;
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
      if (c.id) o.id = c.id;
      child = new C.Child(o);
      children.push(child);
    }
    c.id = child.id;
  }
  level--;
  graph.addCells(children);
  parentEl.embed(children);
  parentEl.toggle(false, true)
  return { children, Y };
}



// function buildModelHtml(children, isRoot) {
//   let html = ``;
//   if (isRoot) html += `<ul class="treeview"></ul>`;

//   for (const c of children) {
//     html += `<li>`;
//     if (c.children?.length) {
//       html += `<span class="caret">${c.title}</span>`;
//       html += `<ul class="nested">`;
//       html += buildModelHtml(c.children);
//       html += `</ul>`;
//     } else {
//       html += c.title;
//     }
//     html += `</li>`
//   }
//   if (isRoot) html += `</ul>`
//   return html;
// }