export class ApiResponseDto<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta?: TMeta;

  public static success<TData = unknown>(
    message: string,
    data?: TData,
    meta?: TMeta,
  ) {
    return {
      success: true,
      message,
      ...(data && { data }),
      ...(meta && { meta }),
    };
  }

  public static error(message: string) {
    return {
      success: false,
      message,
    };
  }
}

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};
