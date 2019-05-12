'use strict';

/**
 * Prices.js controller
 *
 * @description: A set of functions called "actions" for managing `Prices`.
 */

module.exports = {

  /**
   * Retrieve prices records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.prices.search(ctx.query);
    } else {
      return strapi.services.prices.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a prices record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.prices.fetch(ctx.params);
  },

  /**
   * Count prices records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.prices.count(ctx.query);
  },

  /**
   * Create a/an prices record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.prices.add(ctx.request.body);
  },

  /**
   * Update a/an prices record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.prices.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an prices record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.prices.remove(ctx.params);
  }
};
