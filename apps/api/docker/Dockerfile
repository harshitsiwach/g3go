FROM ubuntu:22.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create directories
WORKDIR /godot

# Download Godot headless binary
RUN wget -q https://github.com/dwalter/godotwebgpu/releases/download/latest/godot-headless-linux.zip \
    && unzip godot-headless-linux.zip \
    && rm godot-headless-linux.zip \
    && chmod +x godot

# Set up export templates directory
RUN mkdir -p ~/.local/share/godot/export_templates/4.6.webgpu/

# Download web export templates
RUN wget -q https://github.com/dwalter/godotwebgpu/releases/download/latest/web_export_template.zip \
    && mv web_export_template.zip ~/.local/share/godot/export_templates/4.6.webgpu/ \
    && cd ~/.local/share/godot/export_templates/4.6.webgpu/ \
    && unzip web_export_template.zip \
    && rm web_export_template.zip

# Copy export script
COPY export_worker.sh /godot/export_worker.sh
RUN chmod +x /godot/export_worker.sh

# Create output directory
RUN mkdir -p /output

ENTRYPOINT ["/godot/export_worker.sh"]
