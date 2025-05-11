import { TransactionSignPipe } from './transaction-sign.pipe';

describe('TransactionSignPipe', () => {
  it('create an instance', () => {
    const pipe = new TransactionSignPipe();
    expect(pipe).toBeTruthy();
  });
});
