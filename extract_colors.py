#!/usr/bin/env python3
import json

def rgb_to_hex(r, g, b):
    """Convert RGB (0-1 range) to hex color"""
    return f"#{int(r*255):02X}{int(g*255):02X}{int(b*255):02X}"

# Load Figma data
with open('figma_data.json', 'r') as f:
    data = json.load(f)

# Get style definitions
styles = data.get('styles', {})
color_styles = {
    style_id: {
        'name': info['name'],
        'description': info.get('description', '')
    }
    for style_id, info in styles.items()
    if info.get('styleType') == 'FILL'
}

# Find color values by traversing the document
def find_colors(node, colors_found):
    """Recursively find nodes with fill styles and extract their colors"""
    if isinstance(node, dict):
        # Check if this node has fills and a style
        if 'fills' in node and 'styles' in node and 'fill' in node['styles']:
            style_id = node['styles']['fill']
            fills = node['fills']

            if fills and len(fills) > 0 and fills[0].get('type') == 'SOLID':
                color = fills[0].get('color', {})
                if 'r' in color and 'g' in color and 'b' in color:
                    hex_color = rgb_to_hex(
                        color['r'],
                        color['g'],
                        color['b']
                    )
                    if style_id not in colors_found:
                        colors_found[style_id] = {
                            'hex': hex_color,
                            'rgb': color
                        }

        # Recurse into children
        if 'children' in node:
            for child in node['children']:
                find_colors(child, colors_found)

# Extract colors
colors_found = {}
if 'document' in data:
    find_colors(data['document'], colors_found)

# Combine style info with color values
final_colors = []
for style_id, style_info in color_styles.items():
    color_data = {
        'id': style_id,
        'name': style_info['name'],
        'description': style_info['description']
    }

    if style_id in colors_found:
        color_data['hex'] = colors_found[style_id]['hex']
        color_data['rgb'] = colors_found[style_id]['rgb']

    final_colors.append(color_data)

# Sort by name
final_colors.sort(key=lambda x: x['name'])

# Print results
print(json.dumps(final_colors, indent=2))
