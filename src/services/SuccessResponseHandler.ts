class SuccessResponseHandler {
  constructor(
    public readonly success: boolean = true,
    public readonly statusCode: number,
    public readonly data: any,
    public readonly message: string = "Data Fetched Successfully"
  ) {}
}

export default SuccessResponseHandler;
