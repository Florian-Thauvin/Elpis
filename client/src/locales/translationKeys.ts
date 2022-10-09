/**
 * ELPIS project - 2022
 */

import { GENERAL_PARAMETERS, IGeneralParameters } from "./keys/GeneralViewKeys";

export interface IElement{
  LABEL: string;
}

export interface IInputKey extends IElement {
  HELP: string;
}

export interface ITranslationKeys {
  COPYRIGHTS: string;
  GENERAL_PARAMETERS: IGeneralParameters;
  TITLE: string;
}

// shortcuts keys
export const TRANSLATION_KEYS: ITranslationKeys = {
  COPYRIGHTS: "COPYRIGHTS",
  TITLE: "TITLE",

  GENERAL_PARAMETERS
}
