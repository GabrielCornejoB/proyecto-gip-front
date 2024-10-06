import { ToFileArrayPipe } from './to-file-array.pipe';

describe('ToFileArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new ToFileArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
