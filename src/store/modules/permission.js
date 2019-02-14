import { asyncRouterMap, constantRouterMap } from "@/router";

/* Layout */
// import Layout from "@/views/layout/Layout";
// import power from "@/api/power"; // 动态获取用户权限
// const _import = require("@/router/_import_development");

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0);
  } else {
    return true;
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        // 根据本地获取权限
        let accessedRouters;
        if (roles.indexOf("admin") >= 0) {
          accessedRouters = asyncRouterMap;
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
        }

        // 动态获取权限
        // var accessedRouters = [];
        // var menu_data = power.data_01;
        // // var menu_data = [];
        // if (menu_data) {
        //   for (var shuju in menu_data) {
        //     var ca = {
        //       path: menu_data[shuju].path,
        //       component: Layout,
        //       name: menu_data[shuju].name,
        //       meta: {
        //         title: menu_data[shuju].meta.title,
        //         icon: menu_data[shuju].meta.icon
        //       }
        //     };
        //     if (menu_data[shuju].children) {
        //       var caidan = [];
        //       for (var shuju2 in menu_data[shuju].children) {
        //         var cai = {
        //           path: menu_data[shuju].children[shuju2].path,
        //           component: _import(
        //             menu_data[shuju].children[shuju2].component
        //           ),
        //           name: menu_data[shuju].children[shuju2].name,
        //           meta: {
        //             title: menu_data[shuju].children[shuju2].meta.title,
        //             icon: menu_data[shuju].children[shuju2].meta.icon,
        //             noCache: true
        //           }
        //         };
        //         caidan.push(cai);
        //         ca["children"] = caidan;
        //       }
        //     }
        //     console.log(ca);

        //     accessedRouters.push(ca);
        //   }
        // }

        commit("SET_ROUTERS", accessedRouters);
        resolve();
      });
    }
  }
};

export default permission;
