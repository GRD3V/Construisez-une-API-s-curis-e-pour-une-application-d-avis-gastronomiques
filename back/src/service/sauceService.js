// @ts-check
import path from "path";
import { config } from "../config.js";
import sauceRepository from "../repository/mongoose/sauceRepository.js";
import { getFileUrl, getFilenameByPath } from "../utils/fileUtil.js";
import fs from "fs/promises";

export default {
  /**
   * Récupère toute les sauce
   * @returns {Promise<import("../types/entity/SauceSimpleEntity.js").SauceSimpleEntity[]>}
   */
  async getAllSauce() {
    const allSauce = await sauceRepository.findAllSauce();

    return allSauce.map((sauce) => {
      return {
        _id: sauce.id,
        name: sauce.name,
        heat: sauce.heat,
        likes: sauce.likes,
        dislikes: sauce.dislikes,
        imageUrl: getFileUrl(sauce.imageUrl),
      };
    });
  },

  /**
   * Récupère une sauce par son ObjectId
   * @param {string} sauceId
   * @returns {Promise<import("../types/entity/SauceEntity.js").SauceEntity>}
   */
  async getSauceById(sauceId) {
    const sauce = await sauceRepository.findSauceById(sauceId);
    if (!sauce) throw new Error("SAUCE_NOT_FOUND");
    return {
      _id: sauce.id,
      name: sauce.name,
      description: sauce.description,
      manufacturer: sauce.manufacturer,
      mainPepper: sauce.mainPepper,
      heat: sauce.heat,
      likes: sauce.likes,
      dislikes: sauce.dislikes,
      userId: sauce.userId,
      imageUrl: getFileUrl(sauce.imageUrl),
      usersLiked: sauce.usersLiked,
      usersDisliked: sauce.usersDisliked,
    };
  },

  /**
   * @param {import("../types/dto/SauceCreationRequest.js").SauceCreationRequest} sauceCreationrequest
   * @returns {Promise<import("../types/schema/SauceSchema.js").SauceSchema>}
   */
  async createSauce(sauceCreationrequest) {
    return sauceRepository.createSauce(sauceCreationrequest);
  },

  /**
   * @param {string} sauceId
   * @param {Partial<import("../types/dto/SauceUpdateRequest.js").SauceUpdateRequest>} sauceUpdateRequest
   * @param {string} oldImageUrl
   * @returns {Promise<import("../types/schema/SauceSchema.js").SauceSchema>}
   */
  async updateSauce(sauceId, sauceUpdateRequest, oldImageUrl) {
    if (sauceUpdateRequest.imageUrl)
      await fs.unlink(
        path.join(config.FILE_STORAGE, getFilenameByPath(oldImageUrl))
      );
    return sauceRepository.updateSauceById(sauceId, sauceUpdateRequest);
  },

  /**
   * @param {string} sauceId
   * @param {string} imageUrl
   * @returns {Promise<void>}
   */
  async deleteSauce(sauceId, imageUrl) {
    await fs.unlink(
      path.join(config.FILE_STORAGE, getFilenameByPath(imageUrl))
    );
    return sauceRepository.deleteSauceById(sauceId);
  },

  /**
   * @param {string} sauceId
   * @param {string} userId
   * @param {number} like
   * @returns {Promise<void>}
   */
  async updateSauceLike(sauceId, userId, like) {
    const sauce = await sauceRepository.findSauceById(sauceId);
    if (!sauce) throw new Error("SAUCE_NOT_FOUND");
    const sauceUpdate = {
      likes: sauce.likes,
      dislikes: sauce.dislikes,
      usersLiked: sauce.usersLiked,
      usersDisliked: sauce.usersDisliked,
    };

    // Vérifier si l'utilisateur a déjà liké ou disliké
    const userIndexLiked = sauceUpdate.usersLiked.indexOf(userId);
    const userIndexDisliked = sauceUpdate.usersDisliked.indexOf(userId);

    if (like > 0) {
      // Like
      if (userIndexLiked === -1) {
        // L'utilisateur n'a pas encore liké
        sauceUpdate.usersLiked.push(userId);

        // Si l'utilisateur avait disliké, annuler le dislike
        if (userIndexDisliked !== -1) {
          sauceUpdate.usersDisliked.splice(userIndexDisliked, 1);
        }
      }
      // Sinon, l'utilisateur a déjà liké, ne rien faire
    } else if (like < 0) {
      // Dislike
      if (userIndexDisliked === -1) {
        // L'utilisateur n'a pas encore disliké
        sauceUpdate.usersDisliked.push(userId);

        // Si l'utilisateur avait liké, annuler le like
        if (userIndexLiked !== -1) {
          sauceUpdate.usersLiked.splice(userIndexLiked, 1);
        }
      }
      // Sinon, l'utilisateur a déjà disliké, ne rien faire
    } else if (userIndexLiked !== -1 || userIndexDisliked !== -1) {
      // Unlike
      // L'utilisateur a liké ou disliké
      if (userIndexLiked !== -1) {
        sauceUpdate.usersLiked.splice(userIndexLiked, 1);
      } else {
        sauceUpdate.usersDisliked.splice(userIndexDisliked, 1);
      }
      // Sinon, l'utilisateur n'a ni liké ni disliké, ne rien faire
    }

    sauceUpdate.likes = sauceUpdate.usersLiked.length;
    sauceUpdate.dislikes = sauceUpdate.usersDisliked.length;

    await sauceRepository.updateSauceById(sauceId, sauceUpdate);
  },
};
