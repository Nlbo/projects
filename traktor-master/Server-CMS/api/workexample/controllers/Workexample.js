'use strict';

/**
 * Workexample.js controller
 *
 * @description: A set of functions called "actions" for managing `Workexample`.
 */

module.exports = {

  /**
   * Retrieve workexample records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.workexample.search(ctx.query);
    } else {
      return strapi.services.workexample.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a workexample record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.workexample.fetch(ctx.params);
  },

  /**
   * Count workexample records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.workexample.count(ctx.query);
  },

  /**
   * Create a/an workexample record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.workexample.add(ctx.request.body);
  },

  /**
   * Update a/an workexample record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.workexample.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an workexample record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.workexample.remove(ctx.params);
  }
};
