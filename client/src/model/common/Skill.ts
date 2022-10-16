/**
 * ELPIS project - 2022
 */

import { DataNamed } from "src/model/core/specific/DataNamed";
import { SkillUp } from "./SkillUp";

/**
 * Definition of a skill
 */
export class Skill extends DataNamed {
  /** Type of object */
  protected objectType: string = "Skill";

  /**
   * Level of the skill
   */
  public level: number;

  /**
   * Time to becomes efficient for this skill
   */
  public rampUp: SkillUp;

  /**
   * Definition of a skill
   * @param name identifier of the skill
   * @param level actual level (expected or factual) of the skill
   * @param rampUp time to becomes efficient for this skill
   */
  constructor(name: string, level = 0, rampUp: SkillUp = new SkillUp()) {
    super(name);
    this.level = level;
    this.rampUp = rampUp;
  }
}
