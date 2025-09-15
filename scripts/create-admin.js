#!/usr/bin/env node

/**
 * Script to create an admin user in Firebase
 * Usage: node scripts/create-admin.js email@example.com password123 super_admin
 */

const admin = require('firebase-admin');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initialize Firebase Admin SDK
// You'll need to download your service account key from Firebase Console
// Project Settings > Service Accounts > Generate New Private Key
const serviceAccount = require('../firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();
const db = admin.firestore();

async function createAdminUser() {
  console.log('\n=== Create Admin User for O.P. Veteran ===\n');

  const email = await question('Email: ');
  const password = await question('Password (min 6 characters): ');
  const displayName = await question('Display Name: ');
  const role = await question('Role (super_admin/admin/editor/viewer): ');

  try {
    // Create the user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
      emailVerified: true,
    });

    console.log('\nUser created in Firebase Auth:', userRecord.uid);

    // Add user to admin_users collection
    await db.collection('admin_users').doc(userRecord.uid).set({
      email,
      displayName,
      role,
      isActive: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log('\nAdmin user created successfully!');
    console.log('Email:', email);
    console.log('Role:', role);
    console.log('UID:', userRecord.uid);
    console.log('\nYou can now login at: /admin/login');

  } catch (error) {
    console.error('\nError creating admin user:', error.message);
  }

  rl.close();
  process.exit(0);
}

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// Run the script
createAdminUser();