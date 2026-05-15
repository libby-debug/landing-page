#!/usr/bin/env node
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

const demoEmail = "demo@abamastered.com";
const demoPassword = "DemoAccess2026!";

function loadEnvFile(fileName) {
  const filePath = resolve(process.cwd(), fileName);

  if (!existsSync(filePath)) {
    return;
  }

  const file = readFileSync(filePath, "utf8");

  for (const line of file.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const [rawKey, ...rawValueParts] = trimmed.split("=");
    const key = rawKey.trim();
    const rawValue = rawValueParts.join("=").trim();
    const value = rawValue.replace(/^['"]|['"]$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing required Supabase admin env vars: NEXT_PUBLIC_SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY.",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function findUserByEmail(email) {
  let page = 1;
  const perPage = 1000;

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage,
    });

    if (error) {
      throw error;
    }

    const user = data.users.find(
      (candidate) => candidate.email?.toLowerCase() === email.toLowerCase(),
    );

    if (user) {
      return user;
    }

    if (data.users.length < perPage) {
      return null;
    }

    page += 1;
  }
}

const studentMetadata = {
  is_demo_account: true,
  role: "student",
};

const existingUser = await findUserByEmail(demoEmail);

if (existingUser) {
  const { error } = await supabase.auth.admin.updateUserById(existingUser.id, {
    app_metadata: studentMetadata,
    email_confirm: true,
    password: demoPassword,
    user_metadata: studentMetadata,
  });

  if (error) {
    throw error;
  }

  console.log(`Demo student account updated: ${demoEmail}`);
} else {
  const { error } = await supabase.auth.admin.createUser({
    app_metadata: studentMetadata,
    email: demoEmail,
    email_confirm: true,
    password: demoPassword,
    user_metadata: studentMetadata,
  });

  if (error) {
    throw error;
  }

  console.log(`Demo student account created: ${demoEmail}`);
}

console.log("Role metadata set to student. No admin/developer permissions were granted.");
