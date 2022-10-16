/**
 * ELPIS project - 2022
 */

import { AbstractData } from "../core/AbstractData";

/**
 * Definition of a skill ramp up
 */
export class SkillUp extends AbstractData{
  /** Type of object */
  protected objectType: string = "SkillUp";
  /**
   * Efficiency (in percent) for a ramp up
   */
  public efficiency: number;

  /**
   * Number of day since the task starts
   */
  public day: number;

  /**
   * Constructor
   * @param efficiency efficiency (in percent) for a ramp up
   * @param day number of day since the task starts
   *
   * @defaultValue by default, we are 100% efficient at first day
   */
  constructor(efficiency: number = 100, day: number = 0) {
    super();
    this.efficiency = efficiency;
    this.day = day;
  }
}
