/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DashboardIndexImport } from './routes/dashboard/index'
import { Route as DashboardAuthenticatedRouteImport } from './routes/dashboard/_authenticated/route'
import { Route as authAuthRouteImport } from './routes/(auth)/auth/route'
import { Route as authAuthLoginImport } from './routes/(auth)/auth/login'

// Create Virtual Routes

const DashboardImport = createFileRoute('/dashboard')()
const IndexLazyImport = createFileRoute('/')()
const NewsIdLazyImport = createFileRoute('/news/$id')()
const DashboardAuthenticatedNewsLazyImport = createFileRoute(
  '/dashboard/_authenticated/news',
)()
const DashboardAuthenticatedHomeLazyImport = createFileRoute(
  '/dashboard/_authenticated/home',
)()

// Create/Update Routes

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const DashboardIndexRoute = DashboardIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DashboardRoute,
} as any)

const NewsIdLazyRoute = NewsIdLazyImport.update({
  id: '/news/$id',
  path: '/news/$id',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/news/$id.lazy').then((d) => d.Route))

const DashboardAuthenticatedRouteRoute =
  DashboardAuthenticatedRouteImport.update({
    id: '/_authenticated',
    getParentRoute: () => DashboardRoute,
  } as any)

const authAuthRouteRoute = authAuthRouteImport.update({
  id: '/(auth)/auth',
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const DashboardAuthenticatedNewsLazyRoute =
  DashboardAuthenticatedNewsLazyImport.update({
    id: '/news',
    path: '/news',
    getParentRoute: () => DashboardAuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./routes/dashboard/_authenticated/news.lazy').then((d) => d.Route),
  )

const DashboardAuthenticatedHomeLazyRoute =
  DashboardAuthenticatedHomeLazyImport.update({
    id: '/home',
    path: '/home',
    getParentRoute: () => DashboardAuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./routes/dashboard/_authenticated/home.lazy').then((d) => d.Route),
  )

const authAuthLoginRoute = authAuthLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => authAuthRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/auth': {
      id: '/(auth)/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof authAuthRouteImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/_authenticated': {
      id: '/dashboard/_authenticated'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardAuthenticatedRouteImport
      parentRoute: typeof DashboardRoute
    }
    '/news/$id': {
      id: '/news/$id'
      path: '/news/$id'
      fullPath: '/news/$id'
      preLoaderRoute: typeof NewsIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/': {
      id: '/dashboard/'
      path: '/'
      fullPath: '/dashboard/'
      preLoaderRoute: typeof DashboardIndexImport
      parentRoute: typeof DashboardImport
    }
    '/(auth)/auth/login': {
      id: '/(auth)/auth/login'
      path: '/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof authAuthLoginImport
      parentRoute: typeof authAuthRouteImport
    }
    '/dashboard/_authenticated/home': {
      id: '/dashboard/_authenticated/home'
      path: '/home'
      fullPath: '/dashboard/home'
      preLoaderRoute: typeof DashboardAuthenticatedHomeLazyImport
      parentRoute: typeof DashboardAuthenticatedRouteImport
    }
    '/dashboard/_authenticated/news': {
      id: '/dashboard/_authenticated/news'
      path: '/news'
      fullPath: '/dashboard/news'
      preLoaderRoute: typeof DashboardAuthenticatedNewsLazyImport
      parentRoute: typeof DashboardAuthenticatedRouteImport
    }
  }
}

// Create and export the route tree

interface authAuthRouteRouteChildren {
  authAuthLoginRoute: typeof authAuthLoginRoute
}

const authAuthRouteRouteChildren: authAuthRouteRouteChildren = {
  authAuthLoginRoute: authAuthLoginRoute,
}

const authAuthRouteRouteWithChildren = authAuthRouteRoute._addFileChildren(
  authAuthRouteRouteChildren,
)

interface DashboardAuthenticatedRouteRouteChildren {
  DashboardAuthenticatedHomeLazyRoute: typeof DashboardAuthenticatedHomeLazyRoute
  DashboardAuthenticatedNewsLazyRoute: typeof DashboardAuthenticatedNewsLazyRoute
}

const DashboardAuthenticatedRouteRouteChildren: DashboardAuthenticatedRouteRouteChildren =
  {
    DashboardAuthenticatedHomeLazyRoute: DashboardAuthenticatedHomeLazyRoute,
    DashboardAuthenticatedNewsLazyRoute: DashboardAuthenticatedNewsLazyRoute,
  }

const DashboardAuthenticatedRouteRouteWithChildren =
  DashboardAuthenticatedRouteRoute._addFileChildren(
    DashboardAuthenticatedRouteRouteChildren,
  )

interface DashboardRouteChildren {
  DashboardAuthenticatedRouteRoute: typeof DashboardAuthenticatedRouteRouteWithChildren
  DashboardIndexRoute: typeof DashboardIndexRoute
}

const DashboardRouteChildren: DashboardRouteChildren = {
  DashboardAuthenticatedRouteRoute:
    DashboardAuthenticatedRouteRouteWithChildren,
  DashboardIndexRoute: DashboardIndexRoute,
}

const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/auth': typeof authAuthRouteRouteWithChildren
  '/dashboard': typeof DashboardAuthenticatedRouteRouteWithChildren
  '/news/$id': typeof NewsIdLazyRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/auth/login': typeof authAuthLoginRoute
  '/dashboard/home': typeof DashboardAuthenticatedHomeLazyRoute
  '/dashboard/news': typeof DashboardAuthenticatedNewsLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/auth': typeof authAuthRouteRouteWithChildren
  '/dashboard': typeof DashboardIndexRoute
  '/news/$id': typeof NewsIdLazyRoute
  '/auth/login': typeof authAuthLoginRoute
  '/dashboard/home': typeof DashboardAuthenticatedHomeLazyRoute
  '/dashboard/news': typeof DashboardAuthenticatedNewsLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/(auth)/auth': typeof authAuthRouteRouteWithChildren
  '/dashboard': typeof DashboardRouteWithChildren
  '/dashboard/_authenticated': typeof DashboardAuthenticatedRouteRouteWithChildren
  '/news/$id': typeof NewsIdLazyRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/(auth)/auth/login': typeof authAuthLoginRoute
  '/dashboard/_authenticated/home': typeof DashboardAuthenticatedHomeLazyRoute
  '/dashboard/_authenticated/news': typeof DashboardAuthenticatedNewsLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/auth'
    | '/dashboard'
    | '/news/$id'
    | '/dashboard/'
    | '/auth/login'
    | '/dashboard/home'
    | '/dashboard/news'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/auth'
    | '/dashboard'
    | '/news/$id'
    | '/auth/login'
    | '/dashboard/home'
    | '/dashboard/news'
  id:
    | '__root__'
    | '/'
    | '/(auth)/auth'
    | '/dashboard'
    | '/dashboard/_authenticated'
    | '/news/$id'
    | '/dashboard/'
    | '/(auth)/auth/login'
    | '/dashboard/_authenticated/home'
    | '/dashboard/_authenticated/news'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  authAuthRouteRoute: typeof authAuthRouteRouteWithChildren
  DashboardRoute: typeof DashboardRouteWithChildren
  NewsIdLazyRoute: typeof NewsIdLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  authAuthRouteRoute: authAuthRouteRouteWithChildren,
  DashboardRoute: DashboardRouteWithChildren,
  NewsIdLazyRoute: NewsIdLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/(auth)/auth",
        "/dashboard",
        "/news/$id"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/(auth)/auth": {
      "filePath": "(auth)/auth/route.tsx",
      "children": [
        "/(auth)/auth/login"
      ]
    },
    "/dashboard": {
      "filePath": "dashboard/_authenticated",
      "children": [
        "/dashboard/_authenticated",
        "/dashboard/"
      ]
    },
    "/dashboard/_authenticated": {
      "filePath": "dashboard/_authenticated/route.tsx",
      "parent": "/dashboard",
      "children": [
        "/dashboard/_authenticated/home",
        "/dashboard/_authenticated/news"
      ]
    },
    "/news/$id": {
      "filePath": "news/$id.lazy.tsx"
    },
    "/dashboard/": {
      "filePath": "dashboard/index.tsx",
      "parent": "/dashboard"
    },
    "/(auth)/auth/login": {
      "filePath": "(auth)/auth/login.tsx",
      "parent": "/(auth)/auth"
    },
    "/dashboard/_authenticated/home": {
      "filePath": "dashboard/_authenticated/home.lazy.tsx",
      "parent": "/dashboard/_authenticated"
    },
    "/dashboard/_authenticated/news": {
      "filePath": "dashboard/_authenticated/news.lazy.tsx",
      "parent": "/dashboard/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
