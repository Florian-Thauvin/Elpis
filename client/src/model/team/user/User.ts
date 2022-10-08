/**
 * ELPIS project - 2022
 */

import { Skill } from "src/model/common/Skill";
import { SkillSet } from "src/model/common/SkillSet";
import { DataNamed } from "src/model/core/specific/DataNamed";
import { GeneralParameters } from "src/model/parameters/GeneralParameters";

/**
 * Definition of a User
 */
export class User extends DataNamed {
    /** Type of object */
    protected objectType: string = "User";

    /**
     *  List of all user skills
     */
    public skills: SkillSet;

    /**
     * Definition of a User
     * @param name name of the data
     * @param generalParameters global parameters
     * @param skills list of all user skills
     */
    constructor(name: string, generalParameters: GeneralParameters, ...skills: Skill[]) {
        super(name);

        // Create all User skills
        this.skills = new SkillSet(skills);
        this.skills.generateMissingSkills(generalParameters.allSkillsTypes);
    }
}
