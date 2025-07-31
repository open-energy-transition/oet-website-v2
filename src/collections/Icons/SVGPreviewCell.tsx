import React from 'react'
import type {
  PayloadComponent,
  DefaultServerCellComponentProps,
  DefaultCellComponentProps,
} from 'payload'

export const SVGPreviewCell: PayloadComponent<
  DefaultServerCellComponentProps,
  DefaultCellComponentProps
> = (props: DefaultCellComponentProps) => (
  <div
    style={{ width: 32, height: 32 }}
    dangerouslySetInnerHTML={{ __html: props.cellData as string }}
  />
)
