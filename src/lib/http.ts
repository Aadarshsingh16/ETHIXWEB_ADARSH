export class HttpError extends Error {
  constructor(
    public status: number,
    public code: string,
    message?: string,
    public fields?: Record<string, string>
  ) {
    super(message ?? code);
    this.name = "HttpError";
  }
}

export function ok<T>(data: T, status = 200) {
  return Response.json({ ok: true, data }, { status });
}

export function fail(error: unknown) {
  if (error instanceof HttpError) {
    return Response.json(
      {
        ok: false,
        error: {
          code: error.code,
          message: error.message,
          fields: error.fields,
        },
      },
      { status: error.status }
    );
  }

  console.error("Unhandled API error:", error);

  return Response.json(
    {
      ok: false,
      error: {
        code: "server_error",
        message: "Something went wrong. Please try again or reach out on WhatsApp.",
      },
    },
    { status: 500 }
  );
}
