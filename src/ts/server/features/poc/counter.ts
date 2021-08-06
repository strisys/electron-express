export type CountMessage = { count: number };

export class Counter {
  private _count = 0;

  public getNext(): CountMessage {
    return { 
      count: ++(this._count)
    }
  }
}