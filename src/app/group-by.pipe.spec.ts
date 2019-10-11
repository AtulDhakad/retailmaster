import { GroupByPipe } from './group-by.pipe';
import {} from 'jasmine';
describe('GroupByPipe', () => {
  it('create an instance', () => {
    const pipe = new GroupByPipe();
    expect(pipe).toBeTruthy();
  });
});
