import React, { useEffect, useState } from 'react'
import { set, useFormValue, useClient } from 'sanity'
import { Button, Stack, TextInput, Flex, Text } from '@sanity/ui'

export const ProductCodeInput = React.forwardRef((props: any, ref: any) => {
  const { 
    value, 
    onChange,
    // Filter out Sanity-specific props that shouldn't be passed to DOM elements
    schemaType,
    elementProps,
    renderDefault,
    __unstable_computeDiff,
    changed,
    focused,
    ...restProps
  } = props
  const titleRef = useFormValue(['title']) as string
  const codeRef = useFormValue(['code']) as any
  const materialsRef = useFormValue(['materials']) as any[]
  const variantRef = useFormValue(['variant']) as any
  const client = useClient({ apiVersion: '2025-09-12' })
  const [codeValue, setCodeValue] = useState('')
  const [materialValue, setMaterialValue] = useState('')
  const [variantValue, setVariantValue] = useState('')

  // Get first 3 letters of title
  const titlePrefix = titleRef 
    ? titleRef.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, '') || 'XXX'
    : 'XXX'

  // Resolve code reference
  useEffect(() => {
    if (codeRef?._ref) {
      client
        .fetch('*[_id == $id][0]', { id: codeRef._ref })
        .then((doc: any) => {
          if (doc) setCodeValue(doc.value || '')
        })
        .catch(() => setCodeValue(''))
    } else {
      setCodeValue('')
    }
  }, [codeRef, client])

  // Resolve first material reference
  useEffect(() => {
    if (materialsRef && Array.isArray(materialsRef) && materialsRef.length > 0) {
      const firstMaterial = materialsRef[0]
      if (firstMaterial?._ref) {
        client
          .fetch('*[_id == $id][0]', { id: firstMaterial._ref })
          .then((doc: any) => {
            if (doc) {
              const materialName = doc.name || ''
              setMaterialValue(materialName.charAt(0).toUpperCase() || '')
            }
          })
          .catch(() => setMaterialValue(''))
      } else {
        setMaterialValue('')
      }
    } else {
      setMaterialValue('')
    }
  }, [materialsRef, client])

  // Resolve variant reference
  useEffect(() => {
    if (variantRef?._ref) {
      client
        .fetch('*[_id == $id][0]', { id: variantRef._ref })
        .then((doc: any) => {
          if (doc) setVariantValue(doc.name || '')
        })
        .catch(() => setVariantValue(''))
    } else {
      setVariantValue('')
    }
  }, [variantRef, client])

  const generateProductCode = () => {
    if (codeValue && materialValue && variantValue && titleRef) {
      const productCode = `EX-${titlePrefix}-${codeValue}-${materialValue}-${variantValue}`
      onChange(set(productCode))
    }
  }

  const canGenerate = titleRef && codeValue && materialValue && variantValue

  return (
    <Stack space={3}>
      <Flex gap={2} align="flex-end">
        <div style={{ flex: 1 }}>
          <TextInput
            ref={ref}
            {...restProps}
            value={value || ''}
            onChange={(event: any) => onChange(set(event.currentTarget.value))}
          />
        </div>
        <Button
          text="Generate"
          tone="primary"
          onClick={generateProductCode}
          disabled={!canGenerate}
        />
      </Flex>
      {!canGenerate && (
        <Text size={1} muted>
          Please fill Title, Code, Material, and Variant first to generate Product Code
        </Text>
      )}
    </Stack>
  )
})

ProductCodeInput.displayName = 'ProductCodeInput'

