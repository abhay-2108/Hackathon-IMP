export async function GET() {
  // We don't load a Python model here. Report that app is healthy but model isn't loaded.
  return Response.json({
    status: "healthy",
    message: "Next.js API running",
    model_loaded: false
  });
}


