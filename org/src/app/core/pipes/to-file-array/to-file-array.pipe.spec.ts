import { ToFileArrayPipe } from './to-file-array.pipe';

describe('ToFileArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new ToFileArrayPipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform()', () => {
    it(
      'GIVEN the argument is null ' +
        'WHEN the fn is called ' +
        'THEN it should return an empty array',
      () => {
        const arg = null;

        const pipe = new ToFileArrayPipe();
        const result = pipe.transform(arg);

        expect(result).toEqual([]);
        expect(result.length).toEqual(0);
      },
    );

    it(
      'GIVEN the argument is a valid FileList ' +
        'WHEN the fn is called ' +
        'THEN it should return a File array',
      () => {
        const arg = [
          new File(['a'], 'a'),
          new File(['b'], 'b'),
        ] as never as FileList;

        const pipe = new ToFileArrayPipe();
        const result = pipe.transform(arg);

        expect(result[0] instanceof File).toBe(true);
      },
    );
  });
});
