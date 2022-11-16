const definitions = require(`../data/definitions.json`);
const sourceData = require(`../data/data_with_ref.json`);

const fs = require(`fs`);
const path = require(`path`);

const refStem = `./definitions.json#/`;

function crawlerMutator(arr) {
  for (const elem of arr)
    if (elem.$ref) {
      const ref = elem.$ref.slice(refStem.length);
      let defStr = JSON.stringify(definitions[ref]);
      defStr = defStr.replaceAll(
        new RegExp(`"id":"${ref}`, `g`),
        `"id":"${elem.id}`
      );
      let def = JSON.parse(defStr);
      def.title = elem.title;
      // special case: string array
      if (ref === `stringArray` && elem.stringTitle)
        def.children[0].title = elem.stringTitle;
      // replace
      delete elem.$ref;
      elem.type = def.type;
      elem.children = def.children;
    }
    else if (elem.children?.length)
    crawlerMutator(elem.children);
}

crawlerMutator(sourceData);
fs.writeFileSync(
  path.resolve(__dirname, `../data/data.json`), 
  JSON.stringify(sourceData, null, `  `), 
  { encoding: `utf-8` }
);
