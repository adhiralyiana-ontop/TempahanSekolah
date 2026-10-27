import { test } from "node:test";
import assert from "node:assert/strict";
import { buildDemoContactHref } from "../../src/lib/demo-contact.ts";
for (const [label, value] of [
  ["missing", undefined],
  ["blank", " "],
  ["double local dot", "a..b@example.com"],
  ["leading dot", ".demo@example.com"],
  ["trailing dot", "demo.@example.com"],
  ["invalid domain label", "d@a.-b.com"],
  ["empty domain label", "d@school..com"],
  ["CRLF injection", "demo@example.com\r\nBcc:other@example.com"],
  ["multiple recipients", "demo@example.com,other@example.com"],
  ["header query injection", "demo@example.com?bcc=other@example.com"],
  ["long local part", "a".repeat(65) + "@example.com"],
  ["long label", "d@" + "a".repeat(64) + ".com"],
  [
    "long total",
    "a".repeat(64) +
      "@" +
      ["b".repeat(63), "c".repeat(63), "d".repeat(63), "example.com"].join("."),
  ],
])
  test("rejects " + label, () =>
    assert.equal(buildDemoContactHref(value), null),
  );
test("valid draft encodes special local characters and preserves fixed headers", () => {
  const href = buildDemoContactHref("  school+demo@example.com  ");
  const url = new URL(href);
  assert.equal(decodeURIComponent(url.pathname), "school+demo@example.com");
  assert.deepEqual([...url.searchParams.keys()], ["subject", "body"]);
  assert.equal(url.hash, "");
});
test("valid subdomain is accepted", () =>
  assert.ok(buildDemoContactHref("demo@staff.school.edu.my")));
