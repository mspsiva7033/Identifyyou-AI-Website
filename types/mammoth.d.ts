declare module 'mammoth' {
  export interface ConversionResult {
    value: string
    messages: Array<{ type: string; message: string }>
  }
  export interface ConvertOptions {
    path?: string
    buffer?: Buffer
  }
  export function convertToHtml(input: ConvertOptions): Promise<ConversionResult>
  export function extractRawText(input: ConvertOptions): Promise<ConversionResult>
}
