/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const route = [
  {
    path: "/projects",
    meta: { layout: "private", layoutStyle: "blank", requiresAuth: true, name: "Projects" },
    children: [
      {
        path: "",
        name: "projects",
        component: () => import("@/pages/projects/index.vue"),
        props: true
      },
      {
        path: "add",
        name: "projects-add",
        component: () => import("@/pages/projects/add.vue"),
        props: true
      }
    ]
  },
  {
    path: "/projects/:projectId",
    meta: { layout: "private", requiresAuth: true, name: "Projects" },
    children: [
      {
        path: "",
        name: "projects-projectId",
        component: () => import("@/pages/projects/_projectId/index.vue"),
        props: true
      },
      {
        path: "logs",
        name: "projects-projectId-logs",
        component: () => import("@/pages/projects/_projectId/logs.vue"),
        props: true
      },

      // members section
      {
        path: "members",
        children: [
          {
            path: "",
            name: "projects-projectId-members",
            component: () => import("@/pages/projects/_projectId/members/index.vue"),
            props: true
          },
          {
            path: "add",
            name: "projects-projectId-members-add",
            component: () => import("@/pages/projects/_projectId/members/add.vue"),
            props: true
          },
          {
            path: "invites",
            name: "projects-projectId-members-invites",
            component: () => import("@/pages/projects/_projectId/members/invites.vue"),
            props: true
          }
        ]
      },

      // setting section
      {
        path: "setting",
        children: [
          {
            path: "",
            name: "projects-projectId-setting",
            component: () => import("@/pages/projects/_projectId/setting/index.vue"),
            props: true
          },
          {
            path: "destroy",
            name: "projects-projectId-setting-destroy",
            component: () => import("@/pages/projects/_projectId/setting/destroy.vue"),
            props: true
          }
        ]
      },

      // teams section
      {
        path: "teams",
        name: "projects-projectId-teams",
        component: () => import("@/pages/projects/_projectId/teams/index.vue"),
        props: true
      },

      // applications section
      {
        path: "applications",
        children: [
          {
            path: "",
            name: "projects-projectId-applications",
            component: () => import("@/pages/projects/_projectId/applications/index.vue"),
            props: true
          },
          {
            path: "add",
            name: "projects-projectId-applications-add",
            component: () => import("@/pages/projects/_projectId/applications/add/index.vue"),
            props: true
          }
        ]
      },

      // clouds section
      {
        path: "clouds",
        children: [
          {
            path: "",
            name: "projects-projectId-clouds",
            component: () => import("@/pages/projects/_projectId/clouds/index.vue"),
            props: true
          },
          {
            path: "add",
            name: "projects-projectId-clouds-add",
            component: () => import("@/pages/projects/_projectId/clouds/add/index.vue"),
            props: true
          }
        ]
      },

      // containers section
      {
        path: "containers",
        children: [
          {
            path: "",
            name: "projects-projectId-containers",
            component: () => import("@/pages/projects/_projectId/containers/index.vue"),
            props: true
          },
          {
            path: "add",
            name: "projects-projectId-containers-add",
            component: () => import("@/pages/projects/_projectId/containers/add/index.vue"),
            props: true
          }
        ]
      },

      // databases section
      {
        path: "databases",
        children: [
          {
            path: "",
            name: "projects-projectId-databases",
            component: () => import("@/pages/projects/_projectId/databases/index.vue"),
            props: true
          },
          {
            path: "add",
            name: "projects-projectId-databases-add",
            component: () => import("@/pages/projects/_projectId/databases/add/index.vue"),
            props: true
          }
        ]
      },

      // desktops section
      {
        path: "desktops",
        children: [
          {
            path: "",
            name: "projects-projectId-desktops",
            component: () => import("@/pages/projects/_projectId/desktops/index.vue"),
            props: true
          },
          {
            path: "add",
            name: "projects-projectId-desktops-add",
            component: () => import("@/pages/projects/_projectId/desktops/add/index.vue"),
            props: true
          }
        ]
      },

      // servers section
      {
        path: "servers",
        children: [
          {
            path: "",
            name: "projects-projectId-servers",
            component: () => import("@/pages/projects/_projectId/servers/index.vue"),
            props: true
          },
          {
            path: "add",
            children: [
              {
                path: "",
                name: "projects-projectId-servers-add",
                component: () => import("@/pages/projects/_projectId/servers/add/index.vue"),
                props: true
              },
              {
                path: ":scheme",
                name: "projects-projectId-servers-add-scheme",
                component: () => import("@/pages/projects/_projectId/servers/add/_scheme.vue"),
                props: true
              }
            ]
          },
          {
            path: ":serverId",
            children: [
              {
                path: "",
                name: "projects-projectId-servers-serverId",
                component: () => import("@/pages/projects/_projectId/servers/_serverId/index.vue"),
                props: true
              },
              {
                path: "members",
                children: [
                  {
                    path: "",
                    name: "projects-projectId-servers-serverId-members",
                    component: () => import("@/pages/projects/_projectId/servers/_serverId/members/index.vue"),
                    props: true
                  },
                  {
                    path: "add",
                    name: "projects-projectId-servers-serverId-members-add",
                    component: () => import("@/pages/projects/_projectId/servers/_serverId/members/add.vue"),
                    props: true
                  },
                  {
                    path: ":memberId",
                    children: [
                      {
                        path: "",
                        name: "projects-projectId-servers-serverId-members-memberId",
                        component: () =>
                          import("@/pages/projects/_projectId/servers/_serverId/members/_memberId/index.vue"),
                        props: true
                      },
                      {
                        path: ":logId",
                        name: "/projects-projectId-servers-serverId-members-memberId-logId",
                        component: () =>
                          import("@/pages/projects/_projectId/servers/_serverId/members/_memberId/_logId.vue"),
                        props: true
                      }
                    ]
                  }
                ]
              },
              {
                path: "session",
                children: [
                  {
                    path: "",
                    name: "projects-projectId-servers-serverId-session",
                    component: () => import("@/pages/projects/_projectId/servers/_serverId/session/index.vue"),
                    props: true
                  },
                  {
                    path: ":sessionId",
                    name: "projects-projectId-servers-serverId-session-sessionId",
                    component: () => import("@/pages/projects/_projectId/servers/_serverId/session/_sessionId.vue"),
                    props: true
                  }
                ]
              },
              {
                path: "activity",
                name: "projects-projectId-servers-serverId-activity",
                component: () => import("@/pages/projects/_projectId/servers/_serverId/activity.vue"),
                props: true
              },
              {
                path: "firewall",
                name: "projects-projectId-servers-serverId-firewall",
                component: () => import("@/pages/projects/_projectId/servers/_serverId/firewall.vue"),
                props: true
              },
              {
                path: "setting",
                name: "projects-projectId-servers-serverId-setting",
                component: () => import("@/pages/projects/_projectId/servers/_serverId/setting.vue"),
                props: true
              },
              {
                path: "destroy",
                name: "projects-projectId-servers-serverId-destroy",
                component: () => import("@/pages/projects/_projectId/servers/_serverId/destroy.vue"),
                props: true
              }
            ]
          }
        ]
      }
    ]
  }
];
