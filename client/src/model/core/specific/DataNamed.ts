/**
 * ELPIS project - 2022
 */

import { AbstractData } from "../../core/AbstractData";
import { identifierType } from "../../core/BasicTypes";

/**
 * Definition of a data identified by a name
 */
export abstract class DataNamed extends AbstractData {
  /**
   * Unique identifier of the data (read only)
   */
  private name: string;

  /**
   * Data identified by name constructor
   * @param name name of the data
   */
  constructor(name: string) {
    super();
    this.name = name;
  }

  /**
   * @inheritdoc
   */
  public getIdentifiers(): Map<string, identifierType> {
    const identifiers = new Map<string, identifierType>();

    identifiers.set("name", this.name);

    return identifiers;
  }

  /**
   *
   * @returns the name of the object
   */
  public getName(): string {
    return this.name;
  }
}
