export async function POST(req) {
  const { cmd } = await req.json();

  // --- Konfigurasi API LifeSmart ---
  const svrurl = "https://api.us.ilifesmart.com/app"; // hasil login kamu
  const userid = "8454384";
  const appkey = "Eelqq35AhqflPPvMhDzpw";
  const usertoken = "we3n8Xbawgh0puUmsQGbAQ";
  const agt = "AzUAANRMgwEAAAdPGgz__w"; // gateway
  const dev = "0001"; // Nature 123 device ID

  // --- Siapkan body request ---
  const body = {
    id: 101,
    method: "/api.EpAdd",
    system: {
      ver: "1.0",
      lang: "en",
      userid,
      appkey,
      token: usertoken,
      time: Math.floor(Date.now() / 1000),
    },
    params: {
      agt,
      dev,
      type: "SL_NATURE",
      cmd, // "open" atau "close"
    },
  };

  try {
    const res = await fetch(`${svrurl}/api.EpAdd`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error controlling device:", error);
    return Response.json({ status: "error", message: error.message });
  }
}
