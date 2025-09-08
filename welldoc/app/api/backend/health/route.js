import { spawn } from "child_process";

export async function GET() {
  // Ask the python helper whether the model file is present and loadable
  const py = process.env.PYTHON_PATH || "python";
  const script = process.cwd() + "/python/predict.py";

  const result = await new Promise((resolve) => {
    const child = spawn(py, [script], { stdio: ["pipe", "pipe", "pipe"] });
    let out = "";
    let err = "";
    child.stdout.on("data", (d) => (out += d.toString()));
    child.stderr.on("data", (d) => (err += d.toString()));
    child.on("close", (code) => {
      resolve({ code, out, err });
    });
    // pass empty JSON, script will only attempt to load the model and then try predicting with zeros
    child.stdin.write("{}");
    child.stdin.end();
  });

  let model_loaded = true;
  try {
    const json = JSON.parse(result.out || "{}");
    if (json && json.error) model_loaded = false;
  } catch {
    model_loaded = false;
  }

  return Response.json({
    status: "healthy",
    message: model_loaded ? "Model loaded" : "Model not loaded",
    model_loaded
  });
}


