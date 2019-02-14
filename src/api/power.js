export default {
  data_01: [
    // {
    //   path: "",
    //   redirect: "dashboard",
    //   meta: {
    //     title: "",
    //     icon: ""
    //     // roles: ["admin", "editor"] // 可以在根导航中设置角色
    //   },
    //   children: [
    //     {
    //       path: "dashboard",
    //       component: "dashboard/index",
    //       name: "dashboard",
    //       meta: { title: "dashboard", icon: "dashboard" }
    //     }
    //   ]
    // },
    {
      path: "/permission",
      redirect: "/permission/index",
      name: "dashboard",
      meta: {
        title: "permission",
        icon: "lock"
      },
      children: [
        {
          path: "page", // 后台用户
          component: "permission/page",
          name: "pagePermission",
          meta: {
            title: "pagePermission"
          }
        },
        {
          path: "directive", // 后台权限
          component: "permission/directive",
          name: "directivePermission",
          meta: {
            title: "directivePermission"
          }
        }
      ]
    }
  ]
};
