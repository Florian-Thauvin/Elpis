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
  private id: string = uuidv4();

  public getId(): string{
    return `${this.objectType}_${this.id}`;
  }
}