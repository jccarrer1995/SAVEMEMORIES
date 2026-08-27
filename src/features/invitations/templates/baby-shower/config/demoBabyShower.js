import { createDefaultBabyShowerContent, buildBabyShowerProjectConfig } from '../../../../admin/data/defaultBabyShowerContent.js'

const content = createDefaultBabyShowerContent()

export const demoBabyShowerProject = buildBabyShowerProjectConfig(
  'demo-baby-shower',
  'Baby Shower · Emma',
  content,
)
