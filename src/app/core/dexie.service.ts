import Dexie from "dexie";

/**
 * @description Dexie: IndexDB wrapper
 * @export DexieService
 * @class DexieService
 * @extends {Dexie}
 */
export class DexieService extends Dexie {
  constructor() {
    super("WorkiomDB");

    this.version(1).stores({
      videos: "&id, comment, thumb, title, order"
    });
  }
}
