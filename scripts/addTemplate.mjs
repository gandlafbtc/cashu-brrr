#!/usr/bin/env node

/**
 * Add Template Script
 * Validates and adds a new template in one step
 * Usage: npm run addTemplate <template-file.json>
 */

import { readdir, readFile, writeFile, copyFile } from 'fs/promises';
import { basename, extname } from 'path';

const TEMPLATES_DIR = 'public/mountainlake-templates';
const TEMPLATES_FILE = 'src/features/templates/mountainlake/mountainlake-templates.ts';

// Get template file from command line args
const templateFile = process.argv[2];
const isDryRun = process.argv.includes('--dry-run');

if (!templateFile) {
  console.error('❌ Please provide a template file');
  console.log('Usage: npm run addTemplate <template-file.json> [--dry-run]');
  process.exit(1);
}

async function addTemplate() {
  try {
    console.log('🏔️ Adding template...');
    
    // 1. Validate template file
    console.log(`📋 Validating ${templateFile}...`);
    
    const templateData = JSON.parse(await readFile(templateFile, 'utf-8'));
    
    // Check required fields
    const required = ['name', 'description', 'author', 'version', 'front', 'back'];
    const missing = required.filter(field => !templateData[field]);
    
    if (missing.length > 0) {
      console.error(`❌ Missing required fields: ${missing.join(', ')}`);
      process.exit(1);
    }
    
    // Check for blob URLs
    const jsonStr = JSON.stringify(templateData);
    if (jsonStr.includes('blob:')) {
      console.error('❌ Template contains blob: URLs. Please re-export with embedded images.');
      process.exit(1);
    }
    
    console.log('✅ Template is valid');
    
    if (isDryRun) {
      console.log('🔍 Dry run mode - validation only, no files modified');
      console.log(`✅ Template "${templateData.name}" would be valid for addition`);
      return;
    }
    
    // 2. Generate filename
    const safeName = templateData.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    const filename = `${safeName}.mountainlake.json`;
    const targetPath = `${TEMPLATES_DIR}/${filename}`;
    
    console.log(`📁 Target: ${filename}`);
    
    // 3. Copy template file
    await copyFile(templateFile, targetPath);
    console.log(`✅ Copied to ${targetPath}`);
    
    // 4. Update template list
    console.log('🔄 Updating template list...');
    
    const files = await readdir(TEMPLATES_DIR);
    const templateFiles = files
      .filter(file => file.endsWith('.mountainlake.json'))
      .sort();
    
    const templatesContent = await readFile(TEMPLATES_FILE, 'utf-8');
    const arrayRegex = /(const templateFiles = \[)([\s\S]*?)(\];)/;
    
    const newArrayContent = templateFiles
      .map(file => `      '${file}',`)
      .join('\n');
    
    const newContent = templatesContent.replace(
      arrayRegex,
      `$1\n${newArrayContent}\n      // Add more template files here as they are added to the public folder\n      // This list is automatically updated by running: npm run addTemplate\n    $3`
    );
    
    await writeFile(TEMPLATES_FILE, newContent, 'utf-8');
    
    console.log('✅ Template list updated');
    console.log('');
    console.log(`🎉 Template "${templateData.name}" by ${templateData.author} added successfully!`);
    console.log(`📝 Description: ${templateData.description}`);
    console.log('');
    console.log('Ready to test in your application.');
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`❌ File not found: ${templateFile}`);
    } else if (error.name === 'SyntaxError') {
      console.error(`❌ Invalid JSON in ${templateFile}`);
    } else {
      console.error(`❌ Error: ${error.message}`);
    }
    process.exit(1);
  }
}

addTemplate();