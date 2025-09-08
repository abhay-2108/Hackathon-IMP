import { spawn } from "child_process";

export async function POST(request) {
  try {
    const body = await request.json();

    const py = process.env.PYTHON_PATH || "python";
    const script = process.cwd() + "/python/predict.py";

    const result = await new Promise((resolve) => {
      const child = spawn(py, [script], { stdio: ["pipe", "pipe", "pipe"], env: { ...process.env, PYTHONPATH: (process.env.PYTHONPATH ? process.env.PYTHONPATH + ":" : "") + (process.cwd() + "/python_modules") } });
      let out = "";
      let err = "";
      child.stdout.on("data", (d) => (out += d.toString()));
      child.stderr.on("data", (d) => (err += d.toString()));
      child.on("close", (code) => {
        resolve({ code, out, err });
      });
      child.stdin.write(JSON.stringify(body));
      child.stdin.end();
    });

    try {
      const json = JSON.parse(result.out || "{}");
      if (json.error) {
        return Response.json(json, { status: 500 });
      }
      return Response.json(json);
    } catch (e) {
      return Response.json({ error: "invalid JSON from python", detail: result.out || result.err }, { status: 500 });
    }
  } catch (e) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}


