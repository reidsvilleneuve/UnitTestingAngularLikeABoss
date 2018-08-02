import { MessageService } from './message.service';

describe('Message service', () => {
  let service;

  beforeEach(() => {
    service = new MessageService();
  });

  it('should have no messages to start', () => {
    expect(service.messages).toEqual([]);
  });

  describe('add', () => {
    it('should add a message', () => {
      const message = 'Hello there!';

      service.add(message);

      expect(service.messages).toEqual([message]);
    });
  });

  describe('clear', () => {
    it('should clear all messages', () => {
      const message = 'Hello there!';

      service.add(message);
      service.clear();

      expect(service.messages).toEqual([]);
    });
  });
});
