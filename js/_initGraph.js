import { setShapes } from "/js/_shapes.js";

export function initGraph(graphEl) {
  var dragStartPosition = { x: 0, y: 0 };
  var namespace = joint.shapes;

  var graph = new joint.dia.Graph({}, { cellNamespace: namespace });

  var paper = new joint.dia.Paper({
    el: graphEl,
    model: graph,
    width: "72vw",
    height: "95vh",
    async: true,
    cellViewNamespace: namespace,
    background: { color: '#F3F7F6' },
    interactive: { linkMove: false },
    dragStartPosition,
    defaultConnectionPoint: {
      name: 'boundary'
    },
    defaultAnchor: {
      name: 'center'
    },
    sorting: joint.dia.Paper.sorting.EXACT,
    viewport: function (view) {
      var element = view.model;
      // Hide any element or link which is embedded inside a collapsed parent (or parent of the parent).
      var hidden = element.getAncestors().some(function (ancestor) {
        return ancestor.isCollapsed();
      });
      return !hidden;
    }
  });
  paper.el.style.border = '1px solid #E2E2E2';
  let scale = {sx:1,sy:1};
  function zoomOnMousewheel(paper, delta) {
    if (_.isNull(paper) || _.isUndefined(paper)) return;

    scale = paper.scale();
    const newScaleX = scale.sx + (delta * 0.01);
    const newScaleY = scale.sy + (delta * 0.01);
    if (newScaleX >= 0.2 && newScaleX <= 2) paper.scale(newScaleX, newScaleY);

    // dragStartPosition = { x: x * scale.sx, y: y * scale.sy };
  }
  paper.on({
    'blank:mousewheel': (event, x, y, delta) => {
      event.preventDefault();
      zoomOnMousewheel(paper, delta);
    },
    'cell:mousewheel': (_, event, x, y, delta) => {
      event.preventDefault();
      zoomOnMousewheel(paper, delta);
    },
    'blank:pointerdown': function (event, x, y) {
      dragStartPosition.x = x * scale.sx;
      dragStartPosition.y = y * scale.sy;
    },
    'cell:pointerup blank:pointerup': function (cellView, x, y) {
      delete dragStartPosition.x; delete dragStartPosition.y;
    }
  });

  $(graphEl).mousemove(function (event) {
    if (dragStartPosition.x)
      paper.translate(
        event.offsetX - dragStartPosition.x,
        event.offsetY - dragStartPosition.y);
  });

  setShapes(joint);

  return { graph, paper };
}