/**
 * ELPIS project - 2022
 */
 import {v4 as uuidv4} from 'uuid';

/**
 * Base class definition
 */
export abstract class AbstractData {
  /** Type of object */
  protected objectType: string = "AbstractData";

  /** Id of object */
  private id: string;

  /** All attributes of the object */
  private keys: string[];

  constructor(){
    this.id = uuidv4();
    this.keys = Object.getOwnPropertyNames(this);
  }

  public getId(): string {
    return `${this.objectType}_${this.id}`;
  }

  public getKeys(): readonly string[]{
    return this.keys;
  }

  public isInList(list: AbstractData[]){
    const index = list.findIndex((d) => d.getId() === this.getId());
    return index !== -1;
  }
}