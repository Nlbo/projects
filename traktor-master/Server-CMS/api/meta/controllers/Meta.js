'use strict';

/**
 * Meta.js controller
 *
 * @description: A set of functions called "actions" for managing `Meta`.
 */

module.exports = {

  /**
   * Retrieve meta records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.meta.search(ctx.query);
    } else {
      return strapi.services.meta.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a meta record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.meta.fetch(ctx.params);
  },

  /**
   * Count meta records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.meta.count(ctx.query);
  },

  /**
   * Create a/an meta record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.meta.add(ctx.request.body);
  },

  /**
   * Update a/an meta record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.meta.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an meta record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.meta.remove(ctx.params);
  }
};
