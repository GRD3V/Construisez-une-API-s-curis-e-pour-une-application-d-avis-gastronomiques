// @ts-check

import sauceSchema from "../../db/schema/sauceSchema.js";

export default {
  /**
   * Trouve toute les sauce
   * @returns {Promise<import("../../types/schema/SauceSchema.js").SauceSchema[]>}
   */
  findAllSauce() {
    return sauceSchema.find();
  },

  /**
   * Trouve une sauce par son ID
   * @param {string} sauceId
   * @returns {Promise<import("../../types/schema/SauceSchema.js").SauceSchema | undefined>}
   */
  findSauceById(sauceId) {
    return sauceSchema.findById(sauceId);
  },

  /**
   * Créer une sauce
   * @param {import("../../types/dto/SauceCreationRequest.js").SauceCreationRequest} sauceCreationRequest
   * @returns {Promise<import("../../types/schema/SauceSchema.js").SauceSchema>}
   */
  createSauce(sauceCreationRequest) {
    return sauceSchema.create({
      name: sauceCreationRequest.name,
      manufacturer: sauceCreationRequest.manufacturer,
      description: sauceCreationRequest.description,
      mainPepper: sauceCreationRequest.mainPepper,
      imageUrl: sauceCreationRequest.imageUrl,
      heat: sauceCreationRequest.heat,
      userId: sauceCreationRequest.userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },

  /**
   * Update une sauce
   * @param {string} sauceId
   * @param {Partial<import("../../types/dto/SauceUpdateRequest.js").SauceUpdateRequest>} sauceUpdateRequest
   * @returns {Promise<import("../../types/schema/SauceSchema.js").SauceSchema>}
   */
  updateSauceById(sauceId, sauceUpdateRequest) {
    return sauceSchema.findByIdAndUpdate(sauceId, {
      name: sauceUpdateRequest.name,
      manufacturer: sauceUpdateRequest.manufacturer,
      description: sauceUpdateRequest.description,
      mainPepper: sauceUpdateRequest.mainPepper,
      imageUrl: sauceUpdateRequest.imageUrl,
      heat: sauceUpdateRequest.heat,
      likes: sauceUpdateRequest.likes,
      dislikes: sauceUpdateRequest.dislikes,
      usersLiked: sauceUpdateRequest.usersLiked,
      usersDisliked: sauceUpdateRequest.usersDisliked,
      updatedAt: Date.now(),
    });
  },

  /**
   * Delete une sauce
   * @param {string} sauceId
   * @returns {Promise<void>}
   */
  deleteSauceById(sauceId) {
    return sauceSchema.findByIdAndDelete(sauceId);
  },
};
