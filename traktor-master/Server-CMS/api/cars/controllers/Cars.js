'use strict';

/**
 * Cars.js controller
 *
 * @description: A set of functions called "actions" for managing `Cars`.
 */

module.exports = {

  /**
   * Retrieve cars records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.cars.search(ctx.query);
    } else {
      return strapi.services.cars.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a cars record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.cars.fetch(ctx.params);
  },

  /**
   * Count cars records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.cars.count(ctx.query);
  },

  /**
   * Create a/an cars record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.cars.add(ctx.request.body);
  },

  /**
   * Update a/an cars record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.cars.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an cars record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.cars.remove(ctx.params);
  }
};
