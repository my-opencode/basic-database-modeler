import { setShapes } from "/js/_shapes.js";

export function initGraph(graphEl) {
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
    
    defaultConnectionPoint: {
        name: 'boundary'
    },
    defaultAnchor: {
        name: 'center'
    },
    sorting: joint.dia.Paper.sorting.APPROX,
    viewport: function(view) {
        var element = view.model;
        // Hide any element or link which is embedded inside a collapsed parent (or parent of the parent).
        var hidden = element.getAncestors().some(function(ancestor) {
            return ancestor.isCollapsed();
        });
        return !hidden;
    }
  });
  paper.el.style.border = '1px solid #E2E2E2';

  function zoomOnMousewheel(paper, delta) {
    if (_.isNull(paper) || _.isUndefined(paper)) return;

    const scale = paper.scale();
    const newScaleX = scale.sx + (delta * 0.01);
    const newScaleY = scale.sy + (delta * 0.01);
    if (newScaleX >= 0.2 && newScaleX <= 2) paper.scale(newScaleX, newScaleY);
  }
  paper.on({
    'blank:mousewheel': (event, x, y, delta) => {
      event.preventDefault();
      zoomOnMousewheel(paper, delta);
    },
    'cell:mousewheel': (_, event, x, y, delta) => {
      event.preventDefault();
      zoomOnMousewheel(paper, delta);
    }
  });

  setShapes(joint);

  return { graph, paper };
}