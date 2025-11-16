import React, { useEffect, useState } from 'react'
import { set, useFormValue, useClient } from 'sanity'
import { Button, Stack, TextInput, Flex, Text } from '@sanity/ui'

export const SKUInput = React.forwardRef((props: any, ref: any) => {
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
  const codeRef = useFormValue(['code']) as any
  const variantRef = useFormValue(['variant']) as any
  const client = useClient({ apiVersion: '2025-09-12' })
  const [codeValue, setCodeValue] = useState('')
  const [variantValue, setVariantValue] = useState('')

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

  const generateSKU = () => {
    if (codeValue && variantValue) {
      const sku = `EX-${codeValue}-${variantValue}`
      onChange(set(sku))
    }
  }

  const canGenerate = codeValue && variantValue

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
          onClick={generateSKU}
          disabled={!canGenerate}
        />
      </Flex>
      {!canGenerate && (
        <Text size={1} muted>
          Please select Code and Variant first to generate SKU
        </Text>
      )}
    </Stack>
  )
})

SKUInput.displayName = 'SKUInput'

