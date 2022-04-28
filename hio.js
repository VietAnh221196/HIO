import Layout from '@/layout'

const hioRouter = {
  path: '/hio',
  component: Layout,
  redirect: '/hio/list',
  name: 'HIO',
  meta: {
    title: 'Quản ký bảo hiểm',
    icon: 'hio'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/hio/purchase-history/index'),
      name: 'List HIO',
      meta: { title: 'Danh sách mua bảo hiểm' }
    },
    {
      path: 'list-order',
      component: () => import('@/views/hio/order-history/index'),
      name: 'List order HIO',
      meta: { title: 'Danh sách order bảo hiểm' }
    },
    {
      path: 'list-annual',
      component: () => import('@/views/hio/annual-insurance/index'),
      name: 'List annual HIO',
      meta: { title: 'Bảo hiểm theo năm' }
    },
    {
      path: 'check',
      component: () => import('@/views/hio/check-annual-insurance/index'),
      name: 'Check annual HIO',
      meta: { title: 'Check bảo hiểm năm' }
    },
    {
      path: 'identifier',
      component: () => import('@/views/hio/identifier-list/index'),
      name: 'Identifier list',
      meta: { title: 'Danh sách định danh' }
    }

  ]
}

export { hioRouter as default }
