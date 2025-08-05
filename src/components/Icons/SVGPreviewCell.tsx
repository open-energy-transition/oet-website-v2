import React from 'react'
import type {
  PayloadComponent,
  DefaultServerCellComponentProps,
  DefaultCellComponentProps,
} from 'payload'

const SVGPreviewCell: any = (props: DefaultCellComponentProps) => (
  <div
    style={{ width: 32, height: 32 }}
    dangerouslySetInnerHTML={{ __html: props.cellData as string }}
  />
)

export default SVGPreviewCell
