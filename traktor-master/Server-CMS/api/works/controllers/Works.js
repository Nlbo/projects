'use strict';

/**
 * Works.js controller
 *
 * @description: A set of functions called "actions" for managing `Works`.
 */

module.exports = {

  /**
   * Retrieve works records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.works.search(ctx.query);
    } else {
      return strapi.services.works.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a works record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.works.fetch(ctx.params);
  },

  /**
   * Count works records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.works.count(ctx.query);
  },

  /**
   * Create a/an works record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.works.add(ctx.request.body);
  },

  /**
   * Update a/an works record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.works.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an works record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.works.remove(ctx.params);
  }
};
