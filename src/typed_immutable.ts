import { Record } from 'immutable';

// http://blog.mgechev.com/2018/01/18/react-typescript-redux-immutable/

interface Constructable<T> {
  new (...args: any[]): T;
}

interface StaticallyTypedRecord<T> extends Constructable<T> {
  get<K extends keyof T>(key: K): T[K];
  set<K extends keyof T, V extends T[K]>(key: K, value: V): T;
  withMutations(cb: (r: StaticallyTypedRecord<T>) => StaticallyTypedRecord<T>): T;
  setIn<K1 extends keyof T, V extends T[K1]>(keys: [K1], val: V): T;
  setIn<K1 extends keyof T, K2 extends keyof T[K1], V extends T[K1][K2]>(keys: [K1, K2], val: V): T;
  setIn<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], V extends T[K1][K2][K3]>(
    keys: [K1, K2, K3],
    val: V
  ): T;
  toJS(): T;
}

export const RecordFactory = <T>(seed: T): StaticallyTypedRecord<T> => {
  return (Record(seed) as any) as StaticallyTypedRecord<T>;
};
