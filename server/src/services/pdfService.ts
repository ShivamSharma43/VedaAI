export async function generatePdfBuffer(assignment: any): Promise<Buffer> {
  const html = renderHtml(assignment);
  const isProd = process.env.NODE_ENV === "production";

  let browser: any;
  if (isProd) {
    const puppeteer = (await import("puppeteer-core")).default;
    const chromium = (await import("@sparticuz/chromium")).default;
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  } else {
    const puppeteer = (await import("puppeteer")).default;
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", bottom: "20mm", left: "18mm", right: "18mm" },
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}

function badge(d: string): string {
  const c =
    d === "easy"
      ? "#16a34a"
      : d === "medium"
      ? "#ca8a04"
      : "#dc2626";
  return `<span style="background:${c};color:white;padding:2px 8px;border-radius:9999px;font-size:10px;text-transform:uppercase;">${d}</span>`;
}

function renderHtml(a: any): string {
  const sections = (a.generatedPaper?.sections ?? [])
    .map(
      (s: any) => `
    <section style="margin-top:24px;">
      <h2 style="font-size:18px;border-bottom:2px solid #111;padding-bottom:4px;">${s.title}</h2>
      <p style="font-style:italic;color:#444;">${s.instruction}</p>
      <ol style="padding-left:20px;">
        ${s.questions
          .map(
            (q: any) => `
          <li style="margin:14px 0;">
            <div>${q.text}</div>
            <div style="margin-top:4px;font-size:12px;">
              ${badge(q.difficulty)}
              <span style="margin-left:8px;color:#555;">[${q.marks} marks · ${q.type}]</span>
            </div>
          </li>`
          )
          .join("")}
      </ol>
    </section>`
    )
    .join("");

  return `<!doctype html><html><head><meta charset="utf-8"><style>
  body{font-family:'Times New Roman',serif;color:#111;}
  .head{text-align:center;border-bottom:3px double #111;padding-bottom:10px;}
  .meta{display:flex;justify-content:space-between;margin:18px 0;font-size:13px;}
  </style></head><body>
    <div class="head">
      <h1 style="margin:0;">${a.title}</h1>
      <div>${a.subject} · Total Marks: ${a.config.totalMarks}</div>
    </div>
    <div class="meta">
      <div>Name: __________________________</div>
      <div>Roll No: ____________</div>
      <div>Section: ____</div>
    </div>
    ${sections}
  </body></html>`;
}