interface ICommand<T> {
  execute: () => void;
  undo: () => void;
  value: T;
}

export class Command<T> implements ICommand<T> {
  constructor(readonly execute, readonly undo, readonly value) {
    this.execute = execute;
    this.undo = undo;
    this.value = value;
  }
}
