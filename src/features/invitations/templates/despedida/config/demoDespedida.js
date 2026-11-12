import {
  buildDespedidaProjectConfig,
  createDefaultDespedidaContent,
} from '../../../../admin/data/defaultDespedidaContent.js'

export const demoDespedidaProject = buildDespedidaProjectConfig(
  'demo-despedida',
  'Despedida de soltera · Valentina',
  createDefaultDespedidaContent(),
)
