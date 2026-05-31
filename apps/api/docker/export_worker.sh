#!/bin/bash
set -e

# $1 = path to project directory
# $2 = export format (web, windows, macos, linux)
# $3 = output path

PROJECT_DIR="${1:-/tmp/project}"
EXPORT_FORMAT="${2:-web}"
OUTPUT_PATH="${3:-/output}"

echo "Exporting project from: $PROJECT_DIR"
echo "Export format: $EXPORT_FORMAT"
echo "Output path: $OUTPUT_PATH"

# Navigate to project directory
cd "$PROJECT_DIR"

# Determine export template and output filename
case "$EXPORT_FORMAT" in
    "web"|"webgl"|"webgpu")
        TEMPLATE="Web"
        OUTPUT_FILE="game.zip"
        ;;
    "windows")
        TEMPLATE="Windows Desktop"
        OUTPUT_FILE="game.exe"
        ;;
    "macos")
        TEMPLATE="macOS"
        OUTPUT_FILE="game.dmg"
        ;;
    "linux")
        TEMPLATE="Linux"
        OUTPUT_FILE="game.x86_64"
        ;;
    *)
        echo "Error: Unknown export format: $EXPORT_FORMAT"
        exit 1
        ;;
esac

echo "Using template: $TEMPLATE"
echo "Output file: $OUTPUT_FILE"

# Run Godot export
/godot/godot --headless --export-release "$TEMPLATE" "$OUTPUT_PATH/$OUTPUT_FILE"

# Check if export was successful
if [ $? -eq 0 ]; then
    echo "Export completed successfully!"
    echo "Output: $OUTPUT_PATH/$OUTPUT_FILE"
    ls -la "$OUTPUT_PATH/$OUTPUT_FILE"
else
    echo "Error: Export failed!"
    exit 1
fi
