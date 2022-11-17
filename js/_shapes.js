export function setShapes() {
  var headerHeight = 30;
  var buttonSize = 14;

  joint.dia.Element.define('container.Child', {
    size: { width: 400, height: 30 },
    attrs: {
      root: {
        magnetSelector: 'body'
      },
      // shadow: {
      //   refWidth: '100%',
      //   refHeight: '100%',
      //   x: 3,
      //   y: 3,
      //   fill: '#000000',
      //   opacity: 0.2
      // },
      body: {
        refWidth: '100%',
        refHeight: '100%',
        strokeWidth: 1,
        stroke: '#000000',
        fill: '#FFFFFF'
      },
      label: {
        textVerticalAnchor: 'middle',
        // textAnchor: 'middle',
        refX: 10,
        refY: headerHeight / 2,
        fontSize: 14,
        fontFamily: 'sans-serif',
        fill: '#222222'
      },
      typeText: {
        textVerticalAnchor: 'middle',
        // textAnchor: 'middle',
        refX: 300,
        refY: headerHeight / 2,
        fontSize: 14,
        fontFamily: 'sans-serif',
        fill: '#222222'
      }
    }
  }, {
    markup: [{
      //   tagName: 'rect',
      //   selector: 'shadow',
      // }, {
      tagName: 'rect',
      selector: 'body',
    }, {
      tagName: 'text',
      selector: 'typeText'
    }, {
      tagName: 'text',
      selector: 'label'
    }
    ]
  });


  joint.dia.Element.define('container.Parent', {
    collapsed: false,
    attrs: {
      root: {
        magnetSelector: 'body'
      },
      // shadow: {
      //   refWidth: '100%',
      //   refHeight: '100%',
      //   x: 3,
      //   y: 3,
      //   fill: '#000000',
      //   opacity: 0.05
      // },
      body: {
        refWidth: '100%',
        refHeight: '100%',
        // strokeWidth: 1,
        // stroke: '#000000',
        fill: '#FCFCFC'
      },
      header: {
        refWidth: '100%',
        height: headerHeight,
        // strokeWidth: 0.5,
        // stroke: '#00598a',
        strokeWidth: 1,
        stroke: '#000000',
        fill: '#0099ee'
      },
      label: {
        textVerticalAnchor: 'middle',
        textAnchor: 'start',
        refX: 10,
        refY: headerHeight / 2,
        fontSize: 16,
        fontFamily: 'sans-serif',
        letterSpacing: 1,
        fill: '#FFFFFF',
        textWrap: {
          width: -40,
          maxLineCount: 1,
          ellipsis: '*'
        },
        // style: {
        //   textShadow: '1px 1px #222222',
        // }
      },
      button: {
        refDx: - buttonSize - (headerHeight - buttonSize) / 2,
        refY: (headerHeight - buttonSize) / 2,
        cursor: 'pointer',
        event: 'element:button:pointerdown',
        title: 'Collapse / Expand'
      },
      buttonBorder: {
        width: buttonSize,
        height: buttonSize,
        fill: '#000000',
        fillOpacity: 0.2,
        stroke: '#FFFFFF',
        strokeWidth: 0.5,
      },
      buttonIcon: {
        fill: 'none',
        stroke: '#FFFFFF',
        strokeWidth: 1
      }
    }
  }, {

    markup: [{
      //   tagName: 'rect',
      //   selector: 'shadow'
      // }, {
      tagName: 'rect',
      selector: 'body'
    }, {
      tagName: 'rect',
      selector: 'header'
    }, {
      tagName: 'text',
      selector: 'label'
    }, {
      tagName: 'g',
      selector: 'button',
      children: [{
        tagName: 'rect',
        selector: 'buttonBorder'
      }, {
        tagName: 'path',
        selector: 'buttonIcon'
      }]
    }],

    toggle: function (shouldCollapse) {
      var buttonD;
      var collapsed = (shouldCollapse === undefined) ? !this.get('collapsed') : shouldCollapse;
      if (collapsed) {
        buttonD = 'M 2 7 12 7 M 7 2 7 12';
        this.resize(400, 30);
      } else {
        buttonD = 'M 2 7 12 7';
        this.fitChildren();
      }
      this.attr(['buttonIcon', 'd'], buttonD);
      this.set('collapsed', collapsed);
    },

    isCollapsed: function () {
      return Boolean(this.get('collapsed'));
    },

    fitChildren: function () {
      // var padding = 10;
      this.fitEmbeds({
        padding: {
          top: headerHeight /* + padding,
          left: padding,
          right: padding,
          bottom: padding */
        }
      });
    }
  });


  joint.dia.Element.define('container.ObjectChild', {
    collapsed: false,
    attrs: {
      root: {
        magnetSelector: 'body'
      },
      // shadow: {
      //   refWidth: '100%',
      //   refHeight: '100%',
      //   x: 3,
      //   y: 3,
      //   fill: '#000000',
      //   opacity: 0.05
      // },
      body: {
        refWidth: '100%',
        refHeight: '100%',
        strokeWidth: 1,
        stroke: '#000000',
        fill: '#FFFFFF'
      },
      header: {
        refWidth: '100%',
        refHeight: '100%',
        strokeWidth: 1,
        stroke: '#000000',
        fill: '#FFFFFF'
      },
      label: {
        textVerticalAnchor: 'middle',
        // textAnchor: 'middle',
        refX: 10,
        refY: headerHeight / 2,
        fontSize: 14,
        fontFamily: 'sans-serif',
        fill: '#222222'
      },
      typeText: {
        textVerticalAnchor: 'middle',
        // textAnchor: 'middle',
        refX: 300,
        refY: headerHeight / 2,
        fontSize: 14,
        fontFamily: 'sans-serif',
        fill: '#222222'
      },
      button: {
        refDx: - buttonSize - (headerHeight - buttonSize) / 2,
        refY: (headerHeight - buttonSize) / 2,
        cursor: 'pointer',
        event: 'element:button:pointerdown',
        title: 'Collapse / Expand'
      },
      buttonBorder: {
        width: buttonSize,
        height: buttonSize,
        fill: '#000000',
        fillOpacity: 0.2,
        stroke: '#FFFFFF',
        strokeWidth: 0.5,
      },
      buttonIcon: {
        fill: 'none',
        stroke: '#FFFFFF',
        strokeWidth: 1
      }
    }
  }, {

    markup: [{
      //   tagName: 'rect',
      //   selector: 'shadow'
      // }, {
      tagName: 'rect',
      selector: 'body'
    }, {
      tagName: 'rect',
      selector: 'header'
    }, {
      tagName: 'text',
      selector: 'label'
    }, {
      tagName: 'text',
      selector: 'typeText'
    }, {
      tagName: 'g',
      selector: 'button',
      children: [{
        tagName: 'rect',
        selector: 'buttonBorder'
      }, {
        tagName: 'path',
        selector: 'buttonIcon'
      }]
    }],

    applyAccordionEffect: function () {
      // console.log(this.getBBox());
      const parents = this.getAncestors();
      for (const parent of parents) {
        // console.log(`one parent ${parent.id}, before: ${JSON.stringify(parent.getBBox())}`);
        // parent.fitEmbeds();
        let { x, y } = parent.getBBox();
        let height = 30;
        const parentSChilren = parent.getEmbeddedCells()
          // .filter(c => !c.attributes.collapsed)
          .sort((a, b) => parseInt(a.cid.slice(1) - b.cid.slice(1)));
        for (const cell of parentSChilren) {
          cell.position(x, y + height, { deep: true });
          height = height + cell.getBBox().height;
          // console.log(`cell ${cell.attributes.attrs.label.text} ${JSON.stringify(cell.getBBox())}`);
        }
        parent.resize(400, height);
        // console.log(`one parent ${parent.id}, after: ${JSON.stringify(parent.getBBox())}`);
      }
    },

    toggle: function (shouldCollapse, skipAccordion) {
      var buttonD;
      var collapsed = (shouldCollapse === undefined) ? !this.get('collapsed') : shouldCollapse;
      const subLinks = this.graph.getCells()
        .filter(c => c.id.slice(0, this.id.length) === this.id)
        .reduce((arr, c) => { arr.push(...this.graph.getConnectedLinks(c)); return arr; }, []);
      if (collapsed) {
        buttonD = 'M 2 7 12 7 M 7 2 7 12';
        this.resize(400, 30);
        subLinks.forEach(l => l.attr('./visibility', 'hidden'));
      } else {
        buttonD = 'M 2 7 12 7';
        this.fitChildren();
        subLinks.forEach(l => l.attr('./visibility', 'visible'));
      }
      this.attr(['buttonIcon', 'd'], buttonD);
      this.set('collapsed', collapsed);
      if (!skipAccordion) this.applyAccordionEffect();
    },

    isCollapsed: function () {
      return Boolean(this.get('collapsed'));
    },

    fitChildren: function () {
      // var padding = 10;
      this.fitEmbeds({
        padding: {
          top: headerHeight /* + padding,
          left: padding,
          right: padding,
          bottom: padding */
        }
      });
    }
  });

  joint.shapes.standard.Link.define('container.Link', {
    router: {
      name: 'manhattan',
      excludeTypes: ['container.Child', "container.Parent", 'container.ObjectChild', "container"],
    },
    connector: { name: 'rounded' },
    attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' } },
  });
}