// 生成24小时专属测试链接
const REAL_TEST_URL = "https://mbtitest-2.pages.dev";
const EXPIRE_SECONDS = 24 * 60 * 60;

export async function onRequestGet(context) {
  const token = crypto.randomUUID().replace(/-/g, "").slice(0, 16);
  const expireAt = Math.floor(Date.now() / 1000) + EXPIRE_SECONDS;
  
  await context.env.temp_links.put(`token:${token}`, expireAt.toString(), {
    expirationTtl: EXPIRE_SECONDS
  });
  
  const userLink = `${context.request.url.split("/generate")[0]}/test/${token}`;
  
  return new Response(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>专属测试链接生成</title>
  <style>
    body { font-family: PingFang SC, Microsoft Yahei, sans-serif; padding: 20px; }
    h2 { color: #6b4c9a; margin-bottom: 20px; }
    .link-box { background: #f3edf5; padding: 15px; border-radius: 8px; margin-bottom: 15px; }
    .link { color: #6b4c9a; font-weight: bold; word-break: break-all; }
    .expire { color: #ed8936; margin-top: 15px; font-size: 14px; }
  </style>
</head>
<body>
  <h2>✅ 专属24小时测试链接生成成功！</h2>
  <div class="link-box">
    <span class="link">${userLink}</span>
  </div>
  <div class="expire">⏰ 过期时间: ${new Date(expireAt * 1000).toLocaleString()}</div>
</body>
</html>
  `, { headers: { "Content-Type": "text/html;charset=utf-8" } });
}