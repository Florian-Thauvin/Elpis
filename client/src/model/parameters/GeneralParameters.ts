/**
 * ELPIS project - 2022
 */

import { Task } from "./Task";

/**
 * All general parameters
 */
export class GeneralParameters {
  /** Number of days in a sprint */
  public numberOfDaysInSprint: number;

  /** List of all task that cannot be skipped */
  public incompresibleProcesses: Task[];

  /** List of all existing skills */
  public allSkillsTypes: string[];

  /**
   * Constructor for general parameters
   * @param numberOfDaysInSprint number of days in a sprint
   * @param allSkillsTypes list of all existing skills
   * @param incompresibleProcesses list of all task that cannot be skipped
   */
  constructor(
    numberOfDaysInSprint: number,
    allSkillsTypes: string[],
    ...incompresibleProcesses: Task[]
  ) {
    this.numberOfDaysInSprint = numberOfDaysInSprint;
    this.allSkillsTypes = allSkillsTypes;
    this.incompresibleProcesses = [...incompresibleProcesses];
  }
}
