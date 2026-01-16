#!/usr/bin/env node

/**
 * Figma Design Token Sync Script
 *
 * Fetches design tokens (colors, typography) from Figma and updates local files.
 *
 * Usage:
 *   node sync-design-tokens.js
 *
 * Environment:
 *   FIGMA_TOKEN - Personal access token from Figma
 *   FIGMA_FILE_ID - File ID (default: vFzy38cYS83Xj5CCqdTvi4)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID || 'vFzy38cYS83Xj5CCqdTvi4';
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

if (!FIGMA_TOKEN) {
  console.error('❌ Error: FIGMA_TOKEN environment variable is required');
  console.error('   Set it with: export FIGMA_TOKEN="your_token_here"');
  process.exit(1);
}

/**
 * Fetch data from Figma API
 */
function fetchFigma(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.figma.com',
      path: endpoint,
      method: 'GET',
      headers: {
        'X-Figma-Token': FIGMA_TOKEN
      }
    };

    https.get(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Failed to parse JSON: ${e.message}`));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Convert RGB (0-1) to hex
 */
function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Walk the document tree to find nodes and extract their colors
 */
function walkNodes(node, callback) {
  callback(node);
  if (node.children) {
    for (const child of node.children) {
      walkNodes(child, callback);
    }
  }
}

/**
 * Extract color tokens from Figma document and styles
 */
function extractColorTokens(fileData) {
  const styles = fileData.styles || {};
  const styleMap = new Map();

  // Walk the document tree to find nodes with style IDs and their colors
  if (fileData.document) {
    walkNodes(fileData.document, (node) => {
      // Check if node has fills with colors
      if (node.fills && Array.isArray(node.fills)) {
        for (const fill of node.fills) {
          if (fill.type === 'SOLID' && fill.color) {
            // Check if this node uses a fill style
            const styleId = node.styles?.fill;
            if (styleId && styles[styleId]) {
              const style = styles[styleId];
              if (!styleMap.has(styleId)) {
                const { r, g, b, a } = fill.color;
                styleMap.set(styleId, {
                  id: styleId,
                  name: style.name,
                  description: style.description || '',
                  hex: rgbToHex(r, g, b),
                  rgb: { r, g, b, a }
                });
              }
            }
          }
        }
      }
    });
  }

  return Array.from(styleMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Generate Tailwind config snippet
 */
function generateTailwindConfig(colors) {
  const entries = colors.map(color => {
    const key = color.name
      .toLowerCase()
      .replace(/\//g, '-')
      .replace(/\s+/g, '-');
    return `            '${key}': '${color.hex}',`;
  });

  return `          colors: {
${entries.join('\n')}
          }`;
}

/**
 * Update a single HTML file with new design tokens
 */
function updateHtmlFile(filePath, colors) {
  if (!fs.existsSync(filePath)) {
    return false;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Check if this file has a Tailwind config
  if (!html.includes('tailwind.config')) {
    return false;
  }

  // Update the comment block with color values (only in index.html)
  if (filePath.endsWith('index.html')) {
    const colorList = colors.map(c => `      - ${c.name}: ${c.hex}`).join('\n');
    const commentBlock = `      CUSTOM STYLES - Figma Design System (Extracted from Figma API)
${colorList}`;

    html = html.replace(
      /CUSTOM STYLES - Figma Design System \(Extracted from Figma API\)[^*]*/,
      commentBlock + '\n    '
    );
  }

  // Update Tailwind config colors
  const tailwindColors = generateTailwindConfig(colors);
  html = html.replace(
    /colors:\s*\{[^}]*\}/s,
    tailwindColors
  );

  fs.writeFileSync(filePath, html, 'utf8');
  return true;
}

/**
 * Update ALL HTML files with new design tokens
 */
function updateAllHtmlFiles(colors) {
  const htmlFiles = fs.readdirSync(__dirname)
    .filter(file => file.endsWith('.html'))
    .map(file => path.join(__dirname, file));

  let updatedCount = 0;

  console.log('📄 Updating HTML files...');

  for (const filePath of htmlFiles) {
    const fileName = path.basename(filePath);
    if (updateHtmlFile(filePath, colors)) {
      console.log(`   ✅ ${fileName}`);
      updatedCount++;
    }
  }

  console.log(`✅ Updated ${updatedCount} HTML files with design tokens`);
  return updatedCount;
}

/**
 * Fetch colors from published library styles
 */
async function fetchPublishedColors(fileKey) {
  try {
    // Get list of published styles
    const stylesData = await fetchFigma(`/v1/files/${fileKey}/styles`);
    const fillStyles = stylesData.meta.styles.filter(s => s.style_type === 'FILL');

    if (fillStyles.length === 0) {
      return [];
    }

    // Fetch nodes for all fill styles to get color values
    const nodeIds = fillStyles.map(s => s.node_id).join(',');
    const nodesData = await fetchFigma(`/v1/files/${fileKey}/nodes?ids=${nodeIds}`);

    const colors = [];
    for (const style of fillStyles) {
      const node = nodesData.nodes[style.node_id];
      if (node && node.document) {
        const fills = node.document.fills;
        if (fills && fills.length > 0) {
          const fill = fills[0];
          if (fill.type === 'SOLID' && fill.color) {
            const { r, g, b, a } = fill.color;
            colors.push({
              id: style.node_id,
              name: style.name,
              description: style.description || '',
              hex: rgbToHex(r, g, b),
              rgb: { r, g, b, a }
            });
          }
        }
      }
    }

    return colors;
  } catch (error) {
    console.warn('⚠️  Could not fetch published library colors:', error.message);
    return [];
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🎨 Fetching design tokens from Figma...');
  console.log(`   File ID: ${FIGMA_FILE_ID}\n`);

  try {
    // Fetch file metadata and document structure
    console.log('📥 Fetching file data...');
    const fileData = await fetchFigma(`/v1/files/${FIGMA_FILE_ID}`);

    // Save raw file data
    fs.writeFileSync(
      path.join(__dirname, 'figma_data.json'),
      JSON.stringify(fileData, null, 2)
    );
    console.log('✅ Saved figma_data.json');

    // Extract color tokens from published library first
    console.log('📥 Fetching published library colors...');
    let colors = await fetchPublishedColors(FIGMA_FILE_ID);
    console.log(`✅ Found ${colors.length} published colors`);

    // If no published colors, fall back to document extraction
    if (colors.length === 0) {
      console.log('📥 Extracting color tokens from document...');
      colors = extractColorTokens(fileData);
    }

    console.log(`✅ Total: ${colors.length} color tokens`);

    // Save color data
    fs.writeFileSync(
      path.join(__dirname, 'figma_colors.json'),
      JSON.stringify(colors, null, 2)
    );
    console.log('✅ Saved figma_colors.json');

    // Update ALL HTML files
    updateAllHtmlFiles(colors);

    // Print summary
    console.log('\n📊 Design Token Summary:');
    colors.forEach(color => {
      console.log(`   ${color.name.padEnd(25)} ${color.hex}  ${color.description || ''}`);
    });

    console.log('\n✨ Sync complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { fetchFigma, extractColorTokens, rgbToHex };
