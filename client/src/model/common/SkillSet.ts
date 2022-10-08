/**
 * ELPIS project - 2022
 */

import { Skill } from "./Skill";

/**
 * Definition of a set of skills
 */
export class SkillSet {
  /**
   * List of all skills
   */
  public skills: Skill[];

  /**
   * Definition of a set of skills
   * @param skills  List of all skills
   */
  constructor(skills: Skill[]) {
    this.skills = [...skills];
  }

  /**
   * Function used to generate all missing skills with default skill value
   * @param allSkills list of all wanted skills
   */
  public generateMissingSkills(allSkills: string[]) {
    // Get all actual skills
    const actualSkills = this.skills.flatMap((d) => d.getName());
    // Get the delta with expected
    const missingSkills = allSkills.filter((d) => !actualSkills.includes(d));

    // Create a new skill with default value
    missingSkills.forEach((d) => this.skills.push(new Skill(d)));
  }
}
