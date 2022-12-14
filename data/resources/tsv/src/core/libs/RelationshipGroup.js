/* eslint-disable no-undef */
/**
 * Class to create and manage a relationship group. Useful to manage behavior between Peds.
 */
export class RelationshipGroup {
  /**
   * Create a relationship group. Optionally pass a group hash.
   *
   * @param name Name of the relationship group.
   */
  constructor(name) {
    const [, groupHash] = AddRelationshipGroup(name);
    this.hash = groupHash;
  }
  /**
   * Gets the hash of the relationship group.
   *
   * @returns The hash of this object.
   */
  get Hash() {
    return this.hash;
  }
  /**
   * Get the relationship between two relationship groups.
   *
   * @param targetGroup The other relationship group.
   * @returns The relationship
   */
  getRelationshipBetweenGroups(targetGroup) {
    return GetRelationshipBetweenGroups(this.Hash, targetGroup.Hash);
  }
  /**
   * Set the relationship group between this relationship group and another one.
   *
   * @param targetGroup The other relationship group.
   * @param relationship The desired relationship.
   * @param biDirectionally If target group should have same relationship towards this.
   */
  setRelationshipBetweenGroups(targetGroup, relationship, biDirectionally = false) {
    SetRelationshipBetweenGroups(Number(relationship), this.Hash, targetGroup.Hash);
    if (biDirectionally) {
      SetRelationshipBetweenGroups(Number(relationship), targetGroup.Hash, this.Hash);
    }
  }
  /**
   * Clear the relationship between this relationship group and another.
   *
   * @param targetGroup The other relationship group.
   * @param relationship The desired relationship to clear.
   * @param biDirectionally Whether the target group should also clear the relationship.
   */
  clearRelationshipBetweenGroups(targetGroup, relationship, biDirectionally = false) {
    ClearRelationshipBetweenGroups(Number(relationship), this.Hash, targetGroup.Hash);
    if (biDirectionally) {
      ClearRelationshipBetweenGroups(Number(relationship), targetGroup.Hash, this.Hash);
    }
  }
  /**
   * Remove this relationship group from the game. This will not delete this object.
   */
  remove() {
    RemoveRelationshipGroup(this.Hash);
  }
}
