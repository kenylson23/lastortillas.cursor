#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🏗️  Building for production...');

try {
  // Clean dist directory
  console.log('🧹 Cleaning dist directory...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // Build client
  console.log('📦 Building client...');
  execSync('npm run build', { stdio: 'inherit' });

  // Check if build was successful
  if (!fs.existsSync('dist')) {
    throw new Error('Build failed - dist directory not created');
  }

  console.log('✅ Build completed successfully!');
  console.log('🚀 To start production server: npm run start');
  console.log('🔧 To start development server: npm run start:dev');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} 