#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Tailwind CSS Setup for Flask Portfolio${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Check if Node.js is installed
echo -e "${YELLOW}[1/8] Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install it from https://nodejs.org/${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node --version) found${NC}\n"

# Check if npm is installed
echo -e "${YELLOW}[2/8] Checking npm installation...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm is not installed. Please install Node.js from https://nodejs.org/${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm --version) found${NC}\n"

# Initialize npm if package.json doesn't exist
echo -e "${YELLOW}[3/8] Initializing npm...${NC}"
if [ ! -f "package.json" ]; then
    echo -e "${BLUE}Creating package.json...${NC}"
    npm init -y
    echo -e "${GREEN}✓ package.json created${NC}\n"
else
    echo -e "${GREEN}✓ package.json already exists${NC}\n"
fi

# Install Tailwind CSS
echo -e "${YELLOW}[4/8] Installing Tailwind CSS...${NC}"
npm install -D tailwindcss concurrently
echo -e "${GREEN}✓ Tailwind CSS installed${NC}\n"

# Initialize Tailwind config
echo -e "${YELLOW}[5/8] Creating Tailwind configuration...${NC}"
if [ ! -f "tailwind.config.js" ]; then
    npx tailwindcss init
    echo -e "${GREEN}✓ tailwind.config.js created${NC}\n"
else
    echo -e "${GREEN}✓ tailwind.config.js already exists${NC}\n"
fi

# Create CSS directory if it doesn't exist
echo -e "${YELLOW}[6/8] Setting up CSS directory...${NC}"
mkdir -p static/css
echo -e "${GREEN}✓ static/css directory ready${NC}\n"

# Create input.css if it doesn't exist
echo -e "${YELLOW}[7/8] Creating input.css...${NC}"
if [ ! -f "static/css/input.css" ]; then
    cat > static/css/input.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .scroll-reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .scroll-reveal.active {
    opacity: 1;
    transform: translateY(0);
  }
}
EOF
    echo -e "${GREEN}✓ input.css created${NC}\n"
else
    echo -e "${GREEN}✓ input.css already exists${NC}\n"
fi

# Build Tailwind CSS
echo -e "${YELLOW}[8/8] Building Tailwind CSS...${NC}"
npm run build:css
echo -e "${GREEN}✓ output.css generated${NC}\n"

# Final instructions
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Setup Complete! ✓${NC}"
echo -e "${GREEN}========================================${NC}\n"

echo -e "${BLUE}Next steps:${NC}"
echo -e "1. Update your ${YELLOW}base.html${NC} to use the compiled CSS:"
echo -e "   ${YELLOW}<link rel=\"stylesheet\" href=\"{{ url_for('static', filename='css/output.css') }}\">${NC}\n"

echo -e "2. Remove the CDN script tag:"
echo -e "   ${RED}<script src=\"https://cdn.tailwindcss.com\"></script>${NC}\n"

echo -e "3. Run development server with auto-rebuild:"
echo -e "   ${YELLOW}npm run dev${NC}\n"

echo -e "4. For production build:"
echo -e "   ${YELLOW}npm run build:css${NC}\n"

echo -e "${GREEN}Happy coding! 🚀${NC}"
