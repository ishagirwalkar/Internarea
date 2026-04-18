declare module 'mammoth/mammoth.browser' {
  type ExtractRawTextOptions = {
    arrayBuffer: ArrayBuffer;
  };

  type ExtractRawTextResult = {
    value: string;
    messages: Array<{
      type: string;
      message: string;
    }>;
  };

  const mammoth: {
    extractRawText(options: ExtractRawTextOptions): Promise<ExtractRawTextResult>;
  };

  export default mammoth;
}