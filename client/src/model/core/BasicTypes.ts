/**
 * ELPIS project - 2022
 */

import { AbstractData } from "./AbstractData";

/**
 * Allowed type for an identifier
 */
export type identifierType = string | number | AbstractData;

/**
 * All allowed type for the model
 */
export type valueType = identifierType | identifierType[];
