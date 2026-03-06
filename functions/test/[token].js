// 验证测试链接并跳转到测试页
export async function onRequestGet(context) {
  const token = context.params.token;
  if (!token) {
    return new Response("<h1>❌ 链接错误</h1>", {
      headers: { "Content-Type": "text/html;charset=utf-8" }
    });
  }

  const expireAtStr = await context.env.temp_links.get(`token:${token}`);
  if (!expireAtStr) {
    return new Response("<h1>❌ 链接不存在或已过期</h1>", {
      headers: { "Content-Type": "text/html;charset=utf-8" }
    });
  }

  const expireAt = parseInt(expireAtStr);
  const now = Math.floor(Date.now() / 1000);
  if (now > expireAt) {
    return new Response("<h1>❌ 链接已过期</h1>", {
      headers: { "Content-Type": "text/html;charset=utf-8" }
    });
  }

  // 验证通过，跳转到你的测试页
  return Response.redirect("https://mbtitest-2.pages.dev", 302);
}