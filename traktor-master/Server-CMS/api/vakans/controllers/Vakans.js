'use strict';

/**
 * Vakans.js controller
 *
 * @description: A set of functions called "actions" for managing `Vakans`.
 */

module.exports = {

  /**
   * Retrieve vakans records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.vakans.search(ctx.query);
    } else {
      return strapi.services.vakans.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a vakans record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.vakans.fetch(ctx.params);
  },

  /**
   * Count vakans records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.vakans.count(ctx.query);
  },

  /**
   * Create a/an vakans record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.vakans.add(ctx.request.body);
  },

  /**
   * Update a/an vakans record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.vakans.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an vakans record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.vakans.remove(ctx.params);
  }
};
