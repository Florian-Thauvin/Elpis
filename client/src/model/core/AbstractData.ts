/**
 * ELPIS project - 2022
 */

import { identifierType } from "./BasicTypes";

/**
 * Base class definition
 */
export abstract class AbstractData {
  /** Type of object */
  protected objectType: string = "AbstractData";

  /**
   * Function used to get the identifiers of an object
   * { @warning Must be in read only }
   * @returns List of all values used to identify the object mapped by key
   */
  public abstract getIdentifiers(): Map<string, identifierType>;

  /**
 
     * Determines if the objects has the same key   
     * @param other other object to compare 
     * @returns true if the objects has same identifiers 
    */
  public equalsByIdentifier(other: AbstractData): boolean {
    let isEquals: boolean = true;

    // First, check if the other object is not null
    if (other === null) {
      isEquals = false;
    }

    // Then check type definitions
    else if (other.objectType !== this.objectType) {
      isEquals = false;
    }
    // Then, we'll check identifier by identifier
    else {
      // First, get identifier of each object
      const identifiers: Map<string, identifierType> = this.getIdentifiers();
      const otherIdentifiers: Map<string, identifierType> =
        this.getIdentifiers();

      // We check each identifier of the object
      identifiers.forEach((value: identifierType, key: string): void => {
        // Get corresponding value from other object
        const otherValue: identifierType | undefined =
          otherIdentifiers.get(key);

        // If we can't find the value, break all
        if (otherValue === undefined) {
          isEquals = false;
          return;
        }

        // Check if both values are not null
        let isValueEquals = true;

        // Special case for AbstractData, we need to use a recursive call
        if (value instanceof AbstractData) {
          isValueEquals =
            otherValue instanceof AbstractData
              ? value.equalsByIdentifier(otherValue)
              : false;
        } else {
          isValueEquals = value === otherValue;
        }

        // If the values are not equals, break all
        isEquals &&= isValueEquals;

        if (!isEquals) {
          return;
        }
      });
    }

    return isEquals;
  }

  /**
   * Function used to get the type of object manipulated
   * @returns type of object
   */
  public getObjectType(): string {
    return this.objectType;
  }
}
