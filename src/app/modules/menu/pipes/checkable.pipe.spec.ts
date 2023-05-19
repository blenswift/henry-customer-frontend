import { CheckablePipe } from './checkable.pipe';

describe('CheckablePipe', () => {
  it('create an instance', () => {
    const pipe = new CheckablePipe();
    expect(pipe).toBeTruthy();
  });
});
