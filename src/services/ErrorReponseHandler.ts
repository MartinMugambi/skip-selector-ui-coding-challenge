class ErrorResponseHandler {
  constructor(
    public readonly success: boolean = false,
    public readonly status: number = 500,
    public readonly error: any,
    public readonly message: string = "Errror Message"
  ) {}
}

export default ErrorResponseHandler;
