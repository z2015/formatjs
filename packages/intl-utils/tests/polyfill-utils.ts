import {partitionPattern} from '../src/polyfill-utils';
declare const expect: Chai.ExpectStatic;

describe('polyfill-utils', function () {
  it('should partition pattern correctly', function () {
    expect(partitionPattern('AA{0}BB')).toEqual([
      {
        type: 'literal',
        value: 'AA',
      },
      {
        type: '0',
        value: undefined,
      },
      {
        type: 'literal',
        value: 'BB',
      },
    ]);
    expect(partitionPattern('{0} BB')).toEqual([
      {
        type: '0',
        value: undefined,
      },
      {
        type: 'literal',
        value: ' BB',
      },
    ]);
    expect(partitionPattern('AA {0}')).toEqual([
      {
        type: 'literal',
        value: 'AA ',
      },
      {
        type: '0',
        value: undefined,
      },
    ]);
  });
});
