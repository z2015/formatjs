import {outputFileSync, readJSONSync} from 'fs-extra';
import * as serialize from 'serialize-javascript';
import * as minimist from 'minimist'

const aliases = readJSONSync(require.resolve('cldr-core/supplemental/aliases.json'))
const PARENT_LOCALES = readJSONSync(require.resolve('cldr-core/supplemental/parentLocales.json')) 

const {languageAlias} = aliases.supplemental.metadata.alias;

function main(args: Record<string, string>) {
  /**
   * Turn aliases into Record<string, string> using _replacement
   */
  const localeAliases = Object.keys(languageAlias).reduce(
    (all: Record<string, string>, locale) => {
      all[locale] = languageAlias[locale as 'zh-CN']._replacement;
      return all;
    },
    {}
  );

  const parentLocales = PARENT_LOCALES.supplemental.parentLocales.parentLocale;
  const parentLocaleMap = Object.keys(parentLocales).reduce(
    (all: Record<string, string>, locale: string) => {
      if (parentLocales[locale as 'en-150'] !== 'root') {
        all[locale] = parentLocales[locale as 'en-150'];
      }
      return all;
    },
    {}
  );
console.log('Writing aliases to', args.aliases)
  outputFileSync(
    args.aliases,
    `/* @generated */	
  // prettier-ignore  
  export default ${serialize(localeAliases)}
  `
  );

  outputFileSync(
    args.parentLocales,
    `/* @generated */	
  // prettier-ignore  
  export default ${serialize(parentLocaleMap)}
  `
  );
}


if (require.main === module) {
  main(minimist(process.argv))
}