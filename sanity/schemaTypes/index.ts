import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import order from './order'
import banner from './banner'
import category from './category'
import subCategory from './subCategory'
import storeSettings from './storeSettings'
import variant from './variant'
import color from './color'
import material from './material'
import tipShape from './tipShape'
import code from './code'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, subCategory, product, order, banner, storeSettings, variant, color, material, tipShape, code],
}
